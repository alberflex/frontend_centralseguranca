export interface IPonto {
    id: number;
    chapa: string;
    idPorteiroEntrada: number;
    horarioEntrada: string;
    horarioSaida: string;
    data: Date;
}

export interface IPontoTabela {
    id: number;
    nome_colaborador: string;
    nome_porteiro: string;
    horarioEntrada: string;
    horarioSaida: string;
    data: Date;
}
