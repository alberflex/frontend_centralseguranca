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


export interface IVisitantes {
    nome: string;
    total_visitantes: number;
}

export interface IRelatorioMensalVisitante {
    ano: number;
    mes: string;
    pessoas: IVisitantes[];
}

export type IRelatorioMensalResponseVisitantes = IRelatorioMensalVisitante[];


export interface ITrajeto {
    localizacao: string;
    rotas: number;
}

export interface IRelatorioPorMes {
    ano: number;
    mes: string;
    trajetos: ITrajeto[];
}