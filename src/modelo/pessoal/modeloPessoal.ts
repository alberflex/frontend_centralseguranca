import { IPessoal } from "../../interfaces/IPessoal";
import { conexaoAPI } from "../../servicos/API";

export class ModeloPessoal {
    async listarPessoal(tokenJWT: string, nome?: string): Promise<IPessoal | null> {
        try {
            const controlePontosListadosJSON = await conexaoAPI.get<IPessoal>(`/pessoal/listarPessoal`, {
                headers: { Authorization: `Bearer ${tokenJWT}` },
                params: { nome }
            });
            return controlePontosListadosJSON.data;
        } catch (error) {
            throw error;
        }
    }
}