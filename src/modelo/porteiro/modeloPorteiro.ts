import { ICredenciaisLogin } from "../../interfaces/ICredenciais";
import { IPorteiro } from "../../interfaces/IPorteiro";
import { conexaoAPI } from "../../servicos/API";

export class ModeloPorteiro {
    async deletarPorteiro(tokenJWT: string, id: number): Promise<IPorteiro | null> {
        try {
            const porteiroDeletadoJSON = await conexaoAPI.delete<IPorteiro>(`/porteiro/deletarPorteiro/${id}`, {
                headers: { Authorization: `Bearer ${tokenJWT}` },
            });
            return porteiroDeletadoJSON.data;
        } catch (error) {
            throw error;
        }
    }

    async listarTodosPorteiros(tokenJWT: string): Promise<IPorteiro | null> {
        try {
            const porteirosListadosJSON = await conexaoAPI.get<IPorteiro>(`/porteiro/listarTodosPorteiros`, {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            });
            return porteirosListadosJSON.data;
        } catch (error) {
            throw error;
        }
    }

    async listarPorteiroPorID(tokenJWT: string, id: number): Promise<IPorteiro | null> {
        try {
            const porteiroPorIDJSON = await conexaoAPI.get<IPorteiro>(`/porteiro/listarPorteiroPorId/${id}`, {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            });
            return porteiroPorIDJSON.data;
        } catch (error) {
            throw error;
        }
    }

    async cadastrarPorteiro(tokenJWT: string, dadosFormulario: IPorteiro): Promise<IPorteiro | null> {
        try {
            const cadastroPorteiroJSON = await conexaoAPI.post<IPorteiro>(`/porteiro/cadastroPorteiro`, dadosFormulario, {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            });
            return cadastroPorteiroJSON.data;
        } catch (error) {
            throw error;
        }
    }

    async editarPorteiro(tokenJWT: string, id: number, senha: string, papel: string): Promise<IPorteiro | null> {
        const dadosFormulario = { senha: senha, papel: papel }
        try {
            const editarUsuarioJSON = await conexaoAPI.put<IPorteiro>(`/porteiro/editarPorteiro/${id}`, dadosFormulario, {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            });
            return editarUsuarioJSON.data;
        } catch (error) {
            return null;
        }
    }

    async buscarInformacoesPorteiroPorID(tokenJWT: string): Promise<IPorteiro | null> {
        try {
            const porteiroListadoPorID = await conexaoAPI.get<IPorteiro>(`/porteiro/buscarInformacoesAutenticacao`, {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            });
            return porteiroListadoPorID.data;
        } catch (error) {
            throw error;
        }
    }

    async realizaLogin(dadosFormularioLogin: ICredenciaisLogin): Promise<string | null> {
        try {
            const tokenJWT = await conexaoAPI.post<{ token: string }>("/porteiro/login", dadosFormularioLogin);
            return tokenJWT.data.token;
        } catch (error) {
            throw error;
        }
    }
}