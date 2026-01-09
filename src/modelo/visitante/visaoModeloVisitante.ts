import { ModeloVisitante } from "./modeloVisitante";
import { IVisitante } from "../../interfaces/IVisitante";

export class VisaoModeloVisitante {
    private modeloVisitante: ModeloVisitante;

    constructor() { this.modeloVisitante = new ModeloVisitante() }

    async deletarVisitante(tokenJWT: string, id: number): Promise<IVisitante | null> {
        return await this.modeloVisitante.deletarVisitante(tokenJWT, id);
    }

    async listarTodosVisitantes(tokenJWT: string): Promise<IVisitante | null> {
        return await this.modeloVisitante.listarTodosVisitantes(tokenJWT);
    }

    async listarVisitantePorID(tokenJWT: string, id: number): Promise<IVisitante | null> {
        return await this.modeloVisitante.listarVisitantePorID(tokenJWT, id);
    }

    async cadastrarVisitante(tokenJWT: string, dadosFormulario: IVisitante): Promise<IVisitante | null> {
        return await this.modeloVisitante.cadastrarVisitante(tokenJWT, dadosFormulario);
    }

    async selecionarPorCPF(tokenJWT: string, cpf: string): Promise<IVisitante | null> {
        return await this.modeloVisitante.selecionarPorCPF(tokenJWT, cpf);
    }

    async editarVisitante(tokenJWT: string, dadosFormulario: IVisitante, id: number): Promise<IVisitante | null> {
        return await this.modeloVisitante.editarVisitante(tokenJWT, dadosFormulario, id);
    }
}