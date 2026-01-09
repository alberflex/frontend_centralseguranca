import { IVisitante } from "../../interfaces/IVisitante";
import { conexaoAPI } from "../../servicos/API";

export class ModeloVisitante {
    async deletarVisitante(tokenJWT: string, id: number): Promise<IVisitante | null> {
        try {
            const visitanteDeletadoJSON = await conexaoAPI.delete<IVisitante>(`/visitante/deletarVisitante/${id}`, {
                headers: { Authorization: `Bearer ${tokenJWT}` },
            });
            return visitanteDeletadoJSON.data;
        } catch (error) {
            throw error;
        }
    }

    async listarTodosVisitantes(tokenJWT: string): Promise<IVisitante | null> {
        try {
            const visitanteListadosJSON = await conexaoAPI.get<IVisitante>(`/visitante/listarTodosVisitantes`, {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            });
            return visitanteListadosJSON.data;
        } catch (error) {
            throw error;
        }
    }

    async listarVisitantePorID(tokenJWT: string, id: number): Promise<IVisitante | null> {
        try {
            const visitanteListadoPorID = await conexaoAPI.get<IVisitante>(`/visitante/listarVisitantePorId/${id}`, {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            });
            return visitanteListadoPorID.data;
        } catch (error) {
            throw error;
        }
    }

    async selecionarPorCPF(tokenJWT: string, cpf: string): Promise<IVisitante | null> {
        try {
            const visitanteSelecionadoPorCPF = await conexaoAPI.get<IVisitante>(`/visitante/selecionaPorCPF/${cpf}`, {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            });
            return visitanteSelecionadoPorCPF.data;
        } catch (error) {
            throw error;
        }
    }

    async cadastrarVisitante(tokenJWT: string, dadosFormulario: IVisitante): Promise<IVisitante | null> {
        try {
            const formData = new FormData();
            formData.append("cpf", dadosFormulario.cpf);
            formData.append("nome", dadosFormulario.nome);
            formData.append("empresa", dadosFormulario.empresa);

            if (dadosFormulario.caminho_foto_visitante instanceof File) formData.append("caminho_foto_visitante", dadosFormulario.caminho_foto_visitante);
            if (dadosFormulario.caminho_imagem_assinatura instanceof File) formData.append("caminho_imagem_assinatura", dadosFormulario.caminho_imagem_assinatura);

            const cadastroVisitanteJSON = await conexaoAPI.post<IVisitante>(`/visitante/cadastroVisitante`, formData, { headers: { Authorization: `Bearer ${tokenJWT}`, "Content-Type": "multipart/form-data" } });
            return cadastroVisitanteJSON.data;
        } catch (error) {
            throw error;
        }
    }

    async editarVisitante(tokenJWT: string, dadosFormulario: IVisitante, id: number): Promise<IVisitante | null> {
        try {
            const formData = new FormData();
            formData.append("cpf", dadosFormulario.cpf);
            formData.append("nome", dadosFormulario.nome);
            formData.append("empresa", dadosFormulario.empresa);

            if (dadosFormulario.caminho_foto_visitante instanceof File) formData.append("caminho_foto_visitante", dadosFormulario.caminho_foto_visitante);
            if (dadosFormulario.caminho_imagem_assinatura instanceof File) formData.append("caminho_imagem_assinatura", dadosFormulario.caminho_imagem_assinatura);

            const cadastroVisitanteJSON = await conexaoAPI.put<IVisitante>(`/visitante/editarVisitante/${id}`, formData, { headers: { Authorization: `Bearer ${tokenJWT}`, "Content-Type": "multipart/form-data" } });
            return cadastroVisitanteJSON.data;
        } catch (error) {
            throw error;
        }
    }
}