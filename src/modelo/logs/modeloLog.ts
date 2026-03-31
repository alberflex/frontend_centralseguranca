import { ILogTabela } from "../../interfaces/ILog";
import { conexaoAPI } from "../../servicos/API";

export class ModeloLog {
    async listarTodosLogs(tokenJWT: string, inicio?: string, fim?: string): Promise<ILogTabela | null> {
        try {
            let url = "/log/listarTodosLogs";
            if (inicio && fim) { url += `?dataInicio=${inicio}&dataFim=${fim}`; }

            const listagemLog = await conexaoAPI.get<ILogTabela>(url, { headers: { Authorization: `Bearer ${tokenJWT}` } });
            return listagemLog.data;
        } catch (error) {
            throw error;
        }
    }

    async listarLogPorID(tokenJWT: string, id: number): Promise<ILogTabela | null> {
        try {
            const listarLogPorID = await conexaoAPI.get<ILogTabela>(`/log/listarLogPorID/${id}`, {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            });
            return listarLogPorID.data;
        } catch (error) {
            throw error;
        }
    }
}