export interface IControleAcesso {
    id: number;
    idVisitante: number;
    idPorteiroEntrada: number;
    idPorteiroSaida: number;
    responsavel: string;
    data_entrada: Date;
    hora_entrada: Date;
    data_saida: Date;
    hora_saida: Date;
    objetivo: string;
    placaVeiculo: string;
    numeroCartao: string;
}

export interface IControleAcessoTabela {
    id: number;
    nomeVisitante: string;
    nomePorteiroEntrada: string;
    nomePorteiroSaida: string;
    data_entrada: string;
    hora_entrada: string;
    data_saida: string;
    hora_saida: string;
    objetivo: string;
    placaVeiculo: string;
    numeroCartao: string;
    responsavel: string;
}

export interface IControleAcessoCadastro {
    idVisitante: number;
    idPorteiroEntrada: number;
    objetivo: string;
    placaVeiculo: string;
    numeroCartao: string;
    responsavel: string;
}

export interface IFormularioAcesso {
    cpf: string;
    nome: string;
    empresa: string;
    caminho_foto_visitante: File | string;
    placa: string;
    motivo: string;
    empresaVisita: string;
    numeroCartao: string;
    horaEntrada: string;
    horaSaida: string;
    responsavel: string;
    porteiroEntrada: number;
    porteiroSaida: number;
}

export interface IEdicaoControleAcesso {
    id?: number;
    idPorteiroEntrada: number;
    idPorteiroSaida: number;
    responsavel: string;
    objetivo: string;
    placaVeiculo: string;
    numeroCartao: string;
    idVisitante: number;
}