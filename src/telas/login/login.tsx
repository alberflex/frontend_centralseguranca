import { Button, Col, Container, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useVisaoControllerLogin } from "./visaoControllerLogin";

export default function TelaLogin() {
    const { logo, logoClaro, alerta, setAlerta, realizaLogin, handleSubmit, control, errors, isSubmitting } = useVisaoControllerLogin();

    return (
        <Container fluid className="p-0 vh-100 w-100">
            <Row className="g-0 h-100">

                <Col
                    md={6}
                    className="d-none d-md-flex flex-column justify-content-between text-white p-5"
                    style={{ background: "linear-gradient(135deg, rgb(44, 62, 80), rgb(74, 100, 145))" }}
                >
                    <img src={logoClaro} alt="Logo Alberflex" style={{ width: "220px" }} />

                    <div>
                        <h1 className="display-4 fw-bold mb-3">CENTRAL DE SEGURANÇA</h1>
                        <p className="fs-4 mb-0" style={{ opacity: 0.85 }}>
                            Portaria, controle de veículos e acessos em um só lugar.
                        </p>
                    </div>

                    <div className="small" style={{ opacity: 0.7 }}>© 2026 Alberflex • Central de Segurança</div>
                </Col>

                {/* Metade direita: formulário */}
                <Col xs={12} md={6} className="d-flex align-items-center justify-content-center bg-white p-4 p-md-5">
                    <div className="w-100" style={{ maxWidth: "520px" }}>

                        <div className="text-center d-md-none mb-4">
                            <img src={logo} alt="Logo Alberflex" style={{ width: "200px" }} />
                        </div>

                        <h2 className="display-6 fw-bold mb-2">Entrar</h2>
                        <p className="fs-5 text-muted mb-5">Informe sua chapa e senha para acessar o sistema.</p>

                        <Form onSubmit={handleSubmit(realizaLogin)} noValidate>
                            <Form.Group className="mb-4" controlId="login-chapa">
                                <Form.Label className="fs-5 fw-semibold">Chapa</Form.Label>
                                <Form.Control
                                    type="text"
                                    size="lg"
                                    className="py-3 fs-5"
                                    placeholder="Sua chapa"
                                    autoFocus
                                    autoComplete="username"
                                    isInvalid={!!errors.chapa}
                                    {...control.register("chapa", { required: "Chapa é obrigatória" })}
                                />
                                <Form.Control.Feedback type="invalid">{errors.chapa?.message}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-5" controlId="login-senha">
                                <Form.Label className="fs-5 fw-semibold">Senha</Form.Label>
                                <Form.Control
                                    type="password"
                                    size="lg"
                                    className="py-3 fs-5"
                                    placeholder="Sua senha"
                                    autoComplete="current-password"
                                    isInvalid={!!errors.senha}
                                    {...control.register("senha", { required: "Senha é obrigatória" })}
                                />
                                <Form.Control.Feedback type="invalid">{errors.senha?.message}</Form.Control.Feedback>
                            </Form.Group>

                            <div className="d-grid">
                                <Button variant="success" size="lg" type="submit" className="py-3 fs-4 fw-semibold" disabled={isSubmitting}>
                                    {isSubmitting ? <><Spinner size="sm" className="me-2" /> Entrando...</> : "Entrar"}
                                </Button>
                            </div>
                        </Form>

                        <div className="text-center text-muted small mt-5 d-md-none">© 2026 Alberflex • Central de Segurança</div>
                    </div>
                </Col>
            </Row>

            <Modal show={alerta.exibe} onHide={() => setAlerta(prev => ({ ...prev, exibe: false }))} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{alerta.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="mb-0">{alerta.mensagem}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setAlerta(prev => ({ ...prev, exibe: false }))}>Fechar</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};
