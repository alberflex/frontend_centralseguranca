import { useNavigate } from 'react-router-dom';
import { IoAddCircleOutline } from "react-icons/io5";
import { useEffect, useState } from 'react';
import { useAutenticacao } from '../../../contextos/useAutenticacao';
import { IControleAcessoTabela } from '../../../interfaces/IControleAcesso';
import { VisaoModeloSolicitacaoAcesso } from '../../../modelo/solicitacaoAcesso/visaoModeloSolicitacaoAcesso';
import { ILayoutTabela } from '../../../componentes/tabelas/tabela';

export const useVisaoControllerGerenciarAcessos = () => {
    const { tokenJWT } = useAutenticacao();
    const [acessos, setAcessos] = useState<IControleAcessoTabela[]>([]);
    const objVisaoModeloAcessos = new VisaoModeloSolicitacaoAcesso();
    const IconeAdicionar = IoAddCircleOutline as unknown as React.FC<{ size?: number, className?: string; }>;
    const navegacao = useNavigate();
    const vaiParaFormularioAcesso = () => { navegacao("/FormularioControleAcesso"); }

    const buscarAcessos = async () => {
        if (!tokenJWT) return;
        try {
            const informacoesAcessos = await objVisaoModeloAcessos.listarTodasSolicitacoesAcesso(tokenJWT);
            if (informacoesAcessos && Array.isArray(informacoesAcessos)) {
                setAcessos(informacoesAcessos);
            } else {
                setAcessos([]);
            }
        } catch (error) {
            console.error("Erro ao buscar acessos:", error);
        }
    };

    const deletarAcesso = async (id: number) => {
        if (!tokenJWT) return;
        try {
            if (await objVisaoModeloAcessos.deletarSolicitacaoAcesso(tokenJWT, id)) buscarAcessos();
        } catch (error) {
            console.error("Erro ao remover acesso:", error);
        }
    };

    const selecionarAcesso = async (id: number) => {
        if (!tokenJWT) return;
        try {
            const acesso = await objVisaoModeloAcessos.listarSolicitacaoAcessoPorID(tokenJWT, id);
            navegacao('/FormularioControleAcesso', { state: { ehEdicao: true, editarObjeto: acesso } });
        } catch (error) {
            alert("Erro ao selecionar a solicitacao acesso.");
        }
    }

    useEffect(() => { if (tokenJWT) buscarAcessos() }, [tokenJWT]);
    const colunasTabela: ILayoutTabela<IControleAcessoTabela>[] = [
        { key: 'id', label: 'ID' },
        { key: 'nomeVisitante', label: 'Nome visitante' },
        { key: 'nomePorteiroEntrada', label: 'Porteiro entrada' },
        { key: 'nomePorteiroSaida', label: 'Porteiro saída' },
        { key: 'data_entrada', label: 'Data entrada' },
        { key: 'hora_entrada', label: 'Hora entrada' },
        { key: 'data_saida', label: 'Data saída' },
        { key: 'hora_saida', label: 'Hora final' },
        { key: 'objetivo', label: 'Objetivo' },
        { key: 'placaVeiculo', label: 'Placa veiculo' },
        { key: 'numeroCartao', label: 'Numero cartão' },
        { key: 'responsavel', label: 'Responsável' }
    ];
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
            message: "Tem certeza que deseja remover este registro de acesso?",
            onConfirm: async () => {
                setToast({ ...toast, show: false });
                await deletarAcesso(id);
            },
        });
    };

    return {
        selecionarAcesso,
        deletarAcesso, acessos, colunasTabela,
        toast, setToast, abrirConfirmacaoExclusao, IconeAdicionar, vaiParaFormularioAcesso
    }
}   