export interface ILOG {
    id: number;
    tela: string;
    acao: string;
    idUsuario: number;
    nomeUsuario: string;
    dataHora: Date;
    mensagem: string;
}

export interface ILogTabela {
    id: number;
    mensagem: string;
    dadosAntes: string;
    dadosDepois: string;
}