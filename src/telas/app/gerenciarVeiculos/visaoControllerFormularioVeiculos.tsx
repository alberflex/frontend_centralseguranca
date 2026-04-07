import { useForm } from "react-hook-form";
import { IVeiculo, VeiculoUpdate } from "../../../interfaces/IVeiculo";
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
    const [carregando, setCarregando] = useState(false);
    const [previewImagem, setPreviewImagem] = useState<string | null>(null);

    const abrirConfirmacaoSalvar = (data: any) => {
        setToast({
            show: true, title: "Confirmar ação", message: ehEdicao ? "Deseja realmente atualizar este veículo?" : "Deseja realmente cadastrar este veículo?",
            onConfirm: async () => {
                setToast((prev) => ({ ...prev, show: false }));
                if (ehEdicao) {
                    await editarVeiculo(data);
                } else {
                    await cadastrarVeiculo(data);
                }
            },
        });
    };

    const editarVeiculo = async (data: any) => {
        if (!tokenJWT) return;

        try {
            if (carregando) return;
            setCarregando(true);

            const file = data.caminho_imagem_veiculo?.[0];

            const objEdicao = {
                modelo: data.modelo,
                km_atual: data.km_atual,
                caminho_imagem_veiculo: file
            };

            const veiculoEditado = await visaoModeloVeiculo.editarVeiculo(
                tokenJWT,
                objEdicao,
                editarObjeto.id,
            );

            if (!veiculoEditado) {
                alert("Erro ao editar acesso");
                return;
            }

            vaiParaVeiculos();
        } catch (error) {
            console.error("Erro ao editar acesso:", error);
            alert("Erro ao processar a edição");
        } finally {
            setCarregando(false);
        }
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
            setPreviewImagem(editarObjeto.caminho_imagem_veiculo);
        }
    }, [ehEdicao, editarObjeto?.id, setValue]);

    return {
        toast,
        setToast,
        abrirConfirmacaoSalvar,
        register,
        handleSubmit,
        errors,
        ehEdicao,
        editarObjeto,
        carregando,
        setCarregando,
        previewImagem,
        setPreviewImagem
    }
}   