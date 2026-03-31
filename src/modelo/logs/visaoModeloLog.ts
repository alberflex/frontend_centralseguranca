import {  ILogTabela } from "../../interfaces/ILog";
import { ModeloLog } from "./modeloLog";

export class VisaoModeloLog {
    private modeloLog: ModeloLog;

    constructor() { this.modeloLog = new ModeloLog() }

    async listarTodosLogs(tokenJWT: string, inicio?: string, fim?: string): Promise<ILogTabela | null> {
        return this.modeloLog.listarTodosLogs(tokenJWT, inicio, fim);
    }

    async listarLogPorID(tokenJWT: string, id: number): Promise<ILogTabela | null>{
        return this.modeloLog.listarLogPorID(tokenJWT, id);
    }
}