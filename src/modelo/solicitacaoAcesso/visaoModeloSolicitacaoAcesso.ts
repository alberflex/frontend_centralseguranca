import { ModeloSolicitacaoAcesso } from "./modeloSolicitacaoAcesso";
import { IControleAcesso, IControleAcessoCadastro } from "../../interfaces/IControleAcesso";

export class VisaoModeloSolicitacaoAcesso {
    private modeloSolicitacaoAcesso: ModeloSolicitacaoAcesso;

    constructor() { this.modeloSolicitacaoAcesso = new ModeloSolicitacaoAcesso() }

    async deletarSolicitacaoAcesso(tokenJWT: string, id: number): Promise<IControleAcesso | null> {
        return await this.modeloSolicitacaoAcesso.deletarSolicitacaoAcesso(tokenJWT, id);
    }

    async listarTodasSolicitacoesAcesso(tokenJWT: string): Promise<IControleAcesso | null> {
        return await this.modeloSolicitacaoAcesso.listarTodasSolicitacaoAcesso(tokenJWT);
    }

    async listarSolicitacaoAcessoPorID(tokenJWT: string, id: number): Promise<IControleAcesso | null> {
        return await this.modeloSolicitacaoAcesso.listarSolicitacaoAcessoPorID(tokenJWT, id);
    }

    async fecharSolicitacaoAcesso(tokenJWT: string, id: number, idPorteiroSaida: number): Promise<IControleAcesso | null> {
        return await this.modeloSolicitacaoAcesso.fecharSolicitacaoAcesso(tokenJWT, id, idPorteiroSaida);
    }

    async cadastrarSolicitacaoAcesso(tokenJWT: string, dadosFormulario: IControleAcessoCadastro): Promise<IControleAcesso | null> {
        return await this.modeloSolicitacaoAcesso.cadastrarSolicitacaoAcesso(tokenJWT, dadosFormulario);
    }

    async contarSolicitacaoAcessoAberto(tokenJWT: string): Promise<number | null> {
        return await this.modeloSolicitacaoAcesso.contarSolicitacoesAcessoAberto(tokenJWT);
    }

    async descobreVisitanteID(tokenJWT: string, id: number): Promise<number | null> {
        return await this.modeloSolicitacaoAcesso.descobreVisitanteID(tokenJWT, id);
    }
}