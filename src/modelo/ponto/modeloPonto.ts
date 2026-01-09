import { IPonto } from "../../interfaces/IPonto";
import { conexaoAPI } from "../../servicos/API";

export class ModeloPonto {
    async deletarControlePonto(tokenJWT: string, id: number): Promise<IPonto | null> {
        try {
            const controlePontoJSON = await conexaoAPI.delete<IPonto>(`/controlePonto/deletarPonto/${id}`, {
                headers: { Authorization: `Bearer ${tokenJWT}` },
            });
            return controlePontoJSON.data;
        } catch (error) {
            throw error;
        }
    }

    async listarTodosControlesPontos(tokenJWT: string): Promise<IPonto | null> {
        try {
            const controlePontosListadosJSON = await conexaoAPI.get<IPonto>(`/controlePonto/listarTodosPontos`, {
                headers: { Authorization: `Bearer ${tokenJWT}` },
            });
            return controlePontosListadosJSON.data;
        } catch (error) {
            throw error;
        }
    }

    async listarControlesPontosPorID(tokenJWT: string, id: number): Promise<IPonto | null> {
        try {
            const controlePontosListadosPorIDJSON = await conexaoAPI.get<IPonto>(`/controlePonto/listarPontoPorID/${id}`, {
                headers: { Authorization: `Bearer ${tokenJWT}` },
            });
            return controlePontosListadosPorIDJSON.data;
        } catch (error) {
            throw error;
        }
    }

    async cadastrarPonto(tokenJWT: string, dadosFormulario: string): Promise<IPonto | null> {
        try {
            const cadastroPontoJSON = await conexaoAPI.post<IPonto>(`/controlePonto/cadastroPonto`, dadosFormulario, {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            });
            return cadastroPontoJSON.data;
        } catch (error) {
            throw error;
        }
    }

     async fecharPonto(tokenJWT: string, id: number): Promise<IPonto | null> {
        try {
            const pontoFechadoJSON = await conexaoAPI.put<IPonto>(
                `/controlePonto/fecharPonto/${id}`,
                {}, 
                {
                    headers: { Authorization: `Bearer ${tokenJWT}` },
                }
            );
            return pontoFechadoJSON.data;
        } catch (error) {
            throw error;
        }
    }

    async contarPontosAbertos(tokenJWT: string): Promise<number | null> {
        try {
            const pontoFechadoJSON = await conexaoAPI.put<number>(`controlePonto/contarSolicitacoesEmAberto`, {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            });
            return pontoFechadoJSON.data;
        } catch (error) {
            throw error;
        }
    }
}