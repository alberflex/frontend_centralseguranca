import { useEffect, useState } from "react";
import { useAutenticacao } from "../../../contextos/useAutenticacao";
import { VisaoModeloPonto } from "../../../modelo/ponto/visaoModeloPonto";
import { ITotalizadorDashboard } from "../../../interfaces/IDashboard";
import { VisaoModeloSolicitacaoVeiculo } from "../../../modelo/solicitacaoVeiculo/visaoModeloSolicitacaoVeiculo";
import { VisaoModeloSolicitacaoAcesso } from "../../../modelo/solicitacaoAcesso/visaoModeloSolicitacaoAcesso";
import { VisaoModeloVeiculo } from "../../../modelo/veiculo/visaoModeloVeiculo";
import { VisaoModeloVisitante } from "../../../modelo/visitante/visaoModeloVisitante";

export const useVisaoControllerIntroducao = () => {
    const { tokenJWT } = useAutenticacao();
    const objVisaoModeloPonto = new VisaoModeloPonto();
    const objVisaoModeloSolicitacaoVeiculo = new VisaoModeloSolicitacaoVeiculo();
    const objVisaoModeloAcesso = new VisaoModeloSolicitacaoAcesso();
    const objVisaoModeloVeiculo = new VisaoModeloVeiculo();
    const objVisaoModeloVisitante = new VisaoModeloVisitante();

    const [pontosAbertos, setPontosAbertos] = useState<number | null>(null);
    const [veiculosAbertos, setVeiculosAbertos] = useState<number | null>(null);
    const [acessosAbertos, setAcessosAbertos] = useState<number | null>(null);
    const [labelsVeiculos, setLabelsVeiculos] = useState<string[]>([]);
    const [valoresVeiculos, setValoresVeiculos] = useState<number[]>([]);

    const [labelsVisitantes, setLabelsVisitantes] = useState<string[]>([]);
    const [valoresVisitantes, setValoresVisitantes] = useState<number[]>([]);

    const verificaDashboard = async (): Promise<void> => {
        if (!tokenJWT) return;
        try {
            const resultadoPontos: ITotalizadorDashboard = await objVisaoModeloPonto.contarPontosAberto(tokenJWT);
            const resultadoVeiculos: ITotalizadorDashboard = await objVisaoModeloSolicitacaoVeiculo.contarSolicitacaoVeiculoAberto(tokenJWT);
            const resultadoAcesso: ITotalizadorDashboard = await objVisaoModeloAcesso.contarSolicitacaoAcessoAberto(tokenJWT);

            const resultadoVeiculosPorMes = await objVisaoModeloVeiculo.solicitacoesVeiculos(tokenJWT);
            const resultadoVisitantesPorMes = await objVisaoModeloVisitante.visitantesMaisPresentes(tokenJWT);

            setPontosAbertos(resultadoPontos.total);
            setVeiculosAbertos(resultadoVeiculos.total);
            setAcessosAbertos(resultadoAcesso.total);

            if ((resultadoVeiculosPorMes && resultadoVeiculosPorMes.length > 0) && (resultadoVisitantesPorMes && resultadoVisitantesPorMes.length > 0)) {
                const veiculos = resultadoVeiculosPorMes[0].veiculos;
                const visitantes = resultadoVisitantesPorMes[0].pessoas;

                const labels = veiculos.map(v => v.placa);
                const valores = veiculos.map(v => v.total_utilizacoes);

                const labelsVisitantes = visitantes.map(v => v.nome);
                const valoresVisitantes = visitantes.map(v => v.total_visitantes);


                setLabelsVeiculos(labels);
                setValoresVeiculos(valores);

                setLabelsVisitantes(labelsVisitantes);
                setValoresVisitantes(valoresVisitantes);
            }

        } catch (erro) {
            console.error("Erro ao buscar pontos abertos:", erro);
            setPontosAbertos(0);
            setVeiculosAbertos(0);
            setAcessosAbertos(0);
        }
    };

    useEffect(() => { if (tokenJWT) verificaDashboard(); }, [tokenJWT]);

    return {
        pontosAbertos,
        veiculosAbertos,
        acessosAbertos,
        labelsVeiculos,
        valoresVeiculos,
        labelsVisitantes,
        valoresVisitantes
    };
};