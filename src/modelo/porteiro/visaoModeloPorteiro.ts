import { ICredenciaisLogin } from "../../interfaces/ICredenciais";
import { IPorteiro } from "../../interfaces/IPorteiro";
import { ModeloPorteiro } from "./modeloPorteiro";

export class VisaoModeloPorteiro {
    private modeloPorteiro: ModeloPorteiro;

    constructor() { this.modeloPorteiro = new ModeloPorteiro() }

    async deletarPorteiro(tokenJWT: string, id: number): Promise<IPorteiro | null> {
        return await this.modeloPorteiro.deletarPorteiro(tokenJWT, id);
    }

    async listarTodosPorteiros(tokenJWT: string): Promise<IPorteiro | null> {
        return this.modeloPorteiro.listarTodosPorteiros(tokenJWT);
    }

    async listarPorteirosPorID(tokenJWT: string, id: number): Promise<IPorteiro | null> {
        return await this.modeloPorteiro.listarPorteiroPorID(tokenJWT, id);
    }

    async cadastrarPorteiro(tokenJWT: string, dadosFormulario: IPorteiro): Promise<IPorteiro | null> {
        return await this.modeloPorteiro.cadastrarPorteiro(tokenJWT, dadosFormulario);
    }

    async realizarLogin(dadosCredenciais: ICredenciaisLogin): Promise<string | null> {
        return await this.modeloPorteiro.realizaLogin(dadosCredenciais);
    }

    async buscarInformacoesPorteiroPorID(tokenJWT: string): Promise<IPorteiro | null> {
        return await this.modeloPorteiro.buscarInformacoesPorteiroPorID(tokenJWT);
    }

    async editarPorteiro(tokenJWT: string, id: number, chapa: string, senha: string): Promise<IPorteiro | null> {
        return await this.modeloPorteiro.editarPorteiro(tokenJWT, id, chapa, senha);
    }
}