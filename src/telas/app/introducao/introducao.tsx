import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import MenuSuperiorIniciar from "../../../componentes/menus/menuSuperiorIniciar";
import BarChart from "../../../componentes/graficos/graficoBarras";
import DoughnutChart from "../../../componentes/graficos/graficoCircular";

interface IResumoConsolidador {
  acessosAbertos: number;
  solicitacoesVeiculosMes: number;
  pontosAbertos: number;
}

export default function TelaConsolidador() {
  const [resumo, setResumo] = useState<IResumoConsolidador | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setResumo({
        acessosAbertos: 5,
        solicitacoesVeiculosMes: 12,
        pontosAbertos: 3,
      });
    }, 1000);
  }, []);

  if (!resumo) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="success" />
      </Container>
    );
  }

  const nomesUsuarios = ["João", "Maria", "Pedro", "Ana"];
  const valoresAcessos = [resumo.acessosAbertos, 2, 3, 4];

  const labelsVeiculos = ["Carros", "Motos", "Caminhões"];
  const valoresVeiculos = [5, 3, resumo.solicitacoesVeiculosMes];

  return (
    <Container fluid>
      <MenuSuperiorIniciar />
      <div className="d-flex flex-column flex-md-row justify-content-between px-4">
        <h4 className="text-center text-md-start mb-3 mb-md-0">Dashboard</h4>
      </div>

      <Row xs={1} md={3} className="g-4 mb-4">
        <Col>
          <Card className="shadow-sm border-0 text-center h-100">
            <Card.Body>
              <Card.Title className="fw-bold">Acessos em aberto</Card.Title>
              <Card.Text className="display-5 fw-bold text-success">
                {resumo.acessosAbertos}
              </Card.Text>
              <Card.Subtitle className="text-muted">
                Pessoas ainda dentro da empresa
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="shadow-sm border-0 text-center h-100">
            <Card.Body>
              <Card.Title className="fw-bold">Solicitações de veículos</Card.Title>
              <Card.Text className="display-5 fw-bold text-primary">
                {resumo.solicitacoesVeiculosMes}
              </Card.Text>
              <Card.Subtitle className="text-muted">
                No mês atual
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="shadow-sm border-0 text-center h-100">
            <Card.Body>
              <Card.Title className="fw-bold">Pontos abertos</Card.Title>
              <Card.Text className="display-5 fw-bold text-warning">
                {resumo.pontosAbertos}
              </Card.Text>
              <Card.Subtitle className="text-muted">
                Colaboradores sem batida de saída
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Gráficos */}
      <Row xs={1} md={3} className="g-4">
        <Col>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <BarChart
                titulo="Acessos por usuário"
                definicao="Acessos"
                arrNomes={nomesUsuarios}
                arrValores={valoresAcessos}
              />
            </Card.Body>
          </Card>
        </Col>
    <Col>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <BarChart
                titulo="Acessos por usuário"
                definicao="Acessos"
                arrNomes={nomesUsuarios}
                arrValores={valoresAcessos}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <DoughnutChart
                titulo="Solicitações de veículos"
                labels={labelsVeiculos}
                values={valoresVeiculos}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}