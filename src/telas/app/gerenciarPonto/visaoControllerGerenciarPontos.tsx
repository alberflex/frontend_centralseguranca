import { useEffect, useState } from "react";
import { useAutenticacao } from "../../../contextos/useAutenticacao";
import { VisaoModeloPonto } from "../../../modelo/ponto/visaoModeloPonto";
import { IPontoTabela } from "../../../interfaces/IPonto";
import { useNavigate } from "react-router-dom";
import { ILayoutTabela } from "../../../componentes/tabelas/tabela";
import { IoAddCircleOutline } from "react-icons/io5";
import { formatarDataISO } from "../../../utils/converteDataISO";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

export const useVisaoControllerGerenciarPontos = () => {
    const { tokenJWT } = useAutenticacao();
    const [pontos, setPontos] = useState<IPontoTabela[]>([]);
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const objVisaoModeloPonto = new VisaoModeloPonto();
    const navegacao = useNavigate();
    const IconeAdicionar = IoAddCircleOutline as unknown as React.FC<{ size?: number, className?: string; }>;
    const vaiParaFormularioPonto = () => { navegacao("/FormularioPonto") }

    const buscarPontos = async (inicio?: string, fim?: string) => {
        if (!tokenJWT) return;
        try {
            const resposta = await objVisaoModeloPonto.listarTodosPontos(tokenJWT, inicio, fim);
            if (resposta && Array.isArray(resposta)) {
                const pontosTabela: IPontoTabela[] = resposta.map((ponto) => ({
                    id: ponto.id,
                    nome_colaborador: ponto.nome_colaborador,
                    nome_porteiro: String(ponto.nome_porteiro),
                    horarioEntrada: ponto.horarioEntrada,
                    horarioSaida: ponto.horarioSaida,
                    data: formatarDataISO(ponto.data)
                }));
                setPontos(pontosTabela);
            } else {
                setPontos([]);
            }
        } catch (error) {
            console.error("Erro ao buscar pontos:", error);
        }
    };

    const gerarPDF = () => {
        const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
        const pageWidth = doc.internal.pageSize.getWidth();

        const titulo = "Relatório de Controle de Pontos";
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

            const colunas = ["ID", "Nome colaborador", "Porteiro", "Horario entrada", "Horario saída", "Data"];

            const linhas = pontos.map(d => [
                d.id,
                d.nome_colaborador,
                d.nome_porteiro,
                d.horarioEntrada,
                d.horarioSaida,
                d.data
            ]);

            autoTable(doc, {
                head: [colunas],
                body: linhas,
                startY: 30,
                styles: { fontSize: 10 },
                headStyles: { fillColor: [0, 123, 255], textColor: 255 }
            });

            doc.save("RelatorioControlePontos.pdf");
        };
    };

    const limparFiltro = async () => {
        setDataInicio("");
        setDataFim("");
        await buscarPontos();
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

    useEffect(() => {
        if (tokenJWT) buscarPontos()
    }, [tokenJWT]);

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
        toast,
        setToast,
        abrirConfirmacaoExclusao,
        vaiParaFormularioPonto,
        IconeAdicionar,
        limparFiltro,
        dataInicio,
        dataFim,
        setDataFim,
        setDataInicio,
        buscarPontos,
        gerarPDF
    }
}