import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export default function FormularioAcesso() {
    return (
        <Container className="my-4">
            <h4 className="mb-4 text-center">Formulário de acesso.</h4>
            <Form>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="formNomeVisitante">
                            <Form.Label>Nome do visitante:</Form.Label>
                            <Form.Control type="text" placeholder="Digite o nome do visitante" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formCpfVisitante">
                            <Form.Label>CPF do visitante:</Form.Label>
                            <Form.Control type="text" placeholder="Digite o CPF" />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="formImagemVisitante">
                            <Form.Label>Selecionar imagem:</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formPlacaVeiculo">
                            <Form.Label>Placa do veículo: </Form.Label>
                            <Form.Control type="text" placeholder="Ex: ABC-1234" />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="formMotivo">
                            <Form.Label>Motivo da visita:</Form.Label>
                            <Form.Control type="text" placeholder="Informe o motivo" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formEmpresa">
                            <Form.Label>Empresa:</Form.Label>
                            <Form.Control type="text" placeholder="Nome da empresa" />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3 align-items-end">
                    <Col md={9}>
                        <Form.Group controlId="formResponsavel">
                            <Form.Label>Nome do responsável:</Form.Label>
                            <Form.Control type="text" placeholder="Digite o nome do responsável" />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Button variant="secondary" className="w-100">Buscar responsável</Button>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="formNumeroCartao">
                            <Form.Label>Número do cartão:</Form.Label>
                            <Form.Select defaultValue="">
                                <option value="">Selecione</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formHoraEntrada">
                            <Form.Label>Hora de entrada</Form.Label>
                            <Form.Control type="time" />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formHoraSaida">
                            <Form.Label>Hora de saída</Form.Label>
                            <Form.Control type="time" />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3 align-items-end">
                    <Col md={9}>
                        <Form.Group controlId="formPorteiroEntrada">
                            <Form.Label>Nome do porteiro (entrada)</Form.Label>
                            <Form.Control type="text" placeholder="Digite o nome do porteiro" />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Button variant="secondary" className="w-100">Buscar</Button>
                    </Col>
                </Row>

                <Row className="mb-3 align-items-end">
                    <Col md={9}>
                        <Form.Group controlId="formPorteiroSaida">
                            <Form.Label>Nome do porteiro (saída)</Form.Label>
                            <Form.Control type="text" placeholder="Digite o nome do porteiro" />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Button variant="secondary" className="w-100">Buscar</Button>
                    </Col>
                </Row>

                <Button variant="success" type="submit" className="w-100">
                    Salvar informações
                </Button>
            </Form>
        </Container>
    );
}
