import { useEffect, useMemo, useState } from "react";
import { useAutenticacao } from '../../../contextos/useAutenticacao';
import { ILayoutTabela } from '../../../componentes/tabelas/tabela';
import { VisaoModeloLog } from '../../../modelo/logs/visaoModeloLog';
import { ILogTabela } from '../../../interfaces/ILog';
import "jspdf-autotable";

export const useVisaoControllerGerenciarLogs = () => {
    const { tokenJWT, informacoesUsuario } = useAutenticacao();
    const [logs, setLogs] = useState<ILogTabela[]>([]);
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [logSelecionado, setLogSelecionado] = useState<any>(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 15;
    const objVisaoModeloLog = new VisaoModeloLog();

    const buscarLogs = async (inicio?: string, fim?: string) => {
        if (!tokenJWT) return;

        try {
            const informacoesLogs = await objVisaoModeloLog.listarTodosLogs(tokenJWT, inicio, fim);

            if (informacoesLogs && Array.isArray(informacoesLogs)) {

                const informacoesFormatada = informacoesLogs.map((log: any) => ({
                    ...log,
                    dadosAntes: log.dadosAntes
                        ? log.dadosAntes.substring(0, 100)
                        : "",
                    dadosDepois: log.dadosDepois
                        ? log.dadosDepois.substring(0, 100)
                        : ""
                }));

                setLogs(informacoesFormatada);
                setPaginaAtual(1);
            } else {
                setLogs([]);
            }

        } catch (error) {
            console.error("Erro ao buscar logs:", error);
        }
    };

    const limparFiltro = async () => {
        setDataInicio("");
        setDataFim("");
        await buscarLogs();
    };

    const formatarJson = (jsonString: string) => {
        try {
            const obj = JSON.parse(jsonString);
            return JSON.stringify(obj, null, 2);
        } catch {
            return jsonString;
        }
    };

    const selecionarLogPorID = async (id: number) => {
        if (!tokenJWT) return;
        try {
            const log = await objVisaoModeloLog.listarLogPorID(tokenJWT, id);
            setLogSelecionado(log);
            setMostrarModal(true);
        } catch (error) {
            alert("Erro ao selecionar a log por id.");
        }
    }

    useEffect(() => { if (tokenJWT) buscarLogs() }, [tokenJWT]);
    const colunasTabela: ILayoutTabela<ILogTabela>[] = [
        { key: 'id', label: 'ID' },
        { key: 'mensagem', label: 'Mensagem' },
        { key: 'dadosAntes', label: 'Dados Antes' },
        { key: 'dadosDepois', label: 'Dados Depois' },
    ];

    const totalPaginas = Math.max(1, Math.ceil(logs.length / itensPorPagina));
    const logsPaginados = useMemo(() => logs.slice((paginaAtual - 1) * itensPorPagina, paginaAtual * itensPorPagina), [logs, paginaAtual]);

    return {
        logsPaginados,
        paginaAtual,
        setPaginaAtual,
        totalPaginas,
        logs,
        colunasTabela,
        dataInicio,
        dataFim,
        setDataFim,
        setDataInicio,
        buscarLogs,
        limparFiltro,
        informacoesUsuario,
        selecionarLogPorID,
        logSelecionado,
        mostrarModal,
        setMostrarModal,
        formatarJson
    }
}   