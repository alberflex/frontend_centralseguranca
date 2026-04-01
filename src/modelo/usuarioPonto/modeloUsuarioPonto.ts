import { IUsuarioPonto } from "../../interfaces/IUsuarioPonto";
import { conexaoAPI } from "../../servicos/API";

export class ModeloUsuarioPonto {
    async listarTodosUsuarioPontos(tokenJWT: string): Promise<IUsuarioPonto | null> {
        try {
            const controleUsuarioPonto = await conexaoAPI.get<IUsuarioPonto>(`/usuarioPonto/listarTodosUsuariosPontos`, {
                headers: { Authorization: `Bearer ${tokenJWT}` },
            });
            return controleUsuarioPonto.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.erro );
        }
    }
}