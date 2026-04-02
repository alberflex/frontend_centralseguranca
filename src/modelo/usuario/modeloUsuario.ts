import { IUsuario } from "../../interfaces/IPorteiro";
import { conexaoAPI } from "../../servicos/API";

export class ModeloUsuario {
    async listarTodosUsuario(tokenJWT: string): Promise<IUsuario | null> {
        try {
            const listarUsuariosJSON = await conexaoAPI.get<IUsuario>(`/usuario/listarTodosUsuarios`, {
                headers: { Authorization: `Bearer ${tokenJWT}` },
            });
            return listarUsuariosJSON.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.erro );
        }
    }
}