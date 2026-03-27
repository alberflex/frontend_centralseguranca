import { useNavigate } from "react-router-dom";
import { useAutenticacao } from "../../../contextos/useAutenticacao";
import { VisaoModeloVeiculo } from "../../../modelo/veiculo/visaoModeloVeiculo";
import { useEffect, useState } from "react";
import { IVeiculo } from "../../../interfaces/IVeiculo";
import { ILayoutTabela } from "../../../componentes/tabelas/tabela";
import { IoAddCircleOutline } from "react-icons/io5";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

export const useVisaoControllerGerenciarVeiculo = () => {
    const [veiculo, setVeiculo] = useState<IVeiculo[]>([]);
    const [placa, setPlaca] = useState<string>();
    const navegacao = useNavigate();
    const vaiParaFormularioVeiculo = () => { navegacao("/FormularioVeiculo") }
    const objVisaoModeloVeiculo = new VisaoModeloVeiculo();
    const { tokenJWT, informacoesUsuario } = useAutenticacao();
    const colunasTabela: ILayoutTabela<IVeiculo>[] = [{ key: 'id', label: 'ID' }, { key: 'placa', label: 'Placa' }, { key: 'modelo', label: 'Modelo' }, { key: 'km_atual', label: 'KM Atual' }];
    const IconeAdicionar = IoAddCircleOutline as unknown as React.FC<{ size?: number, className?: string; }>;

    const buscarVeiculos = async (placa?: string) => {
        if (!tokenJWT) return;
        try {
            const informacoesVeiculo = await objVisaoModeloVeiculo.listarTodosVeiculos(tokenJWT, placa);
            if (informacoesVeiculo && Array.isArray(informacoesVeiculo)) {
                setVeiculo(informacoesVeiculo);
            } else {
                setVeiculo([]);
            }
        } catch (error) {
            console.error("Erro ao buscar veiculos cadastrados:", error);
        }
    };

    const limparFiltro = async () => {
        setPlaca("");
        await buscarVeiculos();
    };

    const gerarPDF = () => {
        const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
        const pageWidth = doc.internal.pageSize.getWidth();

        const titulo = "Relatório de frota";
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

            const colunas = ["ID", "Placa", "Modelo", "KM Atual",];

            const linhas = veiculo.map(d => [
                d.id,
                d.placa,
                d.modelo,
                d.km_atual,
            ]);

            autoTable(doc, {
                head: [colunas],
                body: linhas,
                startY: 30,
                styles: { fontSize: 10 },
                headStyles: { fillColor: [0, 123, 255], textColor: 255 }
            });

            doc.save("RelatorioFrota.pdf");
        };
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
        abrirConfirmacaoExclusao,
        IconeAdicionar,
        informacoesUsuario,
        buscarVeiculos,
        gerarPDF,
        limparFiltro,
        placa, setPlaca
    }
}