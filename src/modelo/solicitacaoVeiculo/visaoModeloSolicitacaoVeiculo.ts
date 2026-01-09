import { ModeloSolicitacaoVeiculo } from "./modeloSolicitacaoVeiculo";
import { IControleVeiculo, IControleVeiculoCadastro, IFecharSolicitacaoVeiculo, IUsuario } from "../../interfaces/IControleVeiculo";

export class VisaoModeloSolicitacaoVeiculo {
    private modeloSolicitacaoVeiculo: ModeloSolicitacaoVeiculo;

    constructor() { this.modeloSolicitacaoVeiculo = new ModeloSolicitacaoVeiculo() }

    async deletarVeiculo(tokenJWT: string, id: number): Promise<IControleVeiculo | null> {
        return await this.modeloSolicitacaoVeiculo.deletarSolicitacaoVeiculo(tokenJWT, id);
    }

    async listarTodosVeiculos(tokenJWT: string): Promise<IControleVeiculo | null> {
        return await this.modeloSolicitacaoVeiculo.listarTodasSolicitacaoVeiculos(tokenJWT);
    }

    async listarVeiculosPorID(tokenJWT: string, id: number): Promise<IControleVeiculo | null> {
        return await this.modeloSolicitacaoVeiculo.listarSolicitacaoVeiculoPorID(tokenJWT, id);
    }

    async cadastrarVeiculo(tokenJWT: string, dadosFormulario: IControleVeiculoCadastro): Promise<IControleVeiculo | null> {
        return await this.modeloSolicitacaoVeiculo.cadastrarVeiculo(tokenJWT, dadosFormulario);
    }

    async contarSolicitacaoVeiculoAberto(tokenJWT: string): Promise<number | null> {
        return await this.modeloSolicitacaoVeiculo.contarSolicitacaoVeiculosAberto(tokenJWT);
    }

    async listarPessoal(tokenJWT: string, termo?: string): Promise<IUsuario[] | null> {
        return await this.modeloSolicitacaoVeiculo.listarPessoal(tokenJWT, termo);
    }

    async editarSolicitacaoVeiculo(tokenJWT: string, dadosFormulario: IControleVeiculo, id:number): Promise<IControleVeiculo | null> {
        return await this.modeloSolicitacaoVeiculo.editarSolicitacaoVeiculo(tokenJWT, dadosFormulario, id);
    }
}