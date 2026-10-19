import { ReactNode } from "react";
import { Badge, Button, Card, Pagination } from "react-bootstrap";

// Estilos maiores para facilitar a leitura de usuarios com dificuldade de visao
export const estiloRotulo = "fs-5 fw-semibold mb-2";
export const estiloCampo = "py-3 fs-5 border-2 border-secondary-subtle";
export const estiloBotao = "py-3 fs-5 fw-semibold w-100";
const corTitulo = { color: "rgb(44, 62, 80)" };

interface CabecalhoListagemProps {
    titulo: string;
    descricao: string;
    textoBotao?: string;
    icone?: ReactNode;
    onNovo?: () => void;
}

export const CabecalhoListagem = ({ titulo, descricao, textoBotao, icone, onNovo }: CabecalhoListagemProps) => (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
            <h2 className="fw-bold mb-1">{titulo}</h2>
            <p className="fs-5 text-muted mb-0">{descricao}</p>
        </div>
        {onNovo && (
            <Button variant="success" size="lg" className="d-flex align-items-center justify-content-center gap-2 py-3 px-4 fs-5 fw-semibold" onClick={onNovo}>
                {icone} {textoBotao}
            </Button>
        )}
    </div>
);

export const CardFiltro = ({ titulo = "Filtrar por período", children }: { titulo?: string; children: ReactNode }) => (
    <Card className="shadow-sm border-0 mb-4">
        <Card.Header className="bg-white border-bottom py-3">
            <h3 className="fs-4 fw-bold mb-0" style={corTitulo}>{titulo}</h3>
        </Card.Header>
        <Card.Body className="p-3 p-md-4">{children}</Card.Body>
    </Card>
);

export const CardRegistros = ({ total, children }: { total: number; children: ReactNode }) => (
    <Card className="shadow-sm border-0">
        <Card.Header className="bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
            <h3 className="fs-4 fw-bold mb-0" style={corTitulo}>Registros</h3>
            <Badge bg="secondary" className="fs-6 px-3 py-2">{total} encontrados</Badge>
        </Card.Header>
        <Card.Body className="p-0">{children}</Card.Body>
    </Card>
);

interface PaginacaoProps {
    paginaAtual: number;
    totalPaginas: number;
    onMudarPagina: (pagina: number) => void;
}

// Mostra no maximo 5 numeros de pagina ao redor da pagina atual
export const Paginacao = ({ paginaAtual, totalPaginas, onMudarPagina }: PaginacaoProps) => {
    if (totalPaginas <= 1) return null;

    const inicio = Math.max(1, Math.min(paginaAtual - 2, totalPaginas - 4));
    const fim = Math.min(totalPaginas, inicio + 4);
    const paginas = Array.from({ length: fim - inicio + 1 }, (_, i) => inicio + i);

    return (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 p-3 border-top">
            <span className="fs-5 text-muted">Página {paginaAtual} de {totalPaginas}</span>
            <Pagination size="lg" className="mb-0 flex-wrap">
                <Pagination.First disabled={paginaAtual === 1} onClick={() => onMudarPagina(1)} />
                <Pagination.Prev disabled={paginaAtual === 1} onClick={() => onMudarPagina(paginaAtual - 1)} />
                {paginas.map(p => (
                    <Pagination.Item key={p} active={p === paginaAtual} onClick={() => onMudarPagina(p)}>{p}</Pagination.Item>
                ))}
                <Pagination.Next disabled={paginaAtual === totalPaginas} onClick={() => onMudarPagina(paginaAtual + 1)} />
                <Pagination.Last disabled={paginaAtual === totalPaginas} onClick={() => onMudarPagina(totalPaginas)} />
            </Pagination>
        </div>
    );
};
