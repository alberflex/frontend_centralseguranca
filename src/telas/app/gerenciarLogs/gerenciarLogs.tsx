import { Container } from 'react-bootstrap';
import { useVisaoControllerGerenciarLogs } from './visaoControllerGerenciarLogs';
import { Row, Col, Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuSuperiorIniciar from '../../../componentes/menus/menuSuperiorIniciar';
import Tabela from '../../../componentes/tabelas/tabela';

export default function GerenciarLog() {
    const {
        logs,
        colunasTabela,
        dataInicio,
        dataFim,
        setDataFim,
        setDataInicio,
        buscarLogs,
        limparFiltro,
        informacoesUsuario
    } = useVisaoControllerGerenciarLogs();

    return (
        <Container fluid>
            <MenuSuperiorIniciar />

            <div className="d-flex flex-column flex-md-row justify-content-between px-4">
                <h4 className="text-center text-md-start mb-3 mb-md-0">
                    Gerenciar LOGs de sistema.
                </h4>

                <div
                    className="d-flex text-center px-2 mb-2 mb-md-0"
                    style={{
                        cursor: "pointer",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                </div>
            </div>

            <Row className="px-4 mt-3 mb-3 align-items-end g-2">
                <Col xs={12} md={3}>
                    <Form.Group>
                        <Form.Label>Data Início</Form.Label>
                        <Form.Control
                            type="date"
                            value={dataInicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                        />
                    </Form.Group>
                </Col>

                <Col xs={12} md={3}>
                    <Form.Group>
                        <Form.Label>Data Fim</Form.Label>
                        <Form.Control
                            type="date"
                            value={dataFim}
                            onChange={(e) => setDataFim(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="px-4 mt-3 mb-3 align-items-end g-2">
                <Col xs={12} md={3} className="d-flex gap-2">
                    <Button variant="primary" className="flex-fill" onClick={() => buscarLogs(dataInicio, dataFim)} >
                        Filtrar dados
                    </Button>

                    <Button
                        variant="secondary"
                        className="flex-fill"
                        onClick={limparFiltro}
                    >
                        Limpar filtro
                    </Button>
                </Col>
            </Row>

            <Tabela
                colunas={colunasTabela}
                dados={logs}
                podeDeletar={false}
                podeEditar={false}
            />
        </Container>
    );
}