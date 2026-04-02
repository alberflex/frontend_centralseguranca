import { useNavigate } from "react-router-dom";
import { ILayoutTabela } from "../../../componentes/tabelas/tabela";
import { IPorteiro } from "../../../interfaces/IPorteiro";
import { VisaoModeloPorteiro } from "../../../modelo/porteiro/visaoModeloPorteiro";
import { useEffect, useState } from "react";
import { useAutenticacao } from "../../../contextos/useAutenticacao";
import { IoAddCircleOutline } from "react-icons/io5";
import { VisaoModeloUsuario } from "../../../modelo/usuario/visaoModeloUsuario";

export const useVisaoControllerGerenciarUsuarios = () => {
    const [porteiro, setPorteiro] = useState<IPorteiro[]>([]);
    const [dataFim, setDataFim] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [toast, setToast] = useState({ show: false, title: "", message: "", onConfirm: () => { } });
    const objVisaoModeloPorteiro = new VisaoModeloPorteiro();
    const objVisaoModeloUsuario = new VisaoModeloUsuario();
    
    const { tokenJWT, informacoesUsuario } = useAutenticacao();

    const colunasTabela: ILayoutTabela<IPorteiro>[] = [{ key: 'id', label: 'ID' }, { key: 'cpf', label: 'CPF' }, { key: 'nome', label: 'Nome' }, { key: 'papel', label: 'Papel' }];
    const navegacao = useNavigate();
    const IconeAdicionar = IoAddCircleOutline as unknown as React.FC<{ size?: number, className?: string; }>;

    const vaiParaFormularioPortaria = () => { navegacao("/FormularioUsuarios"); }

    const buscarUsuarios = async () => {
        if (!tokenJWT) return;
        try {
            const informacoesUsuarios = await objVisaoModeloUsuario.listarTodosUsuariosPontos(tokenJWT);
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
            if (await objVisaoModeloPorteiro.deletarPorteiro(tokenJWT, id)) buscarUsuarios();
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

    useEffect(() => { if (tokenJWT) buscarUsuarios() }, [tokenJWT]);

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
    const limparFiltro = async () => {
        setDataInicio("");
        setDataFim("");
        await buscarUsuarios();
    };
    return {
        selecionarPorteiro,
        abrirConfirmacaoExclusao,
        colunasTabela,
        porteiro,
        IconeAdicionar,
        vaiParaFormularioPortaria,
        informacoesUsuario,
        buscarUsuarios,
        dataFim,
        setDataFim,
        limparFiltro,
        dataInicio,
        setDataInicio
    }
}