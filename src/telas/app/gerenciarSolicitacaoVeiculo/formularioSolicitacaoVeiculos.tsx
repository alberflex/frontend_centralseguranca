import { Fragment, useEffect } from "react";
import { Form, Button, Row, Col, Container, Dropdown } from "react-bootstrap";
import { useVisaoControllerFormularioSolicitacaoVeiculo } from "./visaoControllerFormularioSolicitacaoVeiculos";
import { GenericToast } from "../../../componentes/toast/toast";
import MenuSuperiorIniciar from "../../../componentes/menus/menuSuperiorIniciar";
import ModalBuscarUsuario from "../../../componentes/modal/modal";
import Spinner from "react-bootstrap/Spinner";

export default function FormularioSaidaVeiculo() {

    const {
        veiculo,
        porteiro,
        pessoal,
        modalAberto,
        termoPesquisa,
        campoSelecionado,
        toast,
        ehEdicao,
        register,
        handleSubmit,
        setModalAberto,
        setTermoPesquisa,
        buscarVeiculos,
        buscarPorteiros,
        buscarPessoal,
        setCampoSelecionado,
        setValue,
        watch,
        setToast,
        abrirConfirmacaoSalvar,
        carregando
    } = useVisaoControllerFormularioSolicitacaoVeiculo();

    useEffect(() => {
        buscarVeiculos();
        buscarPorteiros();
    }, []);

    return (
        <Fragment>
            <MenuSuperiorIniciar />
            {carregando && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{
                        backgroundColor: "rgba(0,0,0,0.4)",
                        zIndex: 2000
                    }}
                >
                    <div className="text-center text-white">
                        <Spinner animation="border" />
                        <div className="mt-2">Carregando...</div>
                    </div>
                </div>
            )}

            <Container className="my-4 border rounded-4 bg-light p-4">
                <h4 className="mb-4 text-center">Solicitação de veículo</h4>

                <Form onSubmit={handleSubmit(abrirConfirmacaoSalvar)}>

                    <fieldset disabled={carregando}>

                        <input type="hidden" {...register("idVeiculo", { required: true })} />
                        <input type="hidden" {...register("idPorteiroSaida", { required: true })} />
                        <input type="hidden" {...register("idPorteiroEntrada")} />

                        <Row className="mb-3">
                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label>Veículo solicitado:</Form.Label>

                                    <Dropdown className="w-100">
                                        <Dropdown.Toggle
                                            className="w-100 text-start"
                                            variant="outline-secondary"
                                            disabled={ehEdicao}
                                        >
                                            {veiculo.find(v => v.id === watch("idVeiculo"))?.placa || "Selecionar veículo"}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="w-100">
                                            {veiculo.map(item => (
                                                <Dropdown.Item
                                                    key={item.id}
                                                    onClick={() => setValue("idVeiculo", item.id)}
                                                >
                                                    {item.placa}
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label>Kilometragem final do veículo:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={ehEdicao ? "Informe a kilometragem do veículo" : "Desabilitado para cadastro"}
                                        readOnly={!ehEdicao}
                                        {...register("km_final_veiculo")}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Motorista responsável:</Form.Label>

                                    <div className="d-flex">
                                        <Form.Control
                                            disabled
                                            {...register("idResponsavel", { required: true })}
                                        />

                                        <Button
                                            className="ms-2"
                                            variant="outline-secondary"
                                            onClick={() => {
                                                setCampoSelecionado("idResponsavel");
                                                setModalAberto(true);
                                            }}
                                        >
                                            Buscar
                                        </Button>
                                    </div>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Responsável autorização:</Form.Label>

                                    <div className="d-flex">
                                        <Form.Control
                                            disabled
                                            {...register("idResponsavelAutorizacao", { required: true })}
                                        />

                                        <Button
                                            className="ms-2"
                                            variant="outline-secondary"
                                            onClick={() => {
                                                setCampoSelecionado("idResponsavelAutorizacao");
                                                setModalAberto(true);
                                            }}
                                        >
                                            Buscar
                                        </Button>
                                    </div>
                                </Form.Group>
                            </Col>

                        </Row>

                        <Row className="mb-3">

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Destino:</Form.Label>
                                    <Form.Control {...register("destino", { required: true })} />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Localização:</Form.Label>
                                    <Form.Control {...register("localizacao", { required: true })} />
                                </Form.Group>
                            </Col>

                        </Row>

                        <Row className="mb-3">
                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label>Porteiro saída:</Form.Label>

                                    <Dropdown className="w-100">
                                        <Dropdown.Toggle
                                            className="w-100 text-start"
                                            variant="outline-secondary"
                                            disabled={ehEdicao}
                                        >
                                            {porteiro.find(p => p.id === watch("idPorteiroSaida"))?.nome || "Selecionar porteiro"}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="w-100">
                                            {porteiro.map(item => (
                                                <Dropdown.Item
                                                    key={item.id}
                                                    onClick={() => setValue("idPorteiroSaida", item.id)}
                                                >
                                                    {item.nome}
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label>Porteiro entrada:</Form.Label>

                                    <Dropdown className="w-100">
                                        <Dropdown.Toggle
                                            className="w-100 text-start"
                                            variant="outline-secondary"
                                            disabled={!ehEdicao}
                                        >
                                            {porteiro.find(p => p.id === watch("idPorteiroEntrada"))?.nome || "Selecionar porteiro"}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="w-100">
                                            {porteiro.map(item => (
                                                <Dropdown.Item
                                                    key={item.id}
                                                    onClick={() => setValue("idPorteiroEntrada", item.id)}
                                                >
                                                    {item.nome}
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>
                            </Col>
                        </Row>

                    </fieldset>

                    <Button type="submit" variant="success" className="w-100" disabled={carregando}>
                        {carregando ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                Enviando...
                            </>
                        ) : (
                            "Enviar informações"
                        )}
                    </Button>

                </Form>
            </Container>

            <ModalBuscarUsuario
                mostrar={modalAberto}
                onFechar={() => setModalAberto(false)}
                termo={termoPesquisa}
                onTermoChange={setTermoPesquisa}
                usuarios={pessoal}
                onPesquisar={() => buscarPessoal(termoPesquisa)}
                onSelecionar={(usuario) => {

                    if (campoSelecionado === "idResponsavel") {
                        setValue("idResponsavel", String(usuario.chapa));
                    }

                    if (campoSelecionado === "idResponsavelAutorizacao") {
                        setValue("idResponsavelAutorizacao", String(usuario.chapa));
                    }

                    setModalAberto(false);
                }}
            />

            <GenericToast
                show={toast.show}
                title={toast.title}
                message={toast.message}
                onClose={() => setToast({ ...toast, show: false })}
                buttons={[
                    { label: "Confirmar", variant: "success", onClick: toast.onConfirm },
                    { label: "Cancelar", variant: "danger", onClick: () => setToast({ ...toast, show: false }) }
                ]}
            />

        </Fragment>
    );
}