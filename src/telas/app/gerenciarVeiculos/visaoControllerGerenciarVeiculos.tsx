import { useNavigate } from "react-router-dom";
import { useAutenticacao } from "../../../contextos/useAutenticacao";
import { VisaoModeloVeiculo } from "../../../modelo/veiculo/visaoModeloVeiculo";
import { useEffect, useState } from "react";
import { IVeiculo } from "../../../interfaces/IVeiculo";
import { ILayoutTabela } from "../../../componentes/tabelas/tabela";
import { IoAddCircleOutline } from "react-icons/io5";

export const useVisaoControllerGerenciarVeiculo = () => {
    const [veiculo, setVeiculo] = useState<IVeiculo[]>([]);
    const navegacao = useNavigate();
    const vaiParaFormularioVeiculo = () => { navegacao("/FormularioVeiculo") }
    const objVisaoModeloVeiculo = new VisaoModeloVeiculo();
    const { tokenJWT } = useAutenticacao();
    const colunasTabela: ILayoutTabela<IVeiculo>[] = [{ key: 'id', label: 'ID' }, { key: 'placa', label: 'Placa' }, { key: 'modelo', label: 'Modelo' }, { key: 'km_atual', label: 'KM Atual' }];
    const IconeAdicionar = IoAddCircleOutline as unknown as React.FC<{ size?: number, className?: string; }>;

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

    const deletarVeiculo = async (id: number) => {
        if (!tokenJWT) return;
        try {
            if (await objVisaoModeloVeiculo.deletarVeiculo(tokenJWT, id)) buscarVeiculos()
        } catch (error) {
            console.error("Erro ao remover veiculo:", error);
        }
    };

    const selecionarVeiculo = async (id: number) => {
        if (!tokenJWT) return;
        try {
            const veiculo = await objVisaoModeloVeiculo.listarVeiculosPorID(tokenJWT, id);
            console.log(veiculo);
            navegacao('/FormularioVeiculo', {
                state: { ehEdicao: true, editarObjeto: veiculo }
            });
        } catch (error) {
            alert("Erro ao selecionar o porteiro.");
        }
    }

    useEffect(() => { if (tokenJWT) buscarVeiculos() }, [tokenJWT]);

    const [toast, setToast] = useState({
        show: false,
        title: "",
        message: "",
        onConfirm: () => { },
    });

    const abrirConfirmacaoExclusao = (id: number) => {
        setToast({
            show: true,
            title: "Confirmar exclusão",
            message: "Tem certeza que deseja remover este veiculo?",
            onConfirm: async () => {
                setToast(prev => ({ ...prev, show: false }));
                await deletarVeiculo(id);
                await buscarVeiculos();
            },
        });
    };

    return {
        vaiParaFormularioVeiculo,
        selecionarVeiculo,
        deletarVeiculo,
        colunasTabela,
        veiculo,
        toast, setToast,
        abrirConfirmacaoExclusao, IconeAdicionar
    }
}