import { useNavigate } from 'react-router-dom';
import { IoAddCircleOutline } from "react-icons/io5";
import { useEffect, useState } from 'react';
import { useAutenticacao } from '../../../contextos/useAutenticacao';
import { IControleAcessoTabela } from '../../../interfaces/IControleAcesso';
import { VisaoModeloSolicitacaoAcesso } from '../../../modelo/solicitacaoAcesso/visaoModeloSolicitacaoAcesso';
import { ILayoutTabela } from '../../../componentes/tabelas/tabela';
import { formatarDataISO } from '../../../utils/converteDataISO';
import { extrairHoraISO } from '../../../utils/FormataHora';
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

export const useVisaoControllerGerenciarAcessos = () => {
    const { tokenJWT } = useAutenticacao();
    const [acessos, setAcessos] = useState<IControleAcessoTabela[]>([]);
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const objVisaoModeloAcessos = new VisaoModeloSolicitacaoAcesso();
    const IconeAdicionar = IoAddCircleOutline as unknown as React.FC<{ size?: number, className?: string; }>;
    const navegacao = useNavigate();
    const vaiParaFormularioAcesso = () => { navegacao("/FormularioControleAcesso"); }

    const buscarAcessos = async (inicio?: string, fim?: string) => {
        if (!tokenJWT) return;
        try {
            const informacoesAcessos = await objVisaoModeloAcessos.listarTodasSolicitacoesAcesso(tokenJWT, inicio, fim);
            if (informacoesAcessos && Array.isArray(informacoesAcessos)) {
                const informacoesFormatadas = informacoesAcessos.map(item => ({
                    ...item,
                    data_entrada: item.data_entrada ? formatarDataISO(item.data_entrada) : "",
                    data_saida: item.data_saida ? formatarDataISO(item.data_saida) : "",
                    hora_entrada: item.hora_entrada ? extrairHoraISO(item.hora_entrada) : "",
                    hora_saida: item.hora_saida ? extrairHoraISO(item.hora_saida) : "",
                }));
                setAcessos(informacoesFormatadas);
            } else {
                setAcessos([]);
            }
        } catch (error) {
            console.error("Erro ao buscar acessos:", error);
        }
    };

    const gerarPDF = () => {
        const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
        const pageWidth = doc.internal.pageSize.getWidth();

        const titulo = "Relatório de Controle de Acessos";
        doc.setFontSize(18);
        const textWidth = doc.getTextWidth(titulo);
        doc.text(titulo, (pageWidth - textWidth) / 2, 20);

        const logoUrl = `${window.location.origin}/images/alberflex.png`;
        const imgWidth = 40;
        const imgHeight = 15;
        const img = new Image();
        img.src = logoUrl;
        img.onload = () => {
            doc.addImage(img, "PNG", pageWidth - imgWidth - 10, 5, imgWidth, imgHeight);

            const colunas = [
                "ID",
                "Nome visitante",
                "Porteiro entrada",
                "Porteiro saída",
                "Data entrada",
                "Hora entrada",
                "Data saída",
                "Hora final",
                "Placa veiculo",
                "Numero cartão",
                "Responsável",
            ];

            const linhas = acessos.map(d => [
                d.id,
                d.nomeVisitante,
                d.nomePorteiroEntrada,
                d.nomePorteiroSaida,
                d.data_entrada,
                d.hora_entrada,
                d.data_saida,
                d.hora_saida,
                d.placaVeiculo,
                d.numeroCartao,
                d.responsavel
            ]);

            autoTable(doc, {
                head: [colunas],
                body: linhas,
                startY: 30,
                styles: { fontSize: 10 },
                headStyles: { fillColor: [0, 123, 255], textColor: 255 }
            });

            doc.save("RelatorioControleAcesso.pdf");
        };
    };


    const limparFiltro = async () => {
        setDataInicio("");
        setDataFim("");
        await buscarAcessos();
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
        deletarAcesso,
        acessos,
        colunasTabela,
        toast,
        setToast,
        abrirConfirmacaoExclusao,
        IconeAdicionar,
        vaiParaFormularioAcesso,
        dataInicio,
        dataFim,
        setDataFim,
        setDataInicio,
        buscarAcessos,
        limparFiltro,
        gerarPDF
    }
}   