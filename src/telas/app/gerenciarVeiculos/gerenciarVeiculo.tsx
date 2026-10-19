import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useVisaoControllerGerenciarVeiculo } from "./visaoControllerGerenciarVeiculos";
import { GenericToast } from "../../../componentes/toast/toast";
import { EPapel } from "../../../enum/EPapel";
import Tabela from "../../../componentes/tabelas/tabela";
import { CabecalhoListagem, CardFiltro, CardRegistros, estiloBotao, estiloCampo, estiloRotulo } from "../../../componentes/listagem/listagem";

export default function ListagemVeiculo() {
    const {
        colunasTabela,
        veiculo,
        selecionarVeiculo,
        toast,
        setToast,
        abrirConfirmacaoExclusao,
        IconeAdicionar,
        vaiParaFormularioVeiculo,
        informacoesUsuario,
        buscarVeiculos,
        gerarPDF,
        limparFiltro,
        placa,
        setPlaca
    } = useVisaoControllerGerenciarVeiculo();

    return (
        <Container fluid className="p-3 p-md-4">
            <CabecalhoListagem
                titulo="Veículos"
                descricao="Consulte, edite ou cadastre veículos da frota."
                textoBotao="Novo veículo"
                icone={<IconeAdicionar size={26} />}
                onNovo={vaiParaFormularioVeiculo}
            />

            <CardFiltro titulo="Filtrar por placa">
                <Row className="g-3 align-items-end">
                    <Col xs={12} xl={6}>
                        <Form.Group controlId="filtro-placa">
                            <Form.Label className={estiloRotulo}>Placa do veículo</Form.Label>
                            <Form.Control
                                type="text"
                                size="lg"
                                className={estiloCampo}
                                placeholder="Digite a placa"
                                value={placa}
                                onChange={(texto) => setPlaca(texto.target.value)}
                                onKeyDown={(e) => { if (e.key === "Enter") buscarVeiculos(placa); }}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={4} xl={2}>
                        <Button variant="primary" size="lg" className={estiloBotao} onClick={() => buscarVeiculos(placa)}>Filtrar</Button>
                    </Col>
                    <Col xs={12} md={4} xl={2}>
                        <Button variant="outline-secondary" size="lg" className={`${estiloBotao} border-2`} onClick={limparFiltro}>Limpar filtro</Button>
                    </Col>
                    <Col xs={12} md={4} xl={2}>
                        <Button variant="outline-primary" size="lg" className={`${estiloBotao} border-2`} onClick={gerarPDF}>Gerar relatório</Button>
                    </Col>
                </Row>
            </CardFiltro>

            <CardRegistros total={veiculo?.length ?? 0}>
                <Tabela colunas={colunasTabela} dados={veiculo} aoDeletar={abrirConfirmacaoExclusao} aoEditar={selecionarVeiculo} podeDeletar={informacoesUsuario?.papel === EPapel.ADMINISTRADOR} />
            </CardRegistros>

            <GenericToast
                show={toast.show}
                onClose={() => setToast({ ...toast, show: false })}
                title={toast.title}
                message={toast.message}
                buttons={[
                    { label: "Confirmar", onClick: toast.onConfirm, variant: "success" },
                    { label: "Cancelar", onClick: () => setToast({ ...toast, show: false }), variant: "danger" },
                ]}
            />
        </Container>
    );
}
