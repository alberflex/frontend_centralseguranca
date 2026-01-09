import { useEffect, useState } from "react";
import { IoAddCircleOutline, IoSearchOutline } from "react-icons/io5";
import { BsPlusCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAutenticacao } from "../../../contextos/useAutenticacao";
import { VisaoModeloSolicitacaoVeiculo } from "../../../modelo/solicitacaoVeiculo/visaoModeloSolicitacaoVeiculo";
import { IControleVeiculoTabela } from "../../../interfaces/IControleVeiculo";
import { ILayoutTabela } from "../../../componentes/tabelas/tabela";

export const useVisaoControllerListagemSolicitacaoVeiculo = () => {
    const navegacao = useNavigate();
    const { tokenJWT } = useAutenticacao();
    const objVisaoModeloSolicitacaoVeiculo = new VisaoModeloSolicitacaoVeiculo();
    const vaiParaFormularioSolicitacaoVeiculo = () => { navegacao("/FormularioSolicitacaoVeiculo") };
    const IconeAdicionar = IoAddCircleOutline as unknown as React.FC<{ size?: number, className?: string; }>;

    const [solicitacaoVeiculo, setSolicitacaoVeiculo] = useState<IControleVeiculoTabela[]>([])

    const buscarSolicitacaoVeiculo = async () => {
        if (!tokenJWT) return;
        try {
            const informacoesSolicitacoesVeiculo = await objVisaoModeloSolicitacaoVeiculo.listarTodosVeiculos(tokenJWT);
            if (informacoesSolicitacoesVeiculo && Array.isArray(informacoesSolicitacoesVeiculo)) {
                setSolicitacaoVeiculo(informacoesSolicitacoesVeiculo);
            } else {
                setSolicitacaoVeiculo([]);
            }
        } catch (error) {
            console.error("Erro ao buscar veiculos cadastrados:", error);
        }
    };

    const deletarSolicitacaoVeiculo = async (id: number) => {
        if (!tokenJWT) return;
        try {
            if (await objVisaoModeloSolicitacaoVeiculo.deletarVeiculo(tokenJWT, id)) buscarSolicitacaoVeiculo();
        } catch (error) {
            console.error("Erro ao remover solicitacaoVeiculo:", error);
        }
    };

    const selecionarSolicitacaoVeiculo = async (id: number) => {
        if (!tokenJWT) return;
        try {
            const solicitacaoVeiculo = await objVisaoModeloSolicitacaoVeiculo.listarVeiculosPorID(tokenJWT, id);
            navegacao('/FormularioSolicitacaoVeiculo', {
                state: { ehEdicao: true, editarObjeto: solicitacaoVeiculo }
            });
        } catch (error) {
            alert("Erro ao selecionar a solicitacao veiculo.");
        }
    }

    const colunasTabela: ILayoutTabela<IControleVeiculoTabela>[] = [
        { key: 'id', label: 'ID' },
        { key: 'placa', label: 'Veiculo' },
        { key: 'data_solicitacao', label: 'Data Solicitação' },
        { key: 'horario_saida', label: 'Horario Saída' },
        { key: 'km_inicial_veiculo', label: 'KM inicial' },
        { key: 'data_chegada', label: 'Data chegada' },
        { key: 'horario_chegada', label: 'Horario Chegada' },
        { key: 'km_final_veiculo', label: 'KM Final' },
        { key: 'nome_porteiro_saida', label: 'Porteiro saída' },
        { key: 'nome_responsavel', label: 'Responsável' },
        { key: 'localizacao', label: 'Localização' },
        { key: 'nome_porteiro_entrada', label: 'Porteiro entrada' },
        { key: 'nome_responsavel_autorizacao', label: 'Responsável' },
    ];

    useEffect(() => { if (tokenJWT) buscarSolicitacaoVeiculo() }, [tokenJWT]);

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
            message: "Tem certeza que deseja remover este registro de solicitação de veículo?",
            onConfirm: async () => {
                setToast({ ...toast, show: false });
                await deletarSolicitacaoVeiculo(id);
            },
        });
    };

    return {
        solicitacaoVeiculo,
        deletarSolicitacaoVeiculo,
        selecionarSolicitacaoVeiculo,
        colunasTabela, toast, setToast,
        abrirConfirmacaoExclusao, IconeAdicionar, vaiParaFormularioSolicitacaoVeiculo
    }
}