import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { IVisitante } from "../../../interfaces/IVisitante";
import { useAutenticacao } from "../../../contextos/useAutenticacao";
import { VisaoModeloVisitante } from "../../../modelo/visitante/visaoModeloVisitante";
import { IEdicaoControleAcesso, IFormularioAcesso } from "../../../interfaces/IControleAcesso";
import { VisaoModeloSolicitacaoVeiculo } from "../../../modelo/solicitacaoVeiculo/visaoModeloSolicitacaoVeiculo";
import { IUsuario } from "../../../interfaces/IControleVeiculo";
import { VisaoModeloSolicitacaoAcesso } from "../../../modelo/solicitacaoAcesso/visaoModeloSolicitacaoAcesso";
import { VisaoModeloPorteiro } from "../../../modelo/porteiro/visaoModeloPorteiro";
import { IPorteiro } from "../../../interfaces/IPorteiro";
import { useLocation, useNavigate } from "react-router-dom";
import { base64ParaArquivo } from "../../../utils/converteBase64ParaArquivo";
import Webcam from "react-webcam";

export const useVisaoControllerFormularioAcesso = () => {
    const { control, formState: { errors }, register, setValue, watch, handleSubmit, } = useForm<IFormularioAcesso>({
        defaultValues: { cpf: "", nome: "", empresa: "", caminho_foto_visitante: "", numeroCartao: "1" }
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
    const [carregando, setCarregando] = useState(false);

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

    /*
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const abrirCamera = async () => {
    if (isMobile) {
        // Para mobile usamos getUserMedia direto
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" } // câmera traseira
            });
            const video = document.createElement("video");
            video.srcObject = stream;
            video.play();

            // Criar canvas para capturar foto quando precisar
            video.onloadedmetadata = () => {
                setCameraAberta(true);
                document.body.appendChild(video); // opcional, você pode renderizar num container
            };
        } catch (error) {
            console.error("Erro ao acessar câmera do celular:", error);
            alert("Não foi possível acessar a câmera do dispositivo.");
        }
    } else {
        // Desktop: usar react-webcam
        setCameraAberta(true);
    }
};

const tirarFoto = () => {
    if (isMobile) {
        // Para mobile capturamos do video element
        const video = document.querySelector("video");
        if (!video) return;

        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imagem = canvas.toDataURL("image/jpeg");
        setFoto(imagem);
        setValue("caminho_foto_visitante", imagem);
        setCameraAberta(false);

        // Parar o stream
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        video.remove();
    } else {
        // Desktop
        if (!webcamRef.current) return;
        const imagem = webcamRef.current.getScreenshot();
        if (!imagem) return;

        setFoto(imagem);
        setValue("caminho_foto_visitante", imagem);
        setCameraAberta(false);
    }
};

    */

    const abrirConfirmacaoSalvar = (data: any) => {
        setToast({
            show: true,
            title: "Confirmar ação",
            message: ehEdicao ? "Deseja realmente editar esta solicitação de acesso?" :
                "Deseja realmente cadastrar esta solicitação de acesso?",
            onConfirm: async () => {
                setToast((prev) => ({ ...prev, show: false }));
                if (ehEdicao) {
                    await editarAcesso(data)
                } else {
                    await cadastrarAcesso(data);
                }
            },
        });
    };

    const editarAcesso = async (data: IFormularioAcesso) => {
        if (!tokenJWT) return;

        try {
            if (carregando) return;
            setCarregando(true);

            const objEdicaoBase: Partial<IEdicaoControleAcesso> = {
                idVisitante: visitante?.id!
            };

            // Adiciona apenas campos preenchidos
            if (data.porteiroSaida) objEdicaoBase.idPorteiroSaida = Number(data.porteiroSaida);
            if (data.porteiroEntrada) objEdicaoBase.idPorteiroEntrada = Number(data.porteiroEntrada);
            if (data.motivo) objEdicaoBase.objetivo = data.motivo;
            if (data.placa) objEdicaoBase.placaVeiculo = data.placa;
            if (data.numeroCartao) objEdicaoBase.numeroCartao = data.numeroCartao;
            if (data.responsavel) objEdicaoBase.responsavel = data.responsavel;

            const objEdicaoFinal = Object.fromEntries(
                Object.entries(objEdicaoBase).filter(([_, v]) => v !== undefined)
            );

            const acessoEditado = await objVisaoModeloSolicitacaoAcesso.editarSolicitacaoAcesso(
                tokenJWT,
                editarObjeto.id,
                objEdicaoFinal as unknown as IEdicaoControleAcesso
            );

            if (!acessoEditado) {
                alert("Erro ao editar acesso");
                return;
            }

            vaiParaGerenciarAcessos();
        } catch (error) {
            console.error("Erro ao editar acesso:", error);
            alert("Erro ao processar a edição");
        } finally {
            setCarregando(false);
        }
    };

    const cadastrarAcesso = async (data: IFormularioAcesso) => {
        if (!tokenJWT) return;

        try {
            if (carregando) return;
            setCarregando(true);
            const visitanteRegistrado = await verificaCadastroDeVisitante(data);

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
        } finally {
            setCarregando(false);
        }
    };

    const verificaCadastroDeVisitante = async (informacoesVisitante: IFormularioAcesso) => {
        if (!tokenJWT) return;

        let foto: File | undefined;

        if (typeof informacoesVisitante.caminho_foto_visitante === "string" && informacoesVisitante.caminho_foto_visitante.startsWith("data:image")) {
            foto = base64ParaArquivo(informacoesVisitante.caminho_foto_visitante, `foto_${informacoesVisitante.cpf}.jpg`);
        }

        try {
            if (!visitanteExiste) {
                const visitanteCadastrado =
                    await objVisaoModeloVisitante.cadastrarVisitante(tokenJWT, {
                        cpf: informacoesVisitante.cpf,
                        nome: informacoesVisitante.nome,
                        empresa: informacoesVisitante.empresa,
                        caminho_foto_visitante: foto as any
                    });

                if (!visitanteCadastrado) {
                    alert("Erro ao cadastrar visitante");
                    return;
                }

                return visitanteCadastrado;
            }

            if (visitante?.id) {
                const visitanteEditado = await objVisaoModeloVisitante.editarVisitante(
                    tokenJWT,
                    {
                        cpf: informacoesVisitante.cpf,
                        nome: informacoesVisitante.nome,
                        empresa: informacoesVisitante.empresa,
                        caminho_foto_visitante: foto as any
                    },
                    visitante.id
                );

                if (!visitanteEditado) {
                    alert("Erro ao editar visitante");
                    return;
                }

                return visitanteEditado;
            }

        } catch (error) {
            console.error("Erro ao verificar visitante:", error);
            alert("Erro ao processar visitante");
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

        if (!cpf || cpf.length !== 14) {
            alert("Informe um CPF válido");
            return;
        }

        try {
            const visitante = await objVisaoModeloVisitante.selecionarPorCPF(tokenJWT, cpf);
            if (!visitante || (Array.isArray(visitante) && visitante.length === 0)) {
                defineValoresPreenchidosVaziosParaVisitante();
                return;
            }

            defineValoresPreenchidosParaVisitante(visitante);

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
        setVisitante(visitante);
    }

    const defineValoresPreenchidosVaziosParaVisitante = () => {
        setVisitanteExiste(false);
        setCamposBloqueados(false);

        setValue("nome", "");
        setValue("empresa", "");
        setValue("caminho_foto_visitante", "");
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
                setValue("placa", editarObjeto.placaVeiculo);

                const usuarioEncontrado = pessoal.find(p => p.nome === editarObjeto.responsavel);

                if (usuarioEncontrado) {
                    setValue("responsavel", String(usuarioEncontrado.chapa));
                } else {
                    console.warn("Responsável não encontrado na lista de pessoal");
                    setValue("responsavel", "");
                }

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
    }, [ehEdicao, editarObjeto, porteiros, pessoal, tokenJWT, setValue]);



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
        watch,
        abrirCamera,
        tirarFoto,
        buscarPorteiros,
        setVisitanteExiste,
        setToast,
        abrirConfirmacaoSalvar,
        control,
        errors,
        imagemPreview,
        pessoal,
        modalAberto,
        termoPesquisa,
        campoSelecionado,
        cameraAberta,
        foto,
        webcamRef,
        visitanteExiste,
        camposBloqueados,
        porteiros,
        ehEdicao,
        toast,
        carregando,
        setCarregando,
    };
};
