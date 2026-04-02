import { Container } from 'react-bootstrap';
import { useVisaoControllerGerenciarAcessos } from './visaoControllerGerenciarAcessos';
import { GenericToast } from '../../../componentes/toast/toast';
import { Row, Col, Form, Button } from "react-bootstrap";
import MenuSuperiorIniciar from '../../../componentes/menus/menuSuperiorIniciar';
import Tabela from '../../../componentes/tabelas/tabela';
import 'bootstrap/dist/css/bootstrap.min.css';
import { EPapel } from '../../../enum/EPapel';

export default function ControleAcesso() {
    const {
        acessos,
        colunasTabela,
        toast,
        IconeAdicionar,
        deletarAcesso,
        selecionarAcesso,
        setToast,
        abrirConfirmacaoExclusao,
        vaiParaFormularioAcesso,
        setDataFim,
        setDataInicio,
        dataFim,
        dataInicio,
        buscarAcessos,
        limparFiltro,
        gerarPDF,
        informacoesUsuario
    } = useVisaoControllerGerenciarAcessos();

    return (
        <Container fluid>
            <MenuSuperiorIniciar />

            <div className="d-flex flex-column flex-md-row justify-content-between px-4">
                <h4 className="text-center text-md-start mb-3 mb-md-0">Gerenciar solicitações de acesso.</h4>

                <div
                    className="d-flex text-center px-2 mb-2 mb-md-0"
                    onClick={vaiParaFormularioAcesso}
                    style={{
                        cursor: "pointer",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <IconeAdicionar size={22} />
                    <span className="ms-2">Formulário solicitação de acesso</span>
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
                    <Button variant="primary" className="flex-fill" onClick={() => buscarAcessos(dataInicio, dataFim)} >
                        Filtrar dados
                    </Button>

                    <Button
                        variant="primary"
                        className="flex-fill"
                        onClick={gerarPDF}
                    >
                        Gerar relatório
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
                dados={acessos}
                aoDeletar={abrirConfirmacaoExclusao}
                aoEditar={selecionarAcesso}
                podeDeletar={informacoesUsuario?.papel === EPapel.ADMINISTRADOR}
            />

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