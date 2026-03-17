import { IControleAcesso, IControleAcessoCadastro, IEdicaoControleAcesso } from "../../interfaces/IControleAcesso";
import { ITotalizadorDashboard } from "../../interfaces/IDashboard";
import { conexaoAPI } from "../../servicos/API";

export class ModeloSolicitacaoAcesso {
    async deletarSolicitacaoAcesso(tokenJWT: string, id: number): Promise<IControleAcesso | null> {
        try {
            const solicitacaoAcessoDeletadoJSON = await conexaoAPI.delete<IControleAcesso>(`/controleAcesso/deletarControleAcesso/${id}`, {
                headers: { Authorization: `Bearer ${tokenJWT}` },
            });
            return solicitacaoAcessoDeletadoJSON.data;
        } catch (error) {
            throw error;
        }
    }

    async listarTodasSolicitacaoAcesso(tokenJWT: string, inicio?: string, fim?: string): Promise<IControleAcesso | null> {
        try {
            let url = "/controleAcesso/listarControleAcesso";

            if (inicio && fim) { url += `?dataInicio=${inicio}&dataFim=${fim}`; }

            const solicitacaoAcessosJSON = await conexaoAPI.get<IControleAcesso>(url, { headers: { Authorization: `Bearer ${tokenJWT}` } });

            return solicitacaoAcessosJSON.data;
        } catch (error) {
            throw error;
        }
    }

    async listarSolicitacaoAcessoPorID(tokenJWT: string, id: number): Promise<IControleAcesso | null> {
        try {
            const solicitacaoAcessoPorIDJSON = await conexaoAPI.get<IControleAcesso>(`/controleAcesso/listarControleAcessoPorId/${id}`, {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            });
            return solicitacaoAcessoPorIDJSON.data;
        } catch (error) {
            throw error;
        }
    }

    async editarSolicitacaoAcesso(tokenJWT: string, id: number, dados: IEdicaoControleAcesso): Promise<IEdicaoControleAcesso | null> {
        try {
            const response = await conexaoAPI.put<IEdicaoControleAcesso>(`/controleAcesso/editarControleAcesso/${id}`, dados, { headers: { Authorization: `Bearer ${tokenJWT}` } });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async cadastrarSolicitacaoAcesso(tokenJWT: string, dadosFormulario: IControleAcessoCadastro): Promise<IControleAcesso | null> {
        try {
            const cadastroSolicitacaoAcessoJSON = await conexaoAPI.post<IControleAcesso>(`/controleAcesso/cadastrarControleAcesso`, dadosFormulario, {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            });

            return cadastroSolicitacaoAcessoJSON.data;
        } catch (error) {
            throw error;
        }
    }

    async contarSolicitacoesAcessoAberto(tokenJWT: string): Promise<ITotalizadorDashboard> {
        try {
            const solicitacaoAcessoJSON = await conexaoAPI.get<ITotalizadorDashboard>(`controleAcesso/contarSolicitacoesAcessoEmAberto`, {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            });
            return solicitacaoAcessoJSON.data;
        } catch (error) {
            throw error;
        }
    }

    async descobreVisitanteID(tokenJWT: string, id: number): Promise<number | null> {
        const response = await conexaoAPI.get<{ idVisitante: number }>(
            `controleAcesso/descobreVisitanteID/${id}`,
            {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            }
        );

        return response.data?.idVisitante ?? null;
    }
}