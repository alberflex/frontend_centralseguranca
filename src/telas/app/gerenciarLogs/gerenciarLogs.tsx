import { Container, Modal, Row, Col, Form, Button } from "react-bootstrap";
import { useVisaoControllerGerenciarLogs } from './visaoControllerGerenciarLogs';
import Tabela from '../../../componentes/tabelas/tabela';
import { CabecalhoListagem, CardFiltro, CardRegistros, Paginacao, estiloBotao, estiloCampo, estiloRotulo } from "../../../componentes/listagem/listagem";

const estiloJson = {
    background: "#f4f4f4",
    padding: "10px",
    borderRadius: "5px",
    maxHeight: "300px",
    overflow: "auto"
};

export default function GerenciarLog() {
    const {
        logs,
        logsPaginados,
        paginaAtual,
        setPaginaAtual,
        totalPaginas,
        colunasTabela,
        dataInicio,
        dataFim,
        setDataFim,
        setDataInicio,
        buscarLogs,
        limparFiltro,
        selecionarLogPorID,
        logSelecionado,
        mostrarModal,
        setMostrarModal,
        formatarJson
    } = useVisaoControllerGerenciarLogs();

    return (
        <Container fluid className="p-3 p-md-4">
            <CabecalhoListagem
                titulo="LOGs de sistema"
                descricao="Clique em um registro para ver os detalhes da alteração."
            />

            <CardFiltro>
                <Row className="g-3 align-items-end">
                    <Col xs={12} md={6} xl={3}>
                        <Form.Group controlId="filtro-data-inicio">
                            <Form.Label className={estiloRotulo}>Data início</Form.Label>
                            <Form.Control type="date" size="lg" className={estiloCampo} value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} xl={3}>
                        <Form.Group controlId="filtro-data-fim">
                            <Form.Label className={estiloRotulo}>Data fim</Form.Label>
                            <Form.Control type="date" size="lg" className={estiloCampo} value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} xl={3}>
                        <Button variant="primary" size="lg" className={estiloBotao} onClick={() => buscarLogs(dataInicio, dataFim)}>Filtrar</Button>
                    </Col>
                    <Col xs={12} md={6} xl={3}>
                        <Button variant="outline-secondary" size="lg" className={`${estiloBotao} border-2`} onClick={limparFiltro}>Limpar filtro</Button>
                    </Col>
                </Row>
            </CardFiltro>

            <CardRegistros total={logs?.length ?? 0}>
                <Tabela
                    colunas={colunasTabela}
                    dados={logsPaginados}
                    podeDeletar={false}
                    podeEditar={false}
                    onRowClick={(row) => selecionarLogPorID(row.id)}
                />
                <Paginacao paginaAtual={paginaAtual} totalPaginas={totalPaginas} onMudarPagina={setPaginaAtual} />
            </CardRegistros>

            <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} size="lg">
                <Modal.Header closeButton><Modal.Title>Gerenciamento de LOG's</Modal.Title></Modal.Header>
                <Modal.Body className="fs-5">
                    {logSelecionado && (
                        <>
                            <p><strong>ID de LOG's:</strong> {logSelecionado.id}</p>
                            <p><strong>Mensagem de ação:</strong> {logSelecionado.mensagem}</p>

                            <h6 className="fs-5 fw-bold">Dados Antes:</h6>
                            <pre style={estiloJson}>{formatarJson(logSelecionado.dadosAntes)}</pre>

                            <h6 className="fs-5 fw-bold">Dados Depois:</h6>
                            <pre style={estiloJson}>{formatarJson(logSelecionado.dadosDepois)}</pre>
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
}
