import { ModeloVeiculo } from "./modeloVeiculo";
import { IVeiculo } from "../../interfaces/IVeiculo";

export class VisaoModeloVeiculo {
    private modeloVeiculo: ModeloVeiculo;

    constructor() { this.modeloVeiculo = new ModeloVeiculo() }

    async deletarVeiculo(tokenJWT: string, id: number): Promise<IVeiculo | null> {
        return await this.modeloVeiculo.deletarVeiculo(tokenJWT, id);
    }

    async listarTodosVeiculos(tokenJWT: string): Promise<IVeiculo | null> {
        return await this.modeloVeiculo.listarTodosVeiculos(tokenJWT);
    }

    async listarVeiculosPorID(tokenJWT: string, id: number): Promise<IVeiculo | null> {
        return await this.modeloVeiculo.listarVeiculoPorID(tokenJWT, id);
    }

    async cadastrarVeiculo(tokenJWT: string, dadosFormulario: IVeiculo): Promise<IVeiculo | null> {
        return await this.modeloVeiculo.cadastrarVeiculo(tokenJWT, dadosFormulario);
    }
}