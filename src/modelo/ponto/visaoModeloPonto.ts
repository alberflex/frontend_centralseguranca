import { ITotalizadorDashboard } from "../../interfaces/IDashboard";
import { IPonto, IPontoTabela } from "../../interfaces/IPonto";
import { ModeloPonto } from "./modeloPonto";

export class VisaoModeloPonto {
    private modeloPonto: ModeloPonto;

    constructor() { this.modeloPonto = new ModeloPonto() }

    async deletarPonto(tokenJWT: string, id: number): Promise<IPonto | null> {
        return await this.modeloPonto.deletarControlePonto(tokenJWT, id);
    }

    async listarTodosPontos(tokenJWT: string, inicio?: string, fim?: string): Promise<IPontoTabela[]> {
        return await this.modeloPonto.listarTodosControlesPontos(tokenJWT, inicio, fim);
    }

    async listarPontoPorID(tokenJWT: string, id: number): Promise<IPonto | null> {
        return await this.modeloPonto.listarControlesPontosPorID(tokenJWT, id);
    }

    async cadastrarPonto(tokenJWT: string, dadosFormulario: string): Promise<IPonto | null> {
        return await this.modeloPonto.cadastrarPonto(tokenJWT, dadosFormulario);
    }

    async fecharPonto(tokenJWT: string, id: number): Promise<IPonto | null> {
        return await this.modeloPonto.fecharPonto(tokenJWT, id);
    }

    async contarPontosAberto(tokenJWT: string): Promise<ITotalizadorDashboard> {
        return await this.modeloPonto.contarPontosAbertos(tokenJWT);
    }
}