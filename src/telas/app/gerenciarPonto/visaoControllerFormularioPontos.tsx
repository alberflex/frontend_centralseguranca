import { useEffect, useState } from "react";
import { useAutenticacao } from "../../../contextos/useAutenticacao";
import { IUsuarioPonto } from "../../../interfaces/IUsuarioPonto";
import { VisaoModeloPonto } from "../../../modelo/ponto/visaoModeloPonto";
import { useForm } from "react-hook-form";
import { VisaoModeloUsuarioPonto } from "../../../modelo/usuarioPonto/visaoModeloUsuarioPonto";
import { useLocation, useNavigate } from "react-router-dom";

export const useVisaoControllerFormularioPontos = () => {
    const { tokenJWT } = useAutenticacao();
    const { control, handleSubmit, register, setValue, formState: { errors } } = useForm<IUsuarioPonto>();
    const visaoModeloUsuarioPonto = new VisaoModeloUsuarioPonto();
    const visaoModeloPonto = new VisaoModeloPonto();
    const estadoFormulario = useLocation();
    const { ehEdicao, editarObjeto } = estadoFormulario.state || {};
    const navegacao = useNavigate();
    const vaiParaPontos = () => { navegacao("/ControlePonto") }
    const [toast, setToast] = useState({ show: false, title: "", message: "", onConfirm: () => { } });
    const [carregando, setCarregando] = useState(false);
    const [usuariosPontos, setUsuariosPontos] = useState<IUsuarioPonto[]>([]);


    const abrirConfirmacaoSalvar = (data: any) => {
        setToast({
            show: true,
            title: "Confirmar ação",
            message: ehEdicao
                ? "Deseja realmente atualizar este usuário?"
                : "Deseja realmente cadastrar este ponto?",
            onConfirm: async () => {
                setToast((prev) => ({ ...prev, show: false }));
                if (ehEdicao) {
                    await fecharPonto(editarObjeto.id);
                } else {
                    await cadastrarPonto(data);
                }
            },
        });
    };

    const buscarUsuariosControlePonto = async () => {
        if (!tokenJWT) return;
        try {
            const usuarioPontos = await visaoModeloUsuarioPonto.listarTodosUsuariosPontos(tokenJWT);
            if (usuarioPontos && Array.isArray(usuarioPontos)) {
                setUsuariosPontos(usuarioPontos);
            } else {
                setUsuariosPontos([]);
            }
        } catch (error) {
            console.error("Erro ao buscar usuarios de controle ponto:", error);
        }
    }

    const cadastrarPonto = async (dadosFormulario: string) => {
        if (!tokenJWT) return;
        try {
            if (carregando) return;
            setCarregando(true);
            if (await visaoModeloPonto.cadastrarPonto(tokenJWT, dadosFormulario)) vaiParaPontos();
        } catch (error) {
            alert("Erro ao cadastrar ponto")
        } finally {
            setCarregando(false);
        }
    }

    const fecharPonto = async (id: number) => {
        if (!tokenJWT) return;
        try {
            if (carregando) return;
            setCarregando(true);
            if (await visaoModeloPonto.fecharPonto(tokenJWT, id)) vaiParaPontos();
        } catch (error) {
            alert("Erro ao editar ponto")
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        if (tokenJWT) { buscarUsuariosControlePonto() }
    }, [tokenJWT])


    useEffect(() => {
        if (ehEdicao && editarObjeto) {
            if (editarObjeto.chapa) {
                setValue("chapa", editarObjeto.chapa);
            }
        }
    }, [ehEdicao, editarObjeto, setValue]);

    return {
        usuariosPontos,
        abrirConfirmacaoSalvar, 
        toast, 
        setToast,
        control, 
        handleSubmit, 
        register, 
        setValue, 
        errors, 
        ehEdicao,
        carregando
    }
}