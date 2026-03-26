import { ModeloVeiculo } from "./modeloVeiculo";
import { IVeiculo, VeiculoUpdate } from "../../interfaces/IVeiculo";

export class VisaoModeloVeiculo {
    private modeloVeiculo: ModeloVeiculo;

    constructor() { this.modeloVeiculo = new ModeloVeiculo() }

    async deletarVeiculo(tokenJWT: string, id: number): Promise<IVeiculo | null> {
        return await this.modeloVeiculo.deletarVeiculo(tokenJWT, id);
    }

    async listarTodosVeiculos(tokenJWT: string, placa?: string): Promise<IVeiculo[] | null> {
        return await this.modeloVeiculo.listarTodosVeiculos(tokenJWT, placa);
    }

    async listarVeiculosPorID(tokenJWT: string, id: number): Promise<IVeiculo | null> {
        return await this.modeloVeiculo.listarVeiculoPorID(tokenJWT, id);
    }

    async cadastrarVeiculo(tokenJWT: string, dadosFormulario: IVeiculo): Promise<IVeiculo | null> {
        return await this.modeloVeiculo.cadastrarVeiculo(tokenJWT, dadosFormulario);
    }

    async editarVeiculo(tokenJWT: string, dadosFormulario: VeiculoUpdate, id: number): Promise<VeiculoUpdate | null> {
        return await this.modeloVeiculo.editarVeiculo(tokenJWT, dadosFormulario, id);
    }
}