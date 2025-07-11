import Table from 'react-bootstrap/Table';

interface TabelaProps {
    colunas: string[];
    dados: string[][];
}

export default function Tabela({ colunas, dados }: TabelaProps) {
    return (
        <div className="table-responsive">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {colunas.map((coluna, index) => (
                            <th key={index}>{coluna}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dados.map((linha, i) => (
                        <tr key={i}>
                            {linha.map((valor, j) => (
                                <td key={j}>{valor}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}