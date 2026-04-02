export interface IControleVeiculoCadastro {
    idVeiculo: number;
    destino: string;
    idPorteiroSaida: number;
    idResponsavel: string;
    localizacao: string;
    idResponsavelAutorizacao: string;
    placa: string;
}

export interface IControleVeiculo {
    id: number;
    idVeiculo: number;
    destino: string;
    data_solicitacao: Date;
    horario_saida: Date;
    km_inicial_veiculo: number;
    data_chegada: string;
    horario_chegada: string;
    km_final_veiculo: number;
    idPorteiroSaida: number;
    idResponsavel: string;
    idResponsavelEntrada: string;
    localizacao: string;
    idPorteiroEntrada: number;
    idResponsavelAutorizacao: string;
    condicao_entrada: string;
    condicao_saida: string;
}

export interface IControleVeiculoTabela {
    id: number;
    placa: string;
    destino: string;
    data_solicitacao: Date;
    horario_saida: string;
    km_inicial_veiculo: number;
    data_chegada: string;
    horario_chegada: string;
    km_final_veiculo: number;
    nome_porteiro_saida: string;
    nome_responsavel: string;
    nome_responsavel_entrada: string;
    localizacao: string;
    nome_porteiro_entrada: string;
    nome_responsavel_autorizacao: string;
    condicao_entrada: string;
    condicao_saida: string;
}

export interface IControleVeiculoTabelaView {
    id: number;
    placa: string;
    destino: string;
    data_solicitacao: string;
    horario_saida: string;
    km_inicial_veiculo: number;
    data_chegada: string;
    horario_chegada: string;
    km_final_veiculo: number;
    nome_porteiro_saida: string;
    nome_responsavel: string;
    localizacao: string;
    nome_porteiro_entrada: string;
    nome_responsavel_autorizacao: string;
    condicao_entrada: string;
    condicao_saida: string;
}

export interface IFecharSolicitacaoVeiculo {
    km_final_veiculo: number;
    idPorteiroEntrada: number;
}

export interface IUsuario {
    chapa: string;
    nome: string;
    cpf: string;
    dataNascimento: string;
}