import { useAutenticacao } from "../../../contextos/useAutenticacao";
import { VisaoModeloPonto } from "../../../modelo/ponto/visaoModeloPonto"
import { VisaoModeloSolicitacaoAcesso } from "../../../modelo/solicitacaoAcesso/visaoModeloSolicitacaoAcesso";
import { VisaoModeloSolicitacaoVeiculo } from "../../../modelo/solicitacaoVeiculo/visaoModeloSolicitacaoVeiculo";

export const useVisaoControllerIntroducao = () => {
    const { tokenJWT } = useAutenticacao();
    const objVisaoModeloPonto = new VisaoModeloPonto();
    const objVisaoModeloSolicitacaoAcesso = new VisaoModeloSolicitacaoAcesso();
    const objVisaoModeloSolicitacaoVeiculo = new VisaoModeloSolicitacaoVeiculo();

    const valoresAbertos = async (): Promise<(number | null)[] | null> => {
        if (!tokenJWT) return null;
        try {
            const valores = await Promise.all([
                objVisaoModeloPonto.contarPontosAberto(tokenJWT),
                objVisaoModeloSolicitacaoAcesso.contarSolicitacaoAcessoAberto(tokenJWT),
                objVisaoModeloSolicitacaoVeiculo.contarSolicitacaoVeiculoAberto(tokenJWT),
            ]);

            return valores;
        } catch (erro) {
            console.error("Erro ao buscar valores abertos:", erro);
            return null;
        }
    };


    return { valoresAbertos };

}