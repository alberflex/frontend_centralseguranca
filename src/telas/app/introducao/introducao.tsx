import { Container, Row, Col, Card, Spinner, ProgressBar, ListGroup, Badge } from "react-bootstrap";
import { useVisaoControllerIntroducao } from "./visaoControllerIntroducao";

interface IndicadorProps {
  titulo: string;
  valor: number | null;
  descricao: string;
}

const Indicador = ({ titulo, valor, descricao }: IndicadorProps) => (
  <Card className="shadow-sm border-0 h-100">
    <Card.Body className="d-flex flex-column justify-content-between">
      <Card.Subtitle className="text-muted text-uppercase small fw-semibold mb-2">{titulo}</Card.Subtitle>
      <div className="display-5 fw-bold" style={{ color: "rgb(44, 62, 80)" }}>{valor ?? 0}</div>
      <Card.Text className="text-muted mb-0">{descricao}</Card.Text>
    </Card.Body>
  </Card>
);

interface RankingProps {
  titulo: string;
  nomes: string[];
  valores: number[];
}

const Ranking = ({ titulo, nomes, valores }: RankingProps) => {
  const maior = Math.max(...valores, 1);

  return (
    <Card className="shadow-sm border-0 h-100">
      <Card.Header className="bg-white border-0 pt-3">
        <Card.Title className="fw-bold mb-0">{titulo}</Card.Title>
      </Card.Header>
      <Card.Body className="pt-2">
        {nomes.length === 0 ? (
          <p className="text-muted mb-0">Nenhum registro encontrado.</p>
        ) : (
          <ListGroup variant="flush">
            {nomes.map((nome, idx) => (
              <ListGroup.Item key={idx} className="px-0">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="text-truncate me-2">{nome}</span>
                  <Badge bg="secondary" pill>{valores[idx]}</Badge>
                </div>
                <ProgressBar now={(valores[idx] / maior) * 100} variant="success" style={{ height: 8 }} />
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
};

export const TelaConsolidador = () => {
  const {
    pontosAbertos,
    veiculosAbertos,
    acessosAbertos,
    labelsVeiculos,
    valoresVeiculos,
    labelsVisitantes,
    valoresVisitantes,
    labelsRotas,
    valoresRotas
  } = useVisaoControllerIntroducao();

  if (pontosAbertos === null) {
    return (
      <Container className="d-flex justify-content-center align-items-center h-100 py-5">
        <Spinner animation="border" variant="success" />
      </Container>
    );
  }

  return (
    <Container fluid className="p-3 p-md-4">
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Dashboard</h2>
        <p className="text-muted mb-0">Resumo da portaria, veículos e visitantes.</p>
      </div>

      <Row xs={1} md={3} className="g-4 mb-4">
        <Col><Indicador titulo="Pontos abertos" valor={pontosAbertos} descricao="Colaboradores em trabalho" /></Col>
        <Col><Indicador titulo="Veículos em trânsito" valor={veiculosAbertos} descricao="Veículos sendo utilizados" /></Col>
        <Col><Indicador titulo="Visitantes presentes" valor={acessosAbertos} descricao="Visitantes dentro da empresa" /></Col>
      </Row>

      <Row xs={1} lg={3} className="g-4">
        <Col><Ranking titulo="Veículos do mês" nomes={labelsVeiculos} valores={valoresVeiculos} /></Col>
        <Col><Ranking titulo="Rotas mais acessadas" nomes={labelsRotas} valores={valoresRotas} /></Col>
        <Col><Ranking titulo="Visitantes do mês" nomes={labelsVisitantes} valores={valoresVisitantes} /></Col>
      </Row>
    </Container>
  );
};
