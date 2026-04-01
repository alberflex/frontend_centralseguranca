import { IControleVeiculo, IControleVeiculoCadastro, IFecharSolicitacaoVeiculo } from "../../interfaces/IControleVeiculo";
import { conexaoAPI } from "../../servicos/API";
import { IUsuario } from "../../interfaces/IControleVeiculo";
import { ITotalizadorDashboard } from "../../interfaces/IDashboard";
import { IRelatorioPorMes } from "../../interfaces/IRelatorioVeiculo";

export class ModeloSolicitacaoVeiculo {
    async deletarSolicitacaoVeiculo(tokenJWT: string, id: number): Promise<IControleVeiculo | null> {
        try {
            const solicitacaoVeiculoJSON = await conexaoAPI.delete<IControleVeiculo>(`controleVeiculo/deletarControleVeiculo/${id}`, {
                headers: { Authorization: `Bearer ${tokenJWT}` },
            });
            return solicitacaoVeiculoJSON.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.erro);
        }
    }

    async listarRotasMaisAcessadas(tokenJWT: string): Promise<IRelatorioPorMes[]> {
        try {
            const listagemRotasMaisAcessadas = await conexaoAPI.get<IRelatorioPorMes[]>(`controleVeiculo/localizacoesMaisCadastradas`, {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            });
            return listagemRotasMaisAcessadas.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.erro);
        }
    }

    async listarTodasSolicitacaoVeiculos(tokenJWT: string, inicio?: string, fim?: string): Promise<IControleVeiculo | null> {
        try {
            let url = "/controleVeiculo/listarTodosVeiculos";

            if (inicio && fim) {
                url += `?dataInicio=${inicio}&dataFim=${fim}`;
            }

            const solicitacaoVeiculoJSON = await conexaoAPI.get<IControleVeiculo>(url, {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            });
            return solicitacaoVeiculoJSON.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.erro);
        }
    }

    async listarSolicitacaoVeiculoPorID(tokenJWT: string, id: number): Promise<IControleVeiculo | null> {
        try {
            const solicitacaoVeiculoPorIDJSON = await conexaoAPI.get<IControleVeiculo>(`/controleVeiculo/listarVeiculoPorId/${id}`, {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            });
            return solicitacaoVeiculoPorIDJSON.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.erro);
        }
    }

    async cadastrarVeiculo(tokenJWT: string, dadosFormulario: IControleVeiculo): Promise<IControleVeiculo | null> {
        try {
            const cadastroSolicitacaoJSON = await conexaoAPI.post<IControleVeiculo>(`/controleVeiculo/cadastroControleVeiculo`, dadosFormulario, {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            });
            return cadastroSolicitacaoJSON.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.erro);
        }
    }

    async editarSolicitacaoVeiculo(tokenJWT: string, dadosFormulario: IControleVeiculo, id: number): Promise<IControleVeiculo | null> {

        try {
            const edicaoSolicitacaoJSON = await conexaoAPI.put<IControleVeiculo>(`/controleVeiculo/editarSolicitacao/${id}`, dadosFormulario, {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            });
            return edicaoSolicitacaoJSON.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.erro);
        }
    }

    async contarSolicitacaoVeiculosAberto(tokenJWT: string): Promise<ITotalizadorDashboard> {
        try {
            const solicitacaoVeiculosAbertoJSON = await conexaoAPI.get<ITotalizadorDashboard>(`controleVeiculo/contarSolicitacoesVeiculosEmAberto`, {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            });
            return solicitacaoVeiculosAbertoJSON.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.erro);
        }
    }

    async listarPessoal(tokenJWT: string, termo?: string): Promise<IUsuario[] | null> {
        try {
            const listarPessoalJSON = await conexaoAPI.get<IUsuario[]>(
                `controleVeiculo/listarPessoal`,
                {
                    headers: { Authorization: `Bearer ${tokenJWT}` },
                    params: { termo }
                }
            );
            return listarPessoalJSON.data;
        } catch (error) {
            console.error("Erro ao listar pessoal:", error);
            return null;
        }
    }
}