import { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAutenticacao } from "../../../contextos/useAutenticacao";
import { VisaoModeloSolicitacaoVeiculo } from "../../../modelo/solicitacaoVeiculo/visaoModeloSolicitacaoVeiculo";
import { IControleVeiculoTabela } from "../../../interfaces/IControleVeiculo";
import { ILayoutTabela } from "../../../componentes/tabelas/tabela";
import { formatarDataISO } from "../../../utils/converteDataISO";
import { extrairHoraISO } from "../../../utils/FormataHora";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

export const useVisaoControllerListagemSolicitacaoVeiculo = () => {
    const { tokenJWT } = useAutenticacao();
    const navegacao = useNavigate();
    const objVisaoModeloSolicitacaoVeiculo = new VisaoModeloSolicitacaoVeiculo();
    const vaiParaFormularioSolicitacaoVeiculo = () => { navegacao("/FormularioSolicitacaoVeiculo") };
    const IconeAdicionar = IoAddCircleOutline as unknown as React.FC<{ size?: number, className?: string; }>;

    const [solicitacaoVeiculo, setSolicitacaoVeiculo] = useState<IControleVeiculoTabela[]>([])
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");

    const buscarSolicitacaoVeiculo = async (inicio?: string, fim?: string) => {
        if (!tokenJWT) return;
        try {
            const informacoesSolicitacoesVeiculo = await objVisaoModeloSolicitacaoVeiculo.listarTodosVeiculos(tokenJWT, inicio, fim);
            if (informacoesSolicitacoesVeiculo && Array.isArray(informacoesSolicitacoesVeiculo)) {
                const informacoesFormatadas = informacoesSolicitacoesVeiculo.map(item => ({
                    ...item,
                    data_solicitacao: item.data_solicitacao ? formatarDataISO(item.data_solicitacao) : "",
                    data_chegada: item.data_chegada ? formatarDataISO(item.data_chegada) : "",
                    horario_saida: item.horario_saida ? extrairHoraISO(item.horario_saida) : "",
                    horario_chegada: item.horario_chegada ? extrairHoraISO(item.horario_chegada) : "",
                    km_inicial_veiculo: item.km_inicial_veiculo ?? 0
                }));
                setSolicitacaoVeiculo(informacoesFormatadas);
            } else {
                setSolicitacaoVeiculo([]);
            }
        } catch (error) {
            console.error("Erro ao buscar veiculos cadastrados:", error);
        }
    };

    const gerarPDF = () => {
        const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
        const pageWidth = doc.internal.pageSize.getWidth();

        const titulo = "Relatório de Controle de Veículos";
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

            const colunas = ["ID", "Placa", "Data Solicitação",
                "Hora Saída", "Km Inicial", "Data Chegada",
                "Hora Chegada", "Km Final", "Solicitante",
                "Responsável", "Localização", "Porteiro Saída",
                "Porteiro Entrada"
            ];

            const linhas = solicitacaoVeiculo.map(d => [
                d.id,
                d.placa,
                d.data_solicitacao ? new Date(d.data_solicitacao).toLocaleDateString("pt-BR") : "",
                d.horario_saida,
                d.km_inicial_veiculo,
                d.data_chegada ? new Date(d.data_chegada).toLocaleDateString("pt-BR") : "",
                d.horario_chegada,
                d.km_final_veiculo || "",
                d.nome_responsavel,
                d.nome_responsavel_autorizacao,
                d.localizacao,
                d.nome_porteiro_saida,
                d.nome_porteiro_entrada
            ]);

            autoTable(doc, {
                head: [colunas],
                body: linhas,
                startY: 30,
                styles: { fontSize: 10 },
                headStyles: { fillColor: [0, 123, 255], textColor: 255 }
            });

            doc.save("RelatorioControleVeiculos.pdf");
        };
    };

    const limparFiltro = async () => {
        setDataInicio("");
        setDataFim("");
        await buscarSolicitacaoVeiculo();
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
        IconeAdicionar,
        colunasTabela, 
        toast, 
        dataInicio,
        dataFim,
        setToast,
        abrirConfirmacaoExclusao,
        deletarSolicitacaoVeiculo,
        selecionarSolicitacaoVeiculo,
        vaiParaFormularioSolicitacaoVeiculo,
        limparFiltro,
        setDataFim,
        setDataInicio,
        buscarSolicitacaoVeiculo,
        gerarPDF
    }
}