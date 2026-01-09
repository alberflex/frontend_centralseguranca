import { useForm } from "react-hook-form";
import { IPorteiro } from "../../../interfaces/IPorteiro";
import { useAutenticacao } from "../../../contextos/useAutenticacao";
import { VisaoModeloPorteiro } from "../../../modelo/porteiro/visaoModeloPorteiro";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const useVisaoControllerFormularioUsuario = () => {
    const { control, handleSubmit, register, setValue, formState: { errors } } = useForm<IPorteiro>({ defaultValues: { nome: "", cpf: "", chapa: "", senha: "", papel: "" } });
    const { tokenJWT } = useAutenticacao();
    const estadoFormulario = useLocation();
    const { ehEdicao, editarObjeto } = estadoFormulario.state || {};
    const objVisaoModeloPorteiro = new VisaoModeloPorteiro();
    const navegacao = useNavigate();
    const vaiParaGerenciamentoUsuarios = () => { navegacao("/GerenciamentoUsuarios") }
    const [toast, setToast] = useState({ show: false, title: "", message: "", onConfirm: () => { } });

    const abrirConfirmacaoSalvar = (data: any) => {
        setToast({
            show: true,
            title: "Confirmar ação",
            message: ehEdicao
                ? "Deseja realmente atualizar este usuário?"
                : "Deseja realmente cadastrar este usuário?",
            onConfirm: async () => {
                setToast((prev) => ({ ...prev, show: false }));
                if (ehEdicao) {
                    await editarPorteiro(data);
                } else {
                    await cadastrarPorteiro(data);
                }
            },
        });
    };

    const cadastrarPorteiro = async (dadosFormulario: IPorteiro) => {
        if (!tokenJWT) return;
        try {
            if (await objVisaoModeloPorteiro.cadastrarPorteiro(tokenJWT, dadosFormulario)) vaiParaGerenciamentoUsuarios()
            else
                alert("Erro ao cadastrar porteiro")
        } catch (error) {
            console.log(error);
        }
    }

    const editarPorteiro = async (dadosFormulario: IPorteiro) => {
        if (!tokenJWT) return;
        try {
            if (await objVisaoModeloPorteiro.editarPorteiro(tokenJWT, editarObjeto.id!, dadosFormulario.senha, dadosFormulario.papel))
                vaiParaGerenciamentoUsuarios();
            else
                alert("Erro ao editar porteiro");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (ehEdicao && editarObjeto) {
            setValue("nome", editarObjeto.nome);
            setValue("cpf", editarObjeto.cpf);
            setValue("chapa", editarObjeto.chapa);
            setValue("senha", "");

            type PapelNome = "ADMINISTRADOR" | "PORTEIRO" | "SUPERVISOR";
            const mapaPapeis: Record<PapelNome, string> = { ADMINISTRADOR: "ADMINISTRADOR", PORTEIRO: "PORTEIRO", SUPERVISOR: "SUPERVISOR" };

            const papelNome = editarObjeto.papel?.toString() as PapelNome;
            const papelId = mapaPapeis[papelNome] || editarObjeto.papel?.toString() || "";

            setValue("papel", papelId);
        }
    }, [ehEdicao, editarObjeto?.id, setValue]);

    return {
        cadastrarPorteiro,
        handleSubmit,
        register,
        setValue,
        abrirConfirmacaoSalvar,
        setToast,
        control,
        ehEdicao,
        toast,
        errors,
    }
}