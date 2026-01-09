import { IUsuarioPonto } from "../../interfaces/IUsuarioPonto";
import { ModeloUsuarioPonto } from "./modeloUsuarioPonto";

export class VisaoModeloUsuarioPonto {
    private modeloUsuarioPonto: ModeloUsuarioPonto;

    constructor() { this.modeloUsuarioPonto = new ModeloUsuarioPonto() }

    async listarTodosUsuariosPontos(tokenJWT: string): Promise<IUsuarioPonto | null> {
        return await this.modeloUsuarioPonto.listarTodosUsuarioPontos(tokenJWT);
    }
}