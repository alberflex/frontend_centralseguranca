import { useForm } from "react-hook-form";
import { IVeiculo } from "../../../interfaces/IVeiculo";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAutenticacao } from "../../../contextos/useAutenticacao";
import { VisaoModeloVeiculo } from "../../../modelo/veiculo/visaoModeloVeiculo";

export const useVisaoControllerFormularioVeiculo = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IVeiculo>({ defaultValues: { placa: "", caminho_imagem_veiculo: "", km_atual: 0, modelo: "" }, });
    const estadoFormulario = useLocation();
    const { ehEdicao, editarObjeto } = estadoFormulario.state || {};
    const { tokenJWT } = useAutenticacao();
    const navegacao = useNavigate()
    const vaiParaVeiculos = () => { navegacao("/ControleVeiculo") }
    const visaoModeloVeiculo = new VisaoModeloVeiculo();
    const [toast, setToast] = useState({ show: false, title: "", message: "", onConfirm: () => { } });

    const abrirConfirmacaoSalvar = (data: any) => {
        setToast({
            show: true, title: "Confirmar ação", message: ehEdicao ? "Deseja realmente atualizar este veículo?" : "Deseja realmente cadastrar este veículo?",
            onConfirm: async () => {
                setToast((prev) => ({ ...prev, show: false }));
                if (ehEdicao) {
                    //await fecharPonto(editarObjeto.id);
                } else {
                    await cadastrarVeiculo(data);
                }
            },
        });
    };

    const cadastrarVeiculo = async (dadosFormulario: IVeiculo) => {
        if (!tokenJWT) return;
        try {
            if (await visaoModeloVeiculo.cadastrarVeiculo(tokenJWT, dadosFormulario)) vaiParaVeiculos();
        } catch (error) {
            alert("Erro ao cadastrar ponto")
        }
    }

    useEffect(() => {
        if (ehEdicao && editarObjeto) {
            setValue("placa", editarObjeto.placa);
            setValue("km_atual", editarObjeto.km_atual);
            setValue("modelo", editarObjeto.modelo);
            setValue("caminho_imagem_veiculo", editarObjeto.caminho_imagem_veiculo);
        }
    }, [ehEdicao, editarObjeto?.id, setValue]);

    return {
        toast, setToast, abrirConfirmacaoSalvar,
        register, handleSubmit, errors, ehEdicao, editarObjeto
    }
}   