import { useEffect, useState } from "react";
import { useAutenticacao } from "../../../contextos/useAutenticacao";
import { VisaoModeloPonto } from "../../../modelo/ponto/visaoModeloPonto";
import { IPontoTabela } from "../../../interfaces/IPonto";
import { useNavigate } from "react-router-dom";
import { ILayoutTabela } from "../../../componentes/tabelas/tabela";
import { IoAddCircleOutline } from "react-icons/io5";

export const useVisaoControllerGerenciarPontos = () => {
    const { tokenJWT } = useAutenticacao();
    const [pontos, setPontos] = useState<IPontoTabela[]>([]);
    const objVisaoModeloPonto = new VisaoModeloPonto();
    const navegacao = useNavigate();
    const IconeAdicionar = IoAddCircleOutline as unknown as React.FC<{ size?: number, className?: string; }>;
    const vaiParaFormularioPonto = () => { navegacao("/FormularioPonto") }
    
    const buscarPontos = async () => {
        if (!tokenJWT) return;
        try {
            const informacoesPonto = await objVisaoModeloPonto.listarTodosPontos(tokenJWT);
            console.log(informacoesPonto);
            if (informacoesPonto && Array.isArray(informacoesPonto)) {
                setPontos(informacoesPonto);
            } else {
                setPontos([]);
            }
        } catch (error) {
            console.error("Erro ao buscar pontos cadastrados:", error);
        }
    };

    const deletarPonto = async (id: number) => {
        if (!tokenJWT) return;
        try {
            if (await objVisaoModeloPonto.deletarPonto(tokenJWT, id)) buscarPontos();
        } catch (error) {
            console.error("Erro ao remover ponto:", error);
        }
    };

    const selecionarPonto = async (id: number) => {
        if (!tokenJWT) return;
        try {
            const ponto = await objVisaoModeloPonto.listarPontoPorID(tokenJWT, id);
            navegacao('/FormularioPonto', {
                state: { ehEdicao: true, editarObjeto: ponto }
            });
        } catch (error) {
            alert("Erro ao selecionar ponto.");
        }
    }
    
    const colunasTabela: ILayoutTabela<IPontoTabela>[] = [
        { key: 'id', label: 'ID' },
        { key: 'nome_colaborador', label: 'Nome colaborador' },
        { key: 'nome_porteiro', label: 'Porteiro' },
        { key: 'horarioEntrada', label: 'Horario entrada' },
        { key: 'horarioSaida', label: 'Horario saída' },
        { key: 'data', label: 'Data' },
    ];

    useEffect(() => { if (tokenJWT) buscarPontos() }, [tokenJWT]);

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
            message: "Tem certeza que deseja remover este registro de ponto?",
            onConfirm: async () => {
                setToast({ ...toast, show: false });
                await deletarPonto(id);
            },
        });
    };

    return {
        deletarPonto,
        selecionarPonto,
        pontos,
        colunasTabela,
        toast, setToast, abrirConfirmacaoExclusao, vaiParaFormularioPonto, IconeAdicionar
    }
}