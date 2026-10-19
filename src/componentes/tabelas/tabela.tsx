import { GoTrash } from "react-icons/go";
import { HiOutlinePencil } from "react-icons/hi2";
import { Button, Table } from "react-bootstrap";

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
    const IconeLixeira = GoTrash as unknown as React.FC<{ size?: number, className?: string }>;
    const IconeLapis = HiOutlinePencil as unknown as React.FC<{ size?: number, className?: string }>;
    const temAcoes = podeEditar || podeDeletar;

    return (
        <div className="table-responsive">
            <Table striped hover className="align-middle mb-0" style={{ fontSize: "1.05rem" }}>
                <thead className="table-light">
                    <tr>
                        {colunas.map((col, index) => (
                            <th key={index} className="py-2">{col.label}</th>
                        ))}
                        {temAcoes && <th className="py-2 text-center">Ações</th>}
                    </tr>
                </thead>
                <tbody>
                    {(!dados || dados.length === 0) && (
                        <tr>
                            <td colSpan={colunas.length + (temAcoes ? 1 : 0)} className="text-center text-muted py-5">
                                Nenhum registro encontrado.
                            </td>
                        </tr>
                    )}

                    {dados?.map((linha, i) => (
                        <tr key={i} onClick={() => onRowClick?.(linha)} style={{ cursor: onRowClick ? 'pointer' : 'default' }}>
                            {colunas?.map((col, j) => (
                                <td key={j} className="py-2">
                                    {String(linha[col.key] ?? '')}
                                </td>
                            ))}

                            {temAcoes && (
                                <td className="py-1">
                                    <div className="d-flex flex-wrap gap-1 justify-content-center">
                                        {podeEditar && (
                                            <Button size="sm"
                                                variant="outline-primary"
                                                className="d-flex align-items-center gap-1 fw-semibold px-2 py-1 text-nowrap"
                                                onClick={(e) => { e.stopPropagation(); aoEditar?.(linha.id); }}
                                            >
                                                <IconeLapis size={18} /> Editar
                                            </Button>
                                        )}
                                        {podeDeletar && (
                                            <Button size="sm"
                                                variant="outline-danger"
                                                className="d-flex align-items-center gap-1 fw-semibold px-2 py-1 text-nowrap"
                                                onClick={(e) => { e.stopPropagation(); aoDeletar?.(linha.id); }}
                                            >
                                                <IconeLixeira size={18} /> Excluir
                                            </Button>
                                        )}
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
