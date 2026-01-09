import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { useVisaoControllerLogin } from "./visaoControllerLogin";
import { Controller } from "react-hook-form";

export default function TelaLogin() {
    const {
        realizaLogin,
        handleSubmit,
        control
    } = useVisaoControllerLogin();

    return (
        <Container fluid className="vh-100">
            <Row className="h-100">
                <Col md={6} className="d-none d-md-block p-0">
                    <div style={{ height: "100%", backgroundImage: "url('/images/login.avif')", backgroundSize: "cover", backgroundPosition: "center" }} />
                </Col>
                <Col
                    xs={12}
                    md={6}
                    className="d-flex align-items-center justify-content-center"
                >
                    <div style={{ width: "80%", maxWidth: "400px" }}>
                        <div className="text-center w-100 w-md-50 mb-4">
                            <Image
                                src="/images/alberflex.png"
                                alt="Logo Alberflex"
                                fluid
                                style={{ maxWidth: '300px' }}
                            />
                        </div>
                        <Form onSubmit={handleSubmit(realizaLogin)}>
                            <Form.Group className="mb-3">
                                <Form.Label>Informe a chapa:</Form.Label>
                                <Controller
                                    name="chapa"
                                    control={control}
                                    defaultValue=""  
                                    render={({ field }) => (
                                        <Form.Control type="text" placeholder="01050" {...field} />
                                    )}
                                />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label>Senha:</Form.Label>
                                <Controller
                                    name="senha"
                                    control={control}
                                    render={({ field }) => (
                                        <Form.Control type="password" placeholder="20072025" {...field} />
                                    )}
                                />
                            </Form.Group>

                            <Button variant="success" type="submit" className="w-100">
                                Central de segurança
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}; 