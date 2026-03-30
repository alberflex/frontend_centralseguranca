import { useNavigate } from "react-router-dom";
import { ILayoutTabela } from "../../../componentes/tabelas/tabela";
import { IPorteiro } from "../../../interfaces/IPorteiro";
import { VisaoModeloPorteiro } from "../../../modelo/porteiro/visaoModeloPorteiro";
import { useEffect, useState } from "react";
import { useAutenticacao } from "../../../contextos/useAutenticacao";
import { IoAddCircleOutline } from "react-icons/io5";

export const useVisaoControllerGerenciarUsuarios = () => {
    const objVisaoModeloPorteiro = new VisaoModeloPorteiro();
    const { tokenJWT, informacoesUsuario } = useAutenticacao();
    const [porteiro, setPorteiro] = useState<IPorteiro[]>([]);
    const [toast, setToast] = useState({ show: false, title: "", message: "", onConfirm: () => { } });
    const colunasTabela: ILayoutTabela<IPorteiro>[] = [{ key: 'id', label: 'ID' }, { key: 'cpf', label: 'CPF' }, { key: 'nome', label: 'Nome' }, { key: 'papel', label: 'Papel' }];
    const navegacao = useNavigate();
    const IconeAdicionar = IoAddCircleOutline as unknown as React.FC<{ size?: number, className?: string; }>;

    const vaiParaFormularioPortaria = () => {
        navegacao("/FormularioUsuarios");
    }

    const buscarPorteiros = async () => {
        if (!tokenJWT) return;
        try {
            const informacoesUsuarios = await objVisaoModeloPorteiro.listarTodosPorteiros(tokenJWT);
            if (informacoesUsuarios && Array.isArray(informacoesUsuarios)) {
                setPorteiro(informacoesUsuarios);
            } else {
                setPorteiro([]);
            }
        } catch (error) {
            console.error("Erro ao buscar porteiros cadastrados:", error);
        }
    };

    const deletarPorteiro = async (id: number) => {
        if (!tokenJWT) return;
        try {
            if (await objVisaoModeloPorteiro.deletarPorteiro(tokenJWT, id)) buscarPorteiros();
        } catch (error) {
            console.error("Erro ao remover porteiro:", error);
        }
    };

    const selecionarPorteiro = async (id: number) => {
        if (!tokenJWT) return;
        try {
            const usuario = await objVisaoModeloPorteiro.listarPorteirosPorID(tokenJWT, id);
            navegacao('/FormularioUsuarios', {
                state: { ehEdicao: true, editarObjeto: usuario }
            });
        } catch (error) {
            alert("Erro ao selecionar o porteiro.");
        }
    }

    useEffect(() => { if (tokenJWT) buscarPorteiros() }, [tokenJWT]);

    const abrirConfirmacaoExclusao = (id: number) => {
        setToast({
            show: true,
            title: "Confirmar exclusão",
            message: "Tem certeza que deseja remover este usuário?",
            onConfirm: async () => {
                setToast({ ...toast, show: false });
                await deletarPorteiro(id);
            },
        });
    };

    return {
        selecionarPorteiro,
        abrirConfirmacaoExclusao,
        colunasTabela,
        porteiro,
        IconeAdicionar,
        vaiParaFormularioPortaria,
        informacoesUsuario
    }
}