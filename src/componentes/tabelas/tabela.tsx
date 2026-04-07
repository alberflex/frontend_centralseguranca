import { GoTrash } from "react-icons/go";
import { HiOutlinePencil } from "react-icons/hi2";
import Table from 'react-bootstrap/Table';

export interface ILayoutTabela<T> {
    key: keyof T;
    label: string;
}

interface TabelaProps<T> {
    colunas: ILayoutTabela<T>[];
    dados: T[];
    aoDeletar?: (linha: number) => void;
    aoEditar?: (linha: number) => void;
    podeDeletar?: boolean;
    podeEditar?: boolean;
    onRowClick?: (row: T) => void;
}

export default function Tabela<T extends Record<string, any>>({
    colunas,
    dados,
    aoDeletar,
    aoEditar,
    onRowClick,
    podeDeletar = true,
    podeEditar = true,
}: TabelaProps<T>) {
    const IconeLixeira = GoTrash as unknown as React.FC<{ size?: number, className?: string; onClick?: () => void; }>;
    const IconeLapis = HiOutlinePencil as unknown as React.FC<{ size?: number, className?: string; onClick?: () => void; }>;

    return (
        <div className="table-responsive">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {colunas.map((col, index) => (
                            <th key={index}>{col.label}</th>
                        ))}
                        {podeEditar && <th>Editar</th>}
                        {podeDeletar && <th>Excluir</th>}
                    </tr>
                </thead>
                <tbody>
                    {dados?.map((linha, i) => (
                        <tr key={i} onClick={() => onRowClick?.(linha)} style={{ cursor: 'pointer' }}>
                            {colunas?.map((col, j) => (
                                <td key={j}>
                                    {String(linha[col.key] ?? '')}
                                </td>
                            ))}


                            {podeEditar && (
                                <td style={{ cursor: 'pointer' }}>
                                    <IconeLapis
                                        size={20}
                                        className='d-flex mx-auto'
                                        onClick={() => aoEditar?.(linha.id)}
                                    />
                                </td>
                            )
                            }

                            {podeDeletar && (
                                <td style={{ cursor: 'pointer' }}>
                                    <IconeLixeira
                                        size={20}
                                        className='d-flex mx-auto'
                                        onClick={() => aoDeletar?.(linha.id)}
                                    />
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}