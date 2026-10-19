import { Fragment, useEffect } from "react";
import { Form, Row, Col, Container } from "react-bootstrap";
import { BotaoSalvar, CabecalhoFormulario, CampoBusca, Secao, estiloCampo as campo, estiloRotulo as rotulo } from "../../../componentes/formulario/formulario";
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

            <Container fluid className="p-3 p-md-4">
                <CabecalhoFormulario titulo="Solicitação de veículo" descricao="Preencha os campos abaixo. Campos desabilitados são liberados apenas na edição." />

                <Form onSubmit={handleSubmit(abrirConfirmacaoSalvar)}>
                    <fieldset disabled={carregando}>
                        <input type="hidden" {...register("idVeiculo", { required: true })} />
                        <input type="hidden" {...register("idPorteiroSaida", { required: true })} />
                        <input type="hidden" {...register("idPorteiroEntrada")} />
                        <input type="hidden" {...register("idResponsavel", { required: true })} />
                        <input type="hidden" {...register("idResponsavelEntrada", { required: ehEdicao })} />
                        <input type="hidden" {...register("idResponsavelAutorizacao", { required: true })} />

                        <Secao titulo="1. Veículo">
                            <Row className="g-4">
                                <Col md={6}>
                                    <Form.Group controlId="sv-veiculo">
                                        <Form.Label className={rotulo}>Veículo solicitado</Form.Label>
                                        <Form.Select
                                            size="lg"
                                            className={campo}
                                            disabled={ehEdicao}
                                            value={String(watch("idVeiculo") ?? "")}
                                            onChange={(e) => {
                                                const item = veiculo.find(v => String(v.id) === e.target.value);
                                                if (item) setValue("idVeiculo", item.id);
                                            }}
                                        >
                                            <option value="">Selecionar veículo</option>
                                            {veiculo.map(item => <option key={item.id} value={String(item.id)}>{item.placa}</option>)}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="sv-km">
                                        <Form.Label className={rotulo}>Quilometragem final do veículo</Form.Label>
                                        <Form.Control
                                            type="text"
                                            size="lg"
                                            className={campo}
                                            inputMode="numeric"
                                            placeholder={ehEdicao ? "Informe a quilometragem" : "Liberado apenas na edição"}
                                            readOnly={!ehEdicao}
                                            {...register("km_final_veiculo")}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="sv-cond-saida">
                                        <Form.Label className={rotulo}>Condição de saída</Form.Label>
                                        <Form.Select size="lg" className={campo} {...register("condicao_saida", { required: true })} defaultValue="LIMPO">
                                            <option value="LIMPO">Limpo</option>
                                            <option value="SUJO">Sujo</option>
                                            <option value="MUITO_SUJO">Muito sujo</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="sv-cond-entrada">
                                        <Form.Label className={rotulo}>Condição de entrada</Form.Label>
                                        <Form.Select size="lg" className={campo} {...register("condicao_entrada", { required: true })} defaultValue="LIMPO" disabled={!ehEdicao}>
                                            <option value="LIMPO">Limpo</option>
                                            <option value="SUJO">Sujo</option>
                                            <option value="MUITO_SUJO">Muito sujo</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Secao>

                        <Secao titulo="2. Responsáveis">
                            <Row className="g-4">
                                <Col md={6}>
                                    <CampoBusca
                                        texto="Motorista responsável (saída)"
                                        valor={nomeResponsavel}
                                        placeholder="Nenhum motorista selecionado"
                                        onBuscar={() => { setCampoSelecionado("idResponsavel"); setModalAberto(true); }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <CampoBusca
                                        texto="Motorista responsável (entrada)"
                                        valor={nomeResponsavelEntrada}
                                        placeholder={ehEdicao ? "Nenhum motorista selecionado" : "Liberado apenas na edição"}
                                        desabilitado={!ehEdicao}
                                        onBuscar={() => { setCampoSelecionado("idResponsavelEntrada"); setModalAberto(true); }}
                                    />
                                </Col>
                                <Col md={12}>
                                    <CampoBusca
                                        texto="Responsável pela autorização"
                                        valor={nomeAutorizador}
                                        placeholder="Nenhum autorizador selecionado"
                                        onBuscar={() => { setCampoSelecionado("idResponsavelAutorizacao"); setModalAberto(true); }}
                                    />
                                </Col>
                            </Row>
                        </Secao>

                        <Secao titulo="3. Destino">
                            <Row className="g-4">
                                <Col md={6}>
                                    <Form.Group controlId="sv-estado">
                                        <Form.Label className={rotulo}>Estado</Form.Label>
                                        <Form.Select size="lg" className={campo} {...register("destino", { required: true })} value={siglaSelecionada}>
                                            <option value="">{siglaSelecionada ? nomeEstadoSelecionado : "Selecione um estado"}</option>
                                            {estado.map((estadoItem) => <option key={estadoItem.id} value={estadoItem.sigla}>{estadoItem.nome}</option>)}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="sv-cidade">
                                        <Form.Label className={rotulo}>Cidade</Form.Label>
                                        <Form.Select size="lg" className={campo} {...register("localizacao", { required: true })} disabled={!watch("destino")}>
                                            <option value="">{watch("destino") ? "Selecione uma cidade" : "Escolha o estado primeiro"}</option>
                                            {cidades.map((cidadeItem) => <option key={cidadeItem.id} value={cidadeItem.nome}>{cidadeItem.nome}</option>)}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Secao>

                        <Secao titulo="4. Portaria">
                            <Row className="g-4">
                                <Col md={6}>
                                    <Form.Group controlId="sv-porteiro-saida">
                                        <Form.Label className={rotulo}>Porteiro da saída</Form.Label>
                                        <Form.Select
                                            size="lg"
                                            className={campo}
                                            disabled={ehEdicao}
                                            value={String(watch("idPorteiroSaida") ?? "")}
                                            onChange={(e) => {
                                                const item = porteiro.find(p => String(p.id) === e.target.value);
                                                if (item) setValue("idPorteiroSaida", item.id);
                                            }}
                                        >
                                            <option value="">Selecionar porteiro</option>
                                            {porteiro.map(item => <option key={item.id} value={String(item.id)}>{item.nome}</option>)}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="sv-porteiro-entrada">
                                        <Form.Label className={rotulo}>Porteiro da entrada</Form.Label>
                                        <Form.Select
                                            size="lg"
                                            className={campo}
                                            disabled={!ehEdicao}
                                            value={String(watch("idPorteiroEntrada") ?? "")}
                                            onChange={(e) => {
                                                const item = porteiro.find(p => String(p.id) === e.target.value);
                                                if (item) setValue("idPorteiroEntrada", item.id);
                                            }}
                                        >
                                            <option value="">{ehEdicao ? "Selecionar porteiro" : "Liberado apenas na edição"}</option>
                                            {porteiro.map(item => <option key={item.id} value={String(item.id)}>{item.nome}</option>)}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Secao>
                    </fieldset>

                    <BotaoSalvar carregando={carregando} texto="Enviar informações" />
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
