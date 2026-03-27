export interface IVeiculo {
    placa: string;
    total_utilizacoes: number;
}

export interface IRelatorioMensal {
    ano: number;
    mes: string;
    veiculos: IVeiculo[];
}

export type IRelatorioMensalResponse = IRelatorioMensal[];