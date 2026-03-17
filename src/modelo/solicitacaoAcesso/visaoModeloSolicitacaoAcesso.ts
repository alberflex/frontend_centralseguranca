import { ModeloSolicitacaoAcesso } from "./modeloSolicitacaoAcesso";
import { IControleAcesso, IControleAcessoCadastro, IEdicaoControleAcesso } from "../../interfaces/IControleAcesso";
import { ITotalizadorDashboard } from "../../interfaces/IDashboard";

export class VisaoModeloSolicitacaoAcesso {
    private modeloSolicitacaoAcesso: ModeloSolicitacaoAcesso;

    constructor() { this.modeloSolicitacaoAcesso = new ModeloSolicitacaoAcesso() }

    async deletarSolicitacaoAcesso(tokenJWT: string, id: number): Promise<IControleAcesso | null> {
        return await this.modeloSolicitacaoAcesso.deletarSolicitacaoAcesso(tokenJWT, id);
    }

    async listarTodasSolicitacoesAcesso(tokenJWT: string, inicio?: string, fim?: string): Promise<IControleAcesso | null> {
        return await this.modeloSolicitacaoAcesso.listarTodasSolicitacaoAcesso(tokenJWT, inicio, fim);
    }

    async listarSolicitacaoAcessoPorID(tokenJWT: string, id: number): Promise<IControleAcesso | null> {
        return await this.modeloSolicitacaoAcesso.listarSolicitacaoAcessoPorID(tokenJWT, id);
    }

    async cadastrarSolicitacaoAcesso(tokenJWT: string, dadosFormulario: IControleAcessoCadastro): Promise<IControleAcesso | null> {
        return await this.modeloSolicitacaoAcesso.cadastrarSolicitacaoAcesso(tokenJWT, dadosFormulario);
    }

    async editarSolicitacaoAcesso(tokenJWT: string, id: number, dados: IEdicaoControleAcesso): Promise<IEdicaoControleAcesso | null> {
        return await this.modeloSolicitacaoAcesso.editarSolicitacaoAcesso(tokenJWT, id, dados);
    }

    async contarSolicitacaoAcessoAberto(tokenJWT: string): Promise<ITotalizadorDashboard> {
        return await this.modeloSolicitacaoAcesso.contarSolicitacoesAcessoAberto(tokenJWT);
    }

    async descobreVisitanteID(tokenJWT: string, id: number): Promise<number | null> {
        return await this.modeloSolicitacaoAcesso.descobreVisitanteID(tokenJWT, id);
    }
}