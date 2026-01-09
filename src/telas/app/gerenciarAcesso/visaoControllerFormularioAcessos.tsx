import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { IVisitante } from "../../../interfaces/IVisitante";
import { useAutenticacao } from "../../../contextos/useAutenticacao";
import { VisaoModeloVisitante } from "../../../modelo/visitante/visaoModeloVisitante";
import { IFormularioAcesso } from "../../../interfaces/IControleAcesso";
import { VisaoModeloSolicitacaoVeiculo } from "../../../modelo/solicitacaoVeiculo/visaoModeloSolicitacaoVeiculo";
import { IUsuario } from "../../../interfaces/IControleVeiculo";
import { VisaoModeloSolicitacaoAcesso } from "../../../modelo/solicitacaoAcesso/visaoModeloSolicitacaoAcesso";
import { VisaoModeloPorteiro } from "../../../modelo/porteiro/visaoModeloPorteiro";
import { IPorteiro } from "../../../interfaces/IPorteiro";
import { useLocation, useNavigate } from "react-router-dom";
import { base64ParaArquivo } from "../../../utils/converteBase64ParaArquivo";
import Webcam from "react-webcam";

export const useVisaoControllerFormularioAcesso = () => {
    const {
        control,
        formState: { errors },
        register,
        setValue,
        watch,
        handleSubmit,
    } = useForm<IFormularioAcesso>({
        defaultValues:
        {
            cpf: "", nome: "", empresa: "",
            caminho_foto_visitante: "", caminho_imagem_assinatura: ""
        }
    });

    const { tokenJWT } = useAutenticacao();

    const [visitanteExiste, setVisitanteExiste] = useState<boolean>(false);
    const [visitante, setVisitante] = useState<IVisitante | null>(null);
    const [imagemPreview, setImagemPreview] = useState<string | null>(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [termoPesquisa, setTermoPesquisa] = useState("");
    const [campoSelecionado, setCampoSelecionado] = useState<"responsavel" | "porteiroEntrada" | "porteiroSaida" | null>(null);
    const [pessoal, setPessoal] = useState<IUsuario[]>([]);
    const [camposBloqueados, setCamposBloqueados] = useState<boolean>(false);
    const [porteiros, setPorteiros] = useState<IPorteiro[]>([]);
    const [cameraAberta, setCameraAberta] = useState(false);
    const [foto, setFoto] = useState<string | null>(null);
    const [toast, setToast] = useState({ show: false, title: "", message: "", onConfirm: () => { }, });

    const objVisaoModeloPorteiro = new VisaoModeloPorteiro();
    const objVisaoModeloVisitante = new VisaoModeloVisitante();
    const objVisaoModeloSolicitacaoAcesso = new VisaoModeloSolicitacaoAcesso();
    const objVisaoModeloSolicitacaoVeiculo = new VisaoModeloSolicitacaoVeiculo();

    const webcamRef = useRef<Webcam | null>(null);
    const navegacao = useNavigate();
    const estadoFormulario = useLocation();
    const { ehEdicao, editarObjeto } = estadoFormulario.state || {};
    const abrirCamera = () => { setFoto(null); setCameraAberta(true); };
    const vaiParaGerenciarAcessos = () => { navegacao("/ControleAcesso") }

    const abrirConfirmacaoSalvar = (data: any) => {
        setToast({
            show: true,
            title: "Confirmar ação",
            message: ehEdicao ? "Deseja realmente editar esta solicitação de acesso?" :
                "Deseja realmente cadastrar esta solicitação de acesso?",
            onConfirm: async () => {
                setToast((prev) => ({ ...prev, show: false }));
                if (ehEdicao) {
                    console.log(data);
                    await fecharAcesso(data)
                } else {
                    console.log(data);
                    await cadastrarAcesso(data);
                }
            },
        });
    };

    const fecharAcesso = async (data: IFormularioAcesso) => {
        if (!tokenJWT) return;

        if (!data.porteiroSaida) {
            alert("Porteiro de saída não informado");
            return;
        }

        try {
            const acessoFechado = await objVisaoModeloSolicitacaoAcesso.fecharSolicitacaoAcesso(tokenJWT, editarObjeto.id, data.porteiroSaida);

            if (acessoFechado) {
                vaiParaGerenciarAcessos();
            }
        } catch (error) {
            console.error("Erro no fechamento do acesso:", error);
            alert("Erro ao fechar o acesso");
        }
    };

    const cadastrarAcesso = async (data: IFormularioAcesso) => {
        if (!tokenJWT) return;

        try {
            const visitanteRegistrado = await verificaCadastroDeVisitante(data);
            console.log('VISITANTE ', visitanteRegistrado);
            if (visitanteRegistrado?.id) {
                const payload = {
                    idVisitante: visitanteRegistrado.id, idPorteiroEntrada: Number(data.porteiroEntrada), objetivo: data.motivo,
                    placaVeiculo: data.placa, numeroCartao: data.numeroCartao, responsavel: data.responsavel
                };

                const acessoCadastrado = await objVisaoModeloSolicitacaoAcesso.cadastrarSolicitacaoAcesso(tokenJWT, payload);

                if (!acessoCadastrado) { alert("Erro ao cadastrar acesso"); return; }

                vaiParaGerenciarAcessos();
            }

        } catch (error) {
            console.error("Erro no cadastro:", error);
            alert("Erro ao processar o cadastro");
        }
    };

    const verificaCadastroDeVisitante = async (informacoesVisitante: IFormularioAcesso) => {
        if (!tokenJWT) return;

        let foto: File | undefined;
        let assinatura: File | undefined;

        if (typeof informacoesVisitante.caminho_foto_visitante === "string" && informacoesVisitante.caminho_foto_visitante.startsWith("data:image")) {
            foto = base64ParaArquivo(informacoesVisitante.caminho_foto_visitante, `foto_${informacoesVisitante.cpf}.jpg`);
        }

        if (typeof informacoesVisitante.caminho_imagem_assinatura === "string" && informacoesVisitante.caminho_imagem_assinatura.startsWith("data:image")) {
            assinatura = base64ParaArquivo(informacoesVisitante.caminho_imagem_assinatura, `assinatura_${informacoesVisitante.cpf}.png`);
        }

        if (!visitanteExiste) {
            console.log({
                cpf: informacoesVisitante.cpf,
                nome: informacoesVisitante.nome,
                empresa: informacoesVisitante.empresa,
                caminho_foto_visitante: foto as any,
                caminho_imagem_assinatura: assinatura as any,
            });
            const visitanteCadastrado =
                await objVisaoModeloVisitante.cadastrarVisitante(tokenJWT, {
                    cpf: informacoesVisitante.cpf,
                    nome: informacoesVisitante.nome,
                    empresa: informacoesVisitante.empresa,
                    caminho_foto_visitante: foto as any,
                    caminho_imagem_assinatura: assinatura as any,
                });


            if (!visitanteCadastrado) {
                alert("Erro ao cadastrar visitante");
                return;
            }

            return visitanteCadastrado;
        }
        if (visitante?.cpf) {
            const visitanteParaEdicao = await objVisaoModeloVisitante.selecionarPorCPF(tokenJWT, visitante.cpf);
            if (!visitanteParaEdicao?.id) {
                alert("ID do visitante inválido");
                return;
            }

            const visitanteEditado = await objVisaoModeloVisitante.editarVisitante(
                tokenJWT,
                {
                    cpf: informacoesVisitante.cpf,
                    nome: informacoesVisitante.nome,
                    empresa: informacoesVisitante.empresa,
                    caminho_foto_visitante: foto as any,
                    caminho_imagem_assinatura: assinatura as any,
                },
                visitanteParaEdicao.id
            );

            if (!visitanteEditado) {
                alert("Erro ao editar visitante");
                return;
            }

            return visitanteEditado;
        }
    };

    const tirarFoto = () => {
        if (!webcamRef.current) return;

        const imagem = webcamRef.current.getScreenshot();
        if (!imagem) {
            alert("Não foi possível capturar a imagem");
            return;
        }

        setFoto(imagem);
        setValue("caminho_foto_visitante", imagem);
        setCameraAberta(false);
    };

    const formatarCPF = (valor?: string) => {
        if (!valor) return "";

        return valor
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
            .slice(0, 14);
    };

    const buscarVisitantePorCPF = async () => {
        if (!tokenJWT) return;

        const cpf = watch("cpf");
        if (!cpf || cpf.length !== 14) { alert("Informe um CPF válido"); return; }
        try {
            const visitante = await objVisaoModeloVisitante.selecionarPorCPF(tokenJWT, cpf);

            if (!visitante || Object.keys(visitante).length === 0) defineValoresPreenchidosVaziosParaVisitante();
            if (visitante) defineValoresPreenchidosParaVisitante(visitante);
        } catch (error) {
            console.error("Erro ao buscar visitante", error);
        }
    };

    const defineValoresPreenchidosParaVisitante = (visitante: IVisitante) => {
        setVisitanteExiste(true);
        setCamposBloqueados(true);

        if (ehEdicao) setValue("cpf", visitante.cpf);

        setValue("nome", visitante.nome);
        setValue("empresa", visitante.empresa);
        setValue("caminho_foto_visitante", visitante.caminho_foto_visitante);
        setValue("caminho_imagem_assinatura", visitante.caminho_imagem_assinatura);
        setVisitante(visitante);
    }

    const defineValoresPreenchidosVaziosParaVisitante = () => {
        setVisitanteExiste(false);
        setCamposBloqueados(false);

        setValue("nome", "");
        setValue("empresa", "");
        setValue("caminho_foto_visitante", "");
        setValue("caminho_imagem_assinatura", "");
        return;
    }

    useEffect(() => {
        if (!ehEdicao || !editarObjeto || porteiros.length === 0 || !tokenJWT) return;

        const carregarDadosEdicao = async () => {
            try {
                const visitanteID = await objVisaoModeloSolicitacaoAcesso.descobreVisitanteID(tokenJWT, editarObjeto.id);
                if (visitanteID) {
                    const visitante = await objVisaoModeloVisitante.listarVisitantePorID(tokenJWT, visitanteID);
                    if (visitante) defineValoresPreenchidosParaVisitante(visitante);
                }
                setValue("numeroCartao", editarObjeto.numeroCartao);
                setValue("motivo", editarObjeto.objetivo);
                setValue("responsavel", editarObjeto.responsavel);
                setValue("placa", editarObjeto.placaVeiculo);

                const porteiroEncontrado = porteiros.find(
                    p => p.nome === editarObjeto.nomePorteiroEntrada
                );

                if (porteiroEncontrado) {
                    setValue("porteiroEntrada", porteiroEncontrado.id);
                }
            } catch (error) {
                console.error("Erro ao carregar dados de edição:", error);
            }
        };

        carregarDadosEdicao();
    }, [ehEdicao, editarObjeto, porteiros, tokenJWT, setValue]);



    const buscarPessoal = async (termo?: string) => {
        if (!tokenJWT) return;
        try {
            const informacoesUsuarios = await objVisaoModeloSolicitacaoVeiculo.listarPessoal(tokenJWT, termo?.toUpperCase());
            if (informacoesUsuarios && Array.isArray(informacoesUsuarios)) {
                setPessoal(informacoesUsuarios);
            } else {
                setPessoal([]);
            }
        } catch (error) {
            console.error("Erro ao buscar pessoal:", error);
        }
    };

    const buscarPorteiros = async () => {
        if (!tokenJWT) return;
        try {
            const informacoesPorteiros = await objVisaoModeloPorteiro.listarTodosPorteiros(tokenJWT);
            if (informacoesPorteiros && Array.isArray(informacoesPorteiros)) {
                setPorteiros(informacoesPorteiros);
            } else {
                setPorteiros([]);
            }
        } catch (error) {
            console.error("Erro ao buscar porteiros:", error);
        }
    };

    return {
        control,
        errors,
        imagemPreview,
        pessoal,
        modalAberto,
        termoPesquisa,
        campoSelecionado,
        formatarCPF,
        buscarVisitantePorCPF,
        register,
        handleSubmit,
        setImagemPreview,
        setValue,
        setModalAberto,
        setTermoPesquisa,
        setCampoSelecionado,
        buscarPessoal,
        cameraAberta,
        foto,
        abrirCamera,
        tirarFoto,
        webcamRef, watch,
        visitanteExiste,
        setVisitanteExiste,
        camposBloqueados,
        porteiros,
        ehEdicao, buscarPorteiros,
        toast,
        setToast,
        abrirConfirmacaoSalvar
    };
};
