import { useEffect, useState } from "react";
import { useAutenticacao } from "../../../contextos/useAutenticacao";
import { VisaoModeloVeiculo } from "../../../modelo/veiculo/visaoModeloVeiculo";
import { IVeiculo } from "../../../interfaces/IVeiculo";
import { VisaoModeloPorteiro } from "../../../modelo/porteiro/visaoModeloPorteiro";
import { IPorteiro } from "../../../interfaces/IPorteiro";
import { useForm } from "react-hook-form";
import { IControleVeiculo, IControleVeiculoCadastro, IUsuario } from "../../../interfaces/IControleVeiculo";
import { VisaoModeloSolicitacaoVeiculo } from "../../../modelo/solicitacaoVeiculo/visaoModeloSolicitacaoVeiculo";
import { useLocation, useNavigate } from "react-router-dom";

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
            km_final_veiculo: undefined
        }
    });

    const objVisaoModeloVeiculo = new VisaoModeloVeiculo();
    const objVisaoModeloUsuario = new VisaoModeloPorteiro();
    const objVisaoModeloSolicitacaoVeiculo = new VisaoModeloSolicitacaoVeiculo();

    const [veiculo, setVeiculo] = useState<IVeiculo[]>([]);
    const [porteiro, setPorteiro] = useState<IPorteiro[]>([]);
    const [pessoal, setPessoal] = useState<IUsuario[]>([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [termoPesquisa, setTermoPesquisa] = useState("");
    const [campoSelecionado, setCampoSelecionado] = useState<"idResponsavel" | "idResponsavelAutorizacao" | "idVeiculo" | null>(null);
    const [carregando, setCarregando] = useState(false);

    const [toast, setToast] = useState({ show: false, title: "", message: "", onConfirm: () => { }, });
    const { tokenJWT } = useAutenticacao();
    const estadoFormulario = useLocation();
    const { ehEdicao, editarObjeto } = estadoFormulario.state || {};
    const navegacao = useNavigate();
    const vaiParaSolicitacoesVeiculos = () => { navegacao("/ControleSolicitacaoVeiculo") };

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

    const cadastrarSolicitacao = async (dadosFormulario: IControleVeiculoCadastro) => {
        if (!tokenJWT) return;
        try {
            if (carregando) return;
            setCarregando(true);
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

    useEffect(() => {
        if (ehEdicao && editarObjeto) {
            setValue("destino", editarObjeto.destino);
            setValue("localizacao", editarObjeto.localizacao);
            setValue("km_final_veiculo", editarObjeto.km_final_veiculo);
            setValue("idResponsavelAutorizacao", editarObjeto.idResponsavelAutorizacao);
            setValue("idResponsavel", editarObjeto.idResponsavel);
            setValue("idPorteiroSaida", editarObjeto.idPorteiroSaida);
            setValue("idVeiculo", editarObjeto.idVeiculo);
        }
    }, [ehEdicao, editarObjeto?.id, setValue]);

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
        carregando
    };
}