import { Fragment, useEffect } from "react";
import { Form, Button, Row, Col, Container, Dropdown, Spinner } from "react-bootstrap";
import { useVisaoControllerFormularioSolicitacaoVeiculo } from "./visaoControllerFormularioSolicitacaoVeiculos";
import { GenericToast } from "../../../componentes/toast/toast";
import { SpinnerComponente } from "../../../componentes/spinner/Spinner";
import ModalBuscarUsuario from "../../../componentes/modal/modal";

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
        carregando,
        estado,
        cidades,
        siglaSelecionada,
        nomeEstadoSelecionado, aprovadores, buscarUsuariosAprovadores,
        nomeResponsavel,
        setNomeResponsavel,
        nomeAutorizador,
        setNomeAutorizador,
        nomeResponsavelEntrada, setNomeResponsavelEntrada
    } = useVisaoControllerFormularioSolicitacaoVeiculo();

    const autoBuscar = campoSelecionado === "idResponsavelAutorizacao";

    useEffect(() => {
        buscarVeiculos();
        buscarPorteiros();
    }, []);

    return (
        <Fragment>
            <SpinnerComponente estado={carregando} />

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
                                        <Dropdown.Toggle className="w-100 text-start" variant="outline-secondary" disabled={ehEdicao}>
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
                                    <Form.Label>Motorista responsável (Saída):</Form.Label>
                                    <div className="d-flex">
                                        <Form.Control
                                            disabled
                                            value={nomeResponsavel || ""}
                                            placeholder="Selecione um responsável"
                                        />
                                        <input type="hidden" {...register("idResponsavel", { required: true })} />

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
                                    <Form.Label>Motorista responsável (Entrada):</Form.Label>
                                    <div className="d-flex">
                                        <Form.Control
                                            disabled
                                            value={nomeResponsavelEntrada || ""}
                                            placeholder={ehEdicao ? "Selecione um motorista de entrada" : "Campo liberado apenas na edição"}
                                        />
                                        <input type="hidden" {...register("idResponsavelEntrada", { required: ehEdicao })} />

                                        <Button
                                            className="ms-2"
                                            variant="outline-secondary"
                                            disabled={ehEdicao ? false : true}
                                            onClick={() => {
                                                setCampoSelecionado("idResponsavelEntrada");
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
                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label>Responsável autorização:</Form.Label>

                                    <div className="d-flex">
                                        <Form.Control
                                            disabled
                                            value={nomeAutorizador || ""}
                                            placeholder="Selecione um autorizador"
                                        />
                                        <input type="hidden" {...register("idResponsavelAutorizacao", { required: true })} />

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
                                    <Form.Label>Estado:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        {...register("destino", { required: true })}
                                        value={siglaSelecionada}
                                    >
                                        <option value="">{siglaSelecionada ? nomeEstadoSelecionado : "Selecione um estado"}</option>
                                        {estado.map((estadoItem) => (
                                            <option key={estadoItem.id} value={estadoItem.sigla}>
                                                {estadoItem.nome}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Localização (Cidade):</Form.Label>
                                    <Form.Control
                                        as="select"
                                        {...register("localizacao", { required: true })}
                                        disabled={!watch("destino")}
                                    >
                                        <option value="">Selecione uma cidade</option>
                                        {cidades.map((cidadeItem) => (
                                            <option key={cidadeItem.id} value={cidadeItem.nome}>
                                                {cidadeItem.nome}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Condição de saída do veículo:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        {...register("condicao_saida", { required: true })}
                                        defaultValue={"LIMPO"}
                                    >
                                        <option value="LIMPO">Limpo</option>
                                        <option value="SUJO">Sujo</option>
                                        <option value="MUITO_SUJO">Muito Sujo</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Condição de entrada do veículo:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        {...register("condicao_entrada", { required: true })}
                                        defaultValue={"LIMPO"}
                                        disabled={ehEdicao ? false : true}
                                    >
                                        <option value="LIMPO">Limpo</option>
                                        <option value="SUJO">Sujo</option>
                                        <option value="MUITO_SUJO">Muito Sujo</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label>Porteiro saída:</Form.Label>
                                    <Dropdown className="w-100">
                                        <Dropdown.Toggle className="w-100 text-start" variant="outline-secondary" disabled={ehEdicao}>
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
                usuarios={campoSelecionado === "idResponsavelAutorizacao" ? aprovadores : pessoal}
                onPesquisar={() => {
                    if (campoSelecionado === "idResponsavelAutorizacao") {
                        buscarUsuariosAprovadores(termoPesquisa);
                    } else {
                        buscarPessoal(termoPesquisa);
                    }
                }}
                autoBuscar={autoBuscar}
                onSelecionar={(usuario) => {
                    if (campoSelecionado === "idResponsavel") {
                        setValue("idResponsavel", String(usuario.chapa));
                        setNomeResponsavel(usuario.nome);
                    }

                    if (campoSelecionado === "idResponsavelAutorizacao") {
                        setValue("idResponsavelAutorizacao", String(usuario.chapa));
                        setNomeAutorizador(usuario.nome);
                    }

                    if (campoSelecionado === "idResponsavelEntrada") {
                        setValue("idResponsavelEntrada", String(usuario.chapa));
                        setNomeResponsavelEntrada(usuario.nome);
                    }

                    setModalAberto(false);
                }}
            />

            <GenericToast
                show={toast.show}
                title={toast.title}
                message={toast.message}
                onClose={() => setToast(prev => ({ ...prev, show: false }))}
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
        </Fragment>
    );
}