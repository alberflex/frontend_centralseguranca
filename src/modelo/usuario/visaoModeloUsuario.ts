import { IUsuario } from "../../interfaces/IPorteiro";
import { ModeloUsuario } from "./modeloUsuario";

export class VisaoModeloUsuario {
    private modeloUsuario: ModeloUsuario;

    constructor() { this.modeloUsuario = new ModeloUsuario() }

    async listarTodosUsuariosPontos(tokenJWT: string): Promise<IUsuario | null> {
        return await this.modeloUsuario.listarTodosUsuario(tokenJWT);
    }
}