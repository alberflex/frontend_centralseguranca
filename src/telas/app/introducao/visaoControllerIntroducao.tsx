import { useEffect, useState } from "react";
import { useAutenticacao } from "../../../contextos/useAutenticacao";
import { VisaoModeloPonto } from "../../../modelo/ponto/visaoModeloPonto";
import { ITotalizadorDashboard } from "../../../interfaces/IDashboard";
import { VisaoModeloSolicitacaoVeiculo } from "../../../modelo/solicitacaoVeiculo/visaoModeloSolicitacaoVeiculo";
import { VisaoModeloSolicitacaoAcesso } from "../../../modelo/solicitacaoAcesso/visaoModeloSolicitacaoAcesso";
import { IRelatorioMensal } from "../../../interfaces/IRelatorioVeiculo";
import { VisaoModeloVeiculo } from "../../../modelo/veiculo/visaoModeloVeiculo";

export const useVisaoControllerIntroducao = () => {
    const { tokenJWT } = useAutenticacao();
    const objVisaoModeloPonto = new VisaoModeloPonto();
    const objVisaoModeloSolicitacaoVeiculo = new VisaoModeloSolicitacaoVeiculo();
    const objVisaoModeloAcesso = new VisaoModeloSolicitacaoAcesso();
    const objVisaoModeloVeiculo = new VisaoModeloVeiculo();


    const [pontosAbertos, setPontosAbertos] = useState<number | null>(null);
    const [veiculosAbertos, setVeiculosAbertos] = useState<number | null>(null);
    const [acessosAbertos, setAcessosAbertos] = useState<number | null>(null);
    const [labelsVeiculos, setLabelsVeiculos] = useState<string[]>([]);
    const [valoresVeiculos, setValoresVeiculos] = useState<number[]>([]);

    const verificaDashboard = async (): Promise<void> => {
        if (!tokenJWT) return;
        try {
            const resultadoPontos: ITotalizadorDashboard = await objVisaoModeloPonto.contarPontosAberto(tokenJWT);
            const resultadoVeiculos: ITotalizadorDashboard = await objVisaoModeloSolicitacaoVeiculo.contarSolicitacaoVeiculoAberto(tokenJWT);
            const resultadoAcesso: ITotalizadorDashboard = await objVisaoModeloAcesso.contarSolicitacaoAcessoAberto(tokenJWT);

            const resultadoVeiculosPorMes = await objVisaoModeloVeiculo.solicitacoesVeiculos(tokenJWT);

            setPontosAbertos(resultadoPontos.total);
            setVeiculosAbertos(resultadoVeiculos.total);
            setAcessosAbertos(resultadoAcesso.total);

            if (resultadoVeiculosPorMes && resultadoVeiculosPorMes.length > 0) {
                const veiculos = resultadoVeiculosPorMes[0].veiculos;

                const labels = veiculos.map(v => v.placa);
                const valores = veiculos.map(v => v.total_utilizacoes);

                setLabelsVeiculos(labels);
                setValoresVeiculos(valores);
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
        valoresVeiculos
    };
};