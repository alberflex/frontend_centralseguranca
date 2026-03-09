import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { useVisaoControllerIntroducao } from "./visaoControllerIntroducao";
import MenuSuperiorIniciar from "../../../componentes/menus/menuSuperiorIniciar";

export const TelaConsolidador = () => {
  const { pontosAbertos, veiculosAbertos, acessosAbertos } = useVisaoControllerIntroducao();

  if (pontosAbertos === null) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="success" />
      </Container>
    );
  }

  return (
    <Container fluid>
      <MenuSuperiorIniciar />
      <Row xs={1} md={3} className="g-4 mb-4">
        <Col>
          <Card className="shadow-sm border-0 text-center h-100">
            <Card.Body>
              <Card.Title className="fw-bold">Pontos abertos</Card.Title>
              <Card.Text className="display-5 fw-bold text-warning">
                {pontosAbertos}
              </Card.Text>
              <Card.Subtitle className="text-muted">Colaboradores em trabalho</Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow-sm border-0 text-center h-100">
            <Card.Body>
              <Card.Title className="fw-bold">Veículos em trânsito</Card.Title>
              <Card.Text className="display-5 fw-bold text-warning">
                {veiculosAbertos}
              </Card.Text>
              <Card.Subtitle className="text-muted">Veículos sendo utilizados</Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow-sm border-0 text-center h-100">
            <Card.Body>
              <Card.Title className="fw-bold">Visitantes presentes</Card.Title>
              <Card.Text className="display-5 fw-bold text-warning">
                {acessosAbertos}
              </Card.Text>
              <Card.Subtitle className="text-muted">Visitantes dentro da empresa</Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};