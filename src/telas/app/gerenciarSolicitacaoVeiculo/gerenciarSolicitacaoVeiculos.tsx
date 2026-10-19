import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useVisaoControllerListagemSolicitacaoVeiculo } from "./visaoControllerGerenciarSolicitacaoVeiculos";
import { GenericToast } from "../../../componentes/toast/toast";
import Tabela from "../../../componentes/tabelas/tabela";
import { EPapel } from "../../../enum/EPapel";
import { CabecalhoListagem, CardFiltro, CardRegistros, estiloBotao, estiloCampo, estiloRotulo } from "../../../componentes/listagem/listagem";

export default function ControleSolicitacaoVeiculo() {
    const {
        colunasTabela,
        solicitacaoVeiculo,
        selecionarSolicitacaoVeiculo,
        abrirConfirmacaoExclusao,
        setToast,
        toast,
        IconeAdicionar,
        vaiParaFormularioSolicitacaoVeiculo,
        dataFim,
        dataInicio,
        setDataFim,
        setDataInicio,
        limparFiltro,
        buscarSolicitacaoVeiculo,
        gerarPDF,
        informacoesUsuario
    } = useVisaoControllerListagemSolicitacaoVeiculo();

    return (
        <Container fluid className="p-3 p-md-4">
            <CabecalhoListagem
                titulo="Solicitações de veículo"
                descricao="Consulte, edite ou cadastre saídas de veículos."
                textoBotao="Nova solicitação"
                icone={<IconeAdicionar size={26} />}
                onNovo={vaiParaFormularioSolicitacaoVeiculo}
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
                    <Col xs={12} md={4} xl={2}>
                        <Button variant="primary" size="lg" className={estiloBotao} onClick={() => buscarSolicitacaoVeiculo(dataInicio, dataFim)}>Filtrar</Button>
                    </Col>
                    <Col xs={12} md={4} xl={2}>
                        <Button variant="outline-secondary" size="lg" className={`${estiloBotao} border-2`} onClick={limparFiltro}>Limpar filtro</Button>
                    </Col>
                    <Col xs={12} md={4} xl={2}>
                        <Button variant="outline-primary" size="lg" className={`${estiloBotao} border-2`} onClick={gerarPDF}>Gerar relatório</Button>
                    </Col>
                </Row>
            </CardFiltro>

            <CardRegistros total={solicitacaoVeiculo?.length ?? 0}>
                <Tabela colunas={colunasTabela} dados={solicitacaoVeiculo} aoEditar={selecionarSolicitacaoVeiculo} aoDeletar={abrirConfirmacaoExclusao} podeDeletar={informacoesUsuario?.papel === EPapel.ADMINISTRADOR} />
            </CardRegistros>

            <GenericToast
                show={toast.show}
                onClose={() => setToast({ ...toast, show: false })}
                title={toast.title}
                message={toast.message}
                buttons={
                    toast.onConfirm
                        ? [
                            {
                                label: "Confirmar",
                                variant: "success",
                                onClick: () => toast.onConfirm?.()
                            },
                            {
                                label: "Cancelar",
                                variant: "danger",
                                onClick: () => setToast(prev => ({ ...prev, show: false }))
                            }
                        ]
                        : [
                            {
                                label: "Fechar",
                                variant: "danger",
                                onClick: () => setToast(prev => ({ ...prev, show: false }))
                            }
                        ]
                }
            />
        </Container>
    );
}
