import { useEffect, useState } from "react";
import { useAutenticacao } from "../../../contextos/useAutenticacao";
import { VisaoModeloVeiculo } from "../../../modelo/veiculo/visaoModeloVeiculo";
import { IVeiculo } from "../../../interfaces/IVeiculo";
import { VisaoModeloPorteiro } from "../../../modelo/porteiro/visaoModeloPorteiro";
import { IPorteiro } from "../../../interfaces/IPorteiro";
import { useForm } from "react-hook-form";
import { IControleVeiculo, IUsuario } from "../../../interfaces/IControleVeiculo";
import { VisaoModeloSolicitacaoVeiculo } from "../../../modelo/solicitacaoVeiculo/visaoModeloSolicitacaoVeiculo";
import { useLocation, useNavigate } from "react-router-dom";
import { Estado } from "../../../types/Estado";
import { Cidade } from "../../../types/Cidade";
import { VisaoModeloPessoal } from "../../../modelo/pessoal/visaoModeloPessoal";

export const useVisaoControllerFormularioSolicitacaoVeiculo = () => {
    const { control, handleSubmit, register, setValue, formState: { errors }, watch } = useForm<IControleVeiculo>({
        defaultValues: {
            destino: "",
            idResponsavel: "",
            idResponsavelAutorizacao: "",
            localizacao: "",
            idVeiculo: 0,
            idPorteiroEntrada: 0,
            idPorteiroSaida: 0,
            km_final_veiculo: undefined,
        }
    });

    const objVisaoModeloVeiculo = new VisaoModeloVeiculo();
    const objVisaoModeloUsuario = new VisaoModeloPorteiro();
    const objVisaoModeloSolicitacaoVeiculo = new VisaoModeloSolicitacaoVeiculo();
    const objVisaoModeloPessoal = new VisaoModeloPessoal();

    const [veiculo, setVeiculo] = useState<IVeiculo[]>([]);
    const [porteiro, setPorteiro] = useState<IPorteiro[]>([]);
    const [pessoal, setPessoal] = useState<IUsuario[]>([]);
    const [aprovadores, setAprovadores] = useState<IUsuario[]>([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [termoPesquisa, setTermoPesquisa] = useState("");
    const [campoSelecionado, setCampoSelecionado] = useState<"idResponsavel" | "idResponsavelAutorizacao" | "idVeiculo" | null>(null);
    const [carregando, setCarregando] = useState(false);
    const [estado, setEstados] = useState<Estado[]>([]);
    const [cidades, setCidades] = useState<Cidade[]>([]);
    const [toast, setToast] = useState({ show: false, title: "", message: "", onConfirm: () => { }, });

    const [nomeResponsavel, setNomeResponsavel] = useState("");
    const [nomeAutorizador, setNomeAutorizador] = useState("");

    const siglaSelecionada = watch("destino");
    const nomeEstadoSelecionado = estado.find(e => e.sigla === siglaSelecionada)?.nome || "";
    const { tokenJWT } = useAutenticacao();
    const estadoFormulario = useLocation();
    const { ehEdicao, editarObjeto } = estadoFormulario.state || {};
    const navegacao = useNavigate();

    const vaiParaSolicitacoesVeiculos = () => {
        navegacao("/ControleSolicitacaoVeiculo")
    };

    useEffect(() => {
        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
            .then(res => res.json())
            .then((data: Estado[]) => {
                const ordenados = data.sort((a, b) => a.nome.localeCompare(b.nome));
                setEstados(ordenados);

                if (ehEdicao && editarObjeto) {
                    setValue("destino", editarObjeto.destino);
                }
            });
    }, [ehEdicao, editarObjeto, setValue]);

    useEffect(() => {
        if (ehEdicao && editarObjeto) {
            setValue("destino", editarObjeto.destino);

            fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${editarObjeto.destino}/municipios`)
                .then(res => res.json())
                .then((data: Cidade[]) => {
                    const ordenadas = data.sort((a, b) => a.nome.localeCompare(b.nome));
                    setCidades(ordenadas);
                    setValue("localizacao", editarObjeto.localizacao);
                });
        }
    }, [ehEdicao, editarObjeto, setValue]);

    useEffect(() => {
        const siglaEstado = watch("destino");
        if (!siglaEstado) {
            setCidades([]);
            setValue("localizacao", "");
            return;
        }

        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${siglaEstado}/municipios`)
            .then(res => res.json())
            .then((data: Cidade[]) => {
                const ordenadas = data.sort((a, b) => a.nome.localeCompare(b.nome));
                setCidades(ordenadas);

                if (ehEdicao && editarObjeto && editarObjeto.destino === siglaEstado) {
                    setValue("localizacao", editarObjeto.localizacao);
                }
            });
    }, [watch("destino")]);


    const abrirConfirmacaoSalvar = (data: any) => {
        setToast({
            show: true,
            title: "Confirmar ação",
            message: ehEdicao ? "Deseja realmente editar esta solicitação de veículo?" :
                "Deseja realmente cadastrar esta solicitação de veículo?",
            onConfirm: async () => {
                setToast((prev) => ({ ...prev, show: false }));
                if (ehEdicao) {
                    await editarNoticia(data)
                } else {
                    await cadastrarSolicitacao(data);

                }
            },
        });
    };

    const cadastrarSolicitacao = async (dadosFormulario: IControleVeiculo) => {
        if (!tokenJWT) return;
        try {
            if (carregando) return;
            setCarregando(true);
            const veiculoSelecionado = veiculo.find(v => v.id === dadosFormulario.idVeiculo);
            if (veiculoSelecionado) { dadosFormulario.km_inicial_veiculo = veiculoSelecionado.km_atual; }
            if (await objVisaoModeloSolicitacaoVeiculo.cadastrarVeiculo(tokenJWT, dadosFormulario)) vaiParaSolicitacoesVeiculos();
        } catch (error) {
            alert("Erro ao cadastrar noticia")
        } finally {
            setCarregando(false);
        }
    }

    const editarNoticia = async (dadosFormulario: IControleVeiculo) => {
        if (!tokenJWT) return;
        try {
            if (carregando) return;
            setCarregando(true);
            if (await objVisaoModeloSolicitacaoVeiculo.editarSolicitacaoVeiculo(tokenJWT, dadosFormulario, editarObjeto.id)) {
                vaiParaSolicitacoesVeiculos();
            }
        } catch (error) {
            alert("Erro ao editar noticia");
        } finally {
            setCarregando(false);
        }
    }

    const buscarVeiculos = async () => {
        if (!tokenJWT) return;
        try {
            const informacoesVeiculo = await objVisaoModeloVeiculo.listarTodosVeiculos(tokenJWT);
            if (informacoesVeiculo && Array.isArray(informacoesVeiculo)) {
                setVeiculo(informacoesVeiculo);
            } else {
                setVeiculo([]);
            }
        } catch (error) {
            console.error("Erro ao buscar veiculos cadastrados:", error);
        }
    };

    const buscarPorteiros = async () => {
        if (!tokenJWT) return;
        try {
            const informacoesUsuarios = await objVisaoModeloUsuario.listarTodosPorteiros(tokenJWT);
            if (informacoesUsuarios && Array.isArray(informacoesUsuarios)) {
                setPorteiro(informacoesUsuarios);
            } else {
                setPorteiro([]);
            }
        } catch (error) {
            console.error("Erro ao buscar porteiros cadastrados:", error);
        }
    };

    const buscarPessoal = async (termo?: string) => {
        if (!tokenJWT) return;
        try {
            const informacoesUsuarios = await objVisaoModeloSolicitacaoVeiculo.listarPessoal(tokenJWT, termo);
            if (informacoesUsuarios && Array.isArray(informacoesUsuarios)) {
                setPessoal(informacoesUsuarios);
            } else {
                setPessoal([]);
            }
        } catch (error) {
            console.error("Erro ao buscar pessoal:", error);
        }
    };

    const buscarUsuariosAprovadores = async (termo?: string) => {
        if (!tokenJWT) return;
        try {
            const informacoesAprovadores = await objVisaoModeloPessoal.listarUsuariosAprovadores(tokenJWT, termo);
            if (informacoesAprovadores && Array.isArray(informacoesAprovadores)) {
                setAprovadores(informacoesAprovadores);
            } else {
                setAprovadores([]);
            }
        } catch (error) {
            console.error("Erro ao buscar pessoal:", error);
        }
    };

    const buscaNomeUsuariosResponsaveis = async () => {
        if (!tokenJWT) return;
        const nomeResponsavel = await objVisaoModeloPessoal.listarUsuariosPorChapa(tokenJWT, editarObjeto.idResponsavel);
        const nomeAutorizacao = await objVisaoModeloPessoal.listarUsuariosPorChapa(tokenJWT, editarObjeto.idResponsavelAutorizacao);

        if (nomeResponsavel) {
            setNomeResponsavel(nomeResponsavel.nome);
        }

        if (nomeAutorizacao) {
            setNomeAutorizador(nomeAutorizacao.nome);
        }
    }

    useEffect(() => {
        if (ehEdicao && editarObjeto) {
            fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${editarObjeto.destino}/municipios`)
                .then(res => res.json())
                .then((data: Cidade[]) => {
                    const ordenadas = data.sort((a, b) => a.nome.localeCompare(b.nome));
                    setCidades(ordenadas);
                    setTimeout(() => { setValue("localizacao", editarObjeto.localizacao); }, 0);
                });
                
            setValue("km_final_veiculo", editarObjeto.km_final_veiculo);
            setValue("idResponsavelAutorizacao", editarObjeto.idResponsavelAutorizacao);
            setValue("idResponsavel", editarObjeto.idResponsavel);
            setValue("idPorteiroSaida", editarObjeto.idPorteiroSaida);
            setValue("idVeiculo", editarObjeto.idVeiculo);
            setValue("destino", editarObjeto.destino);
            setValue("condicao_saida", editarObjeto.condicao_saida);

            buscaNomeUsuariosResponsaveis();
        }
    }, [ehEdicao, editarObjeto, setValue]);

    return {
        control,
        handleSubmit,
        register,
        errors,
        veiculo,
        porteiro,
        pessoal,
        buscarVeiculos,
        buscarPorteiros,
        buscarPessoal,
        modalAberto,
        termoPesquisa,
        setModalAberto,
        setTermoPesquisa,
        campoSelecionado,
        setCampoSelecionado,
        setValue,
        watch,
        cadastrarSolicitacao,
        toast,
        setToast,
        abrirConfirmacaoSalvar,
        ehEdicao,
        carregando,
        estado,
        cidades,
        nomeEstadoSelecionado,
        siglaSelecionada,
        buscarUsuariosAprovadores,
        aprovadores,
        nomeResponsavel,
        setNomeResponsavel,
        nomeAutorizador,
        setNomeAutorizador
    };
}