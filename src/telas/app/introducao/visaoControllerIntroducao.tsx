import { useEffect, useState } from "react";
import { useAutenticacao } from "../../../contextos/useAutenticacao";
import { VisaoModeloPonto } from "../../../modelo/ponto/visaoModeloPonto";
import { ITotalizadorDashboard } from "../../../interfaces/IDashboard";
import { VisaoModeloSolicitacaoVeiculo } from "../../../modelo/solicitacaoVeiculo/visaoModeloSolicitacaoVeiculo";
import { VisaoModeloSolicitacaoAcesso } from "../../../modelo/solicitacaoAcesso/visaoModeloSolicitacaoAcesso";

export const useVisaoControllerIntroducao = () => {
    const { tokenJWT } = useAutenticacao();
    const objVisaoModeloPonto = new VisaoModeloPonto();
    const objVisaoModeloVeiculo = new VisaoModeloSolicitacaoVeiculo();
    const objVisaoModeloAcesso = new VisaoModeloSolicitacaoAcesso();

    const [pontosAbertos, setPontosAbertos] = useState<number | null>(null);
    const [veiculosAbertos, setVeiculosAbertos] = useState<number | null>(null);
    const [acessosAbertos, setAcessosAbertos] = useState<number | null>(null);

    const verificaDashboard = async (): Promise<void> => {
        if (!tokenJWT) return;
        try {
            const resultadoPontos: ITotalizadorDashboard = await objVisaoModeloPonto.contarPontosAberto(tokenJWT);
            const resultadoVeiculos: ITotalizadorDashboard = await objVisaoModeloVeiculo.contarSolicitacaoVeiculoAberto(tokenJWT);
            const resultadoAcesso: ITotalizadorDashboard = await objVisaoModeloAcesso.contarSolicitacaoAcessoAberto(tokenJWT);

            setPontosAbertos(resultadoPontos.total);
            setVeiculosAbertos(resultadoVeiculos.total);
            setAcessosAbertos(resultadoAcesso.total);
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
        acessosAbertos
    };
};