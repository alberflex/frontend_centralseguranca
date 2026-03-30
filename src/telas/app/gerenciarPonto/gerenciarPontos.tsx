import { Container } from "react-bootstrap";
import { useVisaoControllerGerenciarPontos } from "./visaoControllerGerenciarPontos";
import { GenericToast } from "../../../componentes/toast/toast";
import { Row, Col, Form, Button } from "react-bootstrap";
import MenuSuperiorIniciar from "../../../componentes/menus/menuSuperiorIniciar";
import Tabela from "../../../componentes/tabelas/tabela";
import { EPapel } from "../../../enum/EPapel";

export default function GerenciarPontos() {
    const {
        selecionarPonto,
        pontos,
        colunasTabela,
        toast,
        setToast,
        abrirConfirmacaoExclusao,
        IconeAdicionar,
        vaiParaFormularioPonto,
        limparFiltro,
        dataFim,
        dataInicio,
        setDataInicio,
        setDataFim,
        buscarPontos,
        gerarPDF,
        informacoesUsuario
    } = useVisaoControllerGerenciarPontos();

    return (
        <Container fluid>
            <MenuSuperiorIniciar />

            <div className="d-flex flex-column flex-md-row justify-content-between px-4">
                <h4 className="text-center text-md-start mb-3 mb-md-0">
                    Gerenciar pontos
                </h4>

                <div
                    className="d-flex text-center px-2 mb-2 mb-md-0"
                    onClick={vaiParaFormularioPonto}
                    style={{
                        cursor: "pointer",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <IconeAdicionar size={22} />
                    <span className="ms-2">Formulário de ponto</span>
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
                <Button variant="primary" className="flex-fill" onClick={() => buscarPontos(dataInicio, dataFim)}>
                        Filtrar dados
                    </Button>
                    <Button variant="primary" className="flex-fill" onClick={gerarPDF}>
                        Gerar relatório
                    </Button>
                    <Button variant="secondary" className="flex-fill" onClick={limparFiltro}>
                        Limpar filtro
                    </Button>
                </Col>
            </Row>


            <Tabela
                colunas={colunasTabela}
                dados={pontos}
                aoDeletar={abrirConfirmacaoExclusao}
                aoEditar={selecionarPonto}
                podeDeletar={informacoesUsuario?.papel === EPapel.ADMINISTRADOR}
            />

            <GenericToast
                show={toast.show}
                onClose={() => setToast({ ...toast, show: false })}
                title={toast.title}
                message={toast.message}
                buttons={[
                    { label: "Confirmar", onClick: toast.onConfirm, variant: "success" },
                    { label: "Cancelar", onClick: () => setToast({ ...toast, show: false }), variant: "danger" }
                ]}
            />
        </Container>
    );
}