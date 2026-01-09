import { Modal, Button, Form } from "react-bootstrap";
import { IUsuario } from "../../interfaces/IControleVeiculo";

interface Props {
    mostrar: boolean;
    onFechar: () => void;
    termo: string;
    onTermoChange: (valor: string) => void;
    usuarios: IUsuario[];
    onPesquisar: () => void;
    onSelecionar: (usuario: IUsuario) => void;
}

export default function ModalBuscarUsuario({
    mostrar,
    onFechar,
    termo,
    onTermoChange,
    usuarios,
    onPesquisar,
    onSelecionar
}: Props) {
    return (
        <Modal show={mostrar} onHide={onFechar} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Buscar Usuário</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="d-flex mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Digite o nome do usuário..."
                        value={termo}
                        onChange={(e) => onTermoChange(e.target.value)}
                    />
                    <Button
                        variant="primary"
                        className="ms-2"
                        onClick={onPesquisar}
                    >
                        Pesquisar
                    </Button>
                </Form>

                <ul className="list-group">
                    {usuarios.length === 0 ? (
                        <li className="list-group-item text-muted">
                            Nenhum usuário encontrado
                        </li>
                    ) : (
                        usuarios.map((u) => (
                            <li
                                key={u.chapa}
                                className="list-group-item list-group-item-action"
                                style={{ cursor: "pointer" }}
                                onClick={() => onSelecionar(u)}
                            >
                                <strong>{u.nome}</strong> — {u.chapa}
                            </li>
                        ))
                    )}
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onFechar}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
