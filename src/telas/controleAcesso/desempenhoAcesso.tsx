import { Container, Row, Col } from 'react-bootstrap';
import BarChart from '../../componentes/graficos/graficoBarras';
import DoughnutChart from '../../componentes/graficos/graficoCircular';

export default function DesempenhoAcesso() {
  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril'];
  const nomesPorteiro = [ 'João', 'Maria', 'Carlos', 'Ana' ];
  
  return (
    <Container fluid className="py-4">
      <Row className="g-4 ">
        <Col xs={12} md={6} >
          <BarChart
            titulo="Sistema 1"
            definicao="Acessos por mês"
            arrNomes={meses}
            arrValores={[100, 200, 150, 300]}
          />
        </Col>
        <Col xs={12} md={6} lg={4} className='d-flex align-items-center justify-content-center'>
          <DoughnutChart
            labels={nomesPorteiro}
            values={[80, 120, 180, 250]}
            titulo='Nomes do porteiros.'
          />
        </Col>
        <Col xs={12} md={6} >
          <BarChart
            titulo="Sistema 3"
            definicao="Acessos por mês"
            arrNomes={meses}
            arrValores={[300, 220, 150, 100]}
          />
        </Col>
        <Col xs={12} md={6} >
          <BarChart
            titulo="Sistema 4"
            definicao="Acessos por mês"
            arrNomes={meses}
            arrValores={[50, 100, 75, 200]}
          />
        </Col>
      </Row>
    </Container>
  );
}
