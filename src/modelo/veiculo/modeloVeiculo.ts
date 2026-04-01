import { IRelatorioMensal } from "../../interfaces/IRelatorioVeiculo";
import { IVeiculo, VeiculoUpdate } from "../../interfaces/IVeiculo";
import { conexaoAPI } from "../../servicos/API";

export class ModeloVeiculo {

    async solicitacoesVeiculos(tokenJWT: string): Promise<IRelatorioMensal[] | null> {
        try {
            const informacoesVeiculo = await conexaoAPI.get<IRelatorioMensal[]>(`/veiculo/dashboardVeiculo`, {
                headers: { Authorization: `Bearer ${tokenJWT}` },
            });

            return informacoesVeiculo.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.erro);
        }
    }

    async deletarVeiculo(tokenJWT: string, id: number): Promise<IVeiculo | null> {
        try {
            const veiculoDeletadoJSON = await conexaoAPI.delete<IVeiculo>(`/veiculo/deletarVeiculo/${id}`, {
                headers: { Authorization: `Bearer ${tokenJWT}` },
            });
            return veiculoDeletadoJSON.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.erro);
        }
    }

    async listarTodosVeiculos(tokenJWT: string, placa?: string): Promise<IVeiculo[] | null> {
        try {
            let url = "/veiculo/listarTodosVeiculos";

            if (placa) {
                url += `?placa=${placa}`;
            }

            const veiculosListadosJSON = await conexaoAPI.get<IVeiculo[]>(url, {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            });
            return veiculosListadosJSON.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.erro);
        }
    }

    async listarVeiculoPorID(tokenJWT: string, id: number): Promise<IVeiculo | null> {
        try {
            const veiculoListadoPorID = await conexaoAPI.get<IVeiculo>(`/veiculo/listarVeiculoPorId/${id}`, {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            });
            return veiculoListadoPorID.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.erro);
        }
    }

    async cadastrarVeiculo(tokenJWT: string, dadosFormulario: IVeiculo): Promise<IVeiculo | null> {
        try {
            const formData = new FormData();
            formData.append("placa", dadosFormulario.placa);
            formData.append("modelo", dadosFormulario.modelo);
            formData.append("km_atual", String(dadosFormulario.km_atual));

            if (dadosFormulario.caminho_imagem_veiculo instanceof FileList) {
                formData.append("caminho_imagem_veiculo", dadosFormulario.caminho_imagem_veiculo);
            }

            const cadastroVeiculoJSON = await conexaoAPI.post<IVeiculo>(`/veiculo/cadastroVeiculo`, dadosFormulario, {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            });
            return cadastroVeiculoJSON.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.erro);
        }
    }

    async editarVeiculo(tokenJWT: string, dadosFormulario: VeiculoUpdate, id: number): Promise<IVeiculo | null> {
        try {
            const formData = new FormData();
            formData.append("modelo", String(dadosFormulario.modelo));
            formData.append("km_atual", String(dadosFormulario.km_atual));

            if (dadosFormulario.caminho_imagem_veiculo instanceof File) formData.append("caminho_imagem_veiculo", dadosFormulario.caminho_imagem_veiculo);

            const response = await conexaoAPI.put<IVeiculo>(`/veiculo/editarVeiculo/${id}`, formData,
                { headers: { Authorization: `Bearer ${tokenJWT}`, "Content-Type": "multipart/form-data" }, }
            );

            return response.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.erro);
        }
    }
}