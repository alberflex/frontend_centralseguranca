import { Container } from "react-bootstrap";
import { useVisaoControllerGerenciarVeiculo } from "./visaoControllerGerenciarVeiculos";
import { GenericToast } from "../../../componentes/toast/toast";
import { EPapel } from "../../../enum/EPapel";
import { Row, Col, Form, Button } from "react-bootstrap";
import Tabela from "../../../componentes/tabelas/tabela";

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
        <Container fluid>
            <div className="d-flex flex-column flex-md-row justify-content-between px-4">
                <h4 className="text-center text-md-start mb-3 mb-md-0">Gerenciar veículos</h4>
                <div className="d-flex text-center px-2 mb-2 mb-md-0" onClick={vaiParaFormularioVeiculo} style={{ display: 'flex', cursor: "pointer", alignItems: 'center', justifyContent: 'center' }}>
                    <IconeAdicionar size={22} />
                    <span>Formulário de veículo</span>
                </div>
            </div>

            <Row className="px-4 mt-3 mb-3 align-items-end g-2">
                <Col xs={12} md={3}>
                    <Form.Group>
                        <Form.Label>Filtrar veiculo</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Filtrar veículo"
                            value={placa}
                            onChange={(texto) => setPlaca(texto.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="px-4 mt-3 mb-3 align-items-end g-2">
                <Col xs={12} md={3} className="d-flex gap-2">
                    <Button variant="primary" className="flex-fill" onClick={() => buscarVeiculos(placa)}>Filtrar dados</Button>
                    <Button variant="primary" className="flex-fill" onClick={gerarPDF}>Gerar relatório</Button>
                    <Button variant="secondary" className="flex-fill" onClick={limparFiltro}>Limpar filtro</Button>
                </Col>
            </Row>

            <Tabela colunas={colunasTabela} dados={veiculo} aoDeletar={abrirConfirmacaoExclusao} aoEditar={selecionarVeiculo} podeDeletar={informacoesUsuario?.papel === EPapel.ADMINISTRADOR}
            />
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
        </Container >
    );
}