import { ReactNode } from "react";
import { Button, Card, Form, InputGroup, Spinner } from "react-bootstrap";

// Estilos maiores para facilitar a leitura de usuarios com dificuldade de visao
export const estiloRotulo = "fs-5 fw-semibold mb-2";
export const estiloCampo = "py-3 fs-5 border-2 border-secondary-subtle";
const corTitulo = { color: "rgb(44, 62, 80)" };

export const CabecalhoFormulario = ({ titulo, descricao }: { titulo: string; descricao: string }) => (
    <div className="mb-4">
        <h2 className="fw-bold mb-1">{titulo}</h2>
        <p className="fs-5 text-muted mb-0">{descricao}</p>
    </div>
);

export const Secao = ({ titulo, children }: { titulo: string; children: ReactNode }) => (
    <Card className="shadow-sm border-0 mb-4">
        <Card.Header className="bg-white border-bottom py-3">
            <h3 className="fs-4 fw-bold mb-0" style={corTitulo}>{titulo}</h3>
        </Card.Header>
        <Card.Body className="p-3 p-md-4">{children}</Card.Body>
    </Card>
);

interface CampoBuscaProps {
    texto: string;
    valor?: string;
    placeholder: string;
    desabilitado?: boolean;
    textoBotao?: string;
    onBuscar: () => void;
}

export const CampoBusca = ({ texto, valor, placeholder, desabilitado = false, textoBotao = "Buscar", onBuscar }: CampoBuscaProps) => (
    <Form.Group>
        <Form.Label className={estiloRotulo}>{texto}</Form.Label>
        <InputGroup size="lg">
            <Form.Control readOnly value={valor || ""} placeholder={placeholder} className={estiloCampo} disabled={desabilitado} />
            <Button variant="primary" className="px-4 fs-5 fw-semibold" disabled={desabilitado} onClick={onBuscar}>{textoBotao}</Button>
        </InputGroup>
    </Form.Group>
);

export const BotaoSalvar = ({ carregando, texto = "Salvar informações" }: { carregando?: boolean; texto?: string }) => (
    <div className="d-grid mb-4">
        <Button type="submit" variant="success" size="lg" className="py-3 fs-4 fw-semibold" disabled={carregando}>
            {carregando ? <><Spinner animation="border" size="sm" className="me-2" /> Enviando...</> : texto}
        </Button>
    </div>
);
