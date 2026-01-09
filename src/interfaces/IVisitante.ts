export interface IVisitante {
    id?: number | undefined;
    cpf: string;
    nome: string;
    empresa: string;
    caminho_foto_visitante: File | string;
    caminho_imagem_assinatura: File | string;
}