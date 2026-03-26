export interface IVeiculo {
    id: number;
    placa: string;
    caminho_imagem_veiculo: File | string;
    km_atual: number;
    modelo: string;
}


export type VeiculoUpdate = Partial<Omit<IVeiculo, 'placa' | 'id'>>;
