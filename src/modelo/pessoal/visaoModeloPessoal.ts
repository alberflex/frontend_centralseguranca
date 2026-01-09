import { IPessoal } from "../../interfaces/IPessoal";
import { ModeloPessoal } from "./modeloPessoal";

export class VisaoModeloPessoal {
    private modeloPessoal: ModeloPessoal;

    constructor() { this.modeloPessoal = new ModeloPessoal() }

    async listarPessoal(tokenJWT: string, nome?: string): Promise<IPessoal | null> {
        return this.modeloPessoal.listarPessoal(tokenJWT, nome);
    }
}