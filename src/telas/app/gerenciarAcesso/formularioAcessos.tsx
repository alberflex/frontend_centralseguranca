import { Fragment, useEffect } from "react";
import { Form, Button, Row, Col, Container, InputGroup } from "react-bootstrap";
import { useVisaoControllerFormularioAcesso } from "./visaoControllerFormularioAcessos";
import { GenericToast } from "../../../componentes/toast/toast";
import { SpinnerComponente } from "../../../componentes/spinner/Spinner";
import { Controller } from "react-hook-form";
import ModalBuscarUsuario from "../../../componentes/modal/modal";
import Webcam from "react-webcam";
import { BotaoSalvar, CabecalhoFormulario, CampoBusca, Secao, estiloCampo, estiloRotulo } from "../../../componentes/formulario/formulario";

const estiloImagem = { width: "100%", height: "100%", objectFit: "cover" as const };

export default function FormularioAcesso() {
    const {
        register, handleSubmit, formatarCPF, buscarVisitantePorCPF,
        abrirConfirmacaoSalvar, setValue, modalAberto, setModalAberto, termoPesquisa, setCampoSelecionado,
        campoSelecionado, pessoal, buscarPessoal, ehEdicao, toast, setToast,
        abrirCamera, cameraAberta, foto, tirarFoto, webcamRef, watch, camposBloqueados, porteiros, buscarPorteiros, carregando,
        control, setTermoPesquisa
    } = useVisaoControllerFormularioAcesso();

    useEffect(() => { buscarPessoal(); buscarPorteiros(); }, []);

    return (
        <Fragment>
            <SpinnerComponente estado={carregando} />

            <Container fluid className="p-3 p-md-4">
                <CabecalhoFormulario titulo="Solicitação de acesso" descricao="Informe o CPF do visitante e clique em Buscar. Campos desabilitados são liberados apenas na edição." />

                <Form onSubmit={handleSubmit(abrirConfirmacaoSalvar)}>
                    <fieldset disabled={carregando}>
                        <input type="hidden" {...register("responsavel")} />

                        <Secao titulo="1. Visitante">
                            <Row className="g-4">
                                <Col md={12}>
                                    <Form.Group controlId="ac-cpf">
                                        <Form.Label className={estiloRotulo}>CPF do visitante</Form.Label>
                                        <InputGroup size="lg">
                                            <Form.Control
                                                type="text"
                                                inputMode="numeric"
                                                className={estiloCampo}
                                                placeholder="000.000.000-00"
                                                disabled={ehEdicao}
                                                {...register("cpf")}
                                                onChange={(e) => setValue("cpf", formatarCPF(e.target.value))}
                                            />
                                            <Button variant="primary" className="px-4 fs-5 fw-semibold" onClick={buscarVisitantePorCPF} disabled={ehEdicao}>Buscar</Button>
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="ac-nome">
                                        <Form.Label className={estiloRotulo}>Nome do visitante</Form.Label>
                                        <Form.Control size="lg" className={estiloCampo} {...register("nome")} disabled={camposBloqueados} />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="ac-empresa">
                                        <Form.Label className={estiloRotulo}>Empresa</Form.Label>
                                        <Form.Control size="lg" className={estiloCampo} {...register("empresa")} disabled={camposBloqueados} />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Secao>

                        <Secao titulo="2. Foto do visitante">
                            <div
                                className="d-flex align-items-center justify-content-center overflow-hidden bg-light border border-2 rounded-3 mb-3 mx-auto"
                                style={{ width: "100%", maxWidth: 640, height: 400 }}
                            >
                                {cameraAberta ? (
                                    <Webcam ref={webcamRef} audio={false} screenshotFormat="image/jpeg" style={estiloImagem} videoConstraints={{ facingMode: "user" }} />
                                ) : foto ? (
                                    <img src={foto} alt="Foto capturada" style={estiloImagem} />
                                ) : watch("caminho_foto_visitante") ? (
                                    <img src={watch("caminho_foto_visitante") as string} alt="Foto do visitante" style={estiloImagem} />
                                ) : (
                                    <span className="fs-5 text-muted">Nenhuma imagem</span>
                                )}
                            </div>
                            <Row className="g-3 mx-auto" style={{ maxWidth: 640 }}>
                                <Col xs={12} md={6}>
                                    <Button variant="primary" size="lg" className="w-100 py-3 fs-5 fw-semibold" onClick={abrirCamera} disabled={ehEdicao}>Abrir câmera</Button>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Button variant="success" size="lg" className="w-100 py-3 fs-5 fw-semibold" onClick={tirarFoto} disabled={!cameraAberta}>Tirar foto</Button>
                                </Col>
                            </Row>
                        </Secao>

                        <Secao titulo="3. Visita">
                            <Row className="g-4">
                                <Col md={6}>
                                    <Form.Group controlId="ac-placa">
                                        <Form.Label className={estiloRotulo}>Placa do veículo</Form.Label>
                                        <Form.Control type="text" size="lg" className={estiloCampo} placeholder="Exemplo: ABC-1234" {...register("placa")} />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="ac-cartao">
                                        <Form.Label className={estiloRotulo}>Número do cartão</Form.Label>
                                        <Controller
                                            name="numeroCartao"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <Form.Select size="lg" className={estiloCampo} {...field}>
                                                    <option value="">Selecione</option>
                                                    <option value="01">001</option>
                                                    <option value="02">002</option>
                                                    <option value="03">003</option>
                                                    <option value="04">004</option>
                                                    <option value="05">005</option>
                                                </Form.Select>
                                            )}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group controlId="ac-motivo">
                                        <Form.Label className={estiloRotulo}>Motivo da visita</Form.Label>
                                        <Form.Control as="textarea" rows={4} className={estiloCampo} placeholder="Exemplo: Entrega de materiais da empresa de metal" {...register("motivo")} />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Secao>

                        <Secao titulo="4. Responsáveis">
                            <Row className="g-4">
                                <Col md={12}>
                                    <CampoBusca
                                        texto="Responsável pelo visitante"
                                        valor={watch("responsavel") as string}
                                        placeholder="Nenhum responsável selecionado"
                                        onBuscar={() => { setCampoSelecionado("responsavel"); setModalAberto(true); }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="ac-porteiro-entrada">
                                        <Form.Label className={estiloRotulo}>Liberação de entrada (porteiro)</Form.Label>
                                        <Form.Select
                                            size="lg"
                                            className={estiloCampo}
                                            disabled={ehEdicao}
                                            value={String(watch("porteiroEntrada") ?? "")}
                                            onChange={(e) => {
                                                const item = porteiros.find(p => String(p.id) === e.target.value);
                                                if (item) setValue("porteiroEntrada", item.id);
                                            }}
                                        >
                                            <option value="">Selecionar porteiro</option>
                                            {porteiros.map(item => <option key={item.id} value={String(item.id)}>{item.nome}</option>)}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="ac-porteiro-saida">
                                        <Form.Label className={estiloRotulo}>Liberação de saída (porteiro)</Form.Label>
                                        <Form.Select
                                            size="lg"
                                            className={estiloCampo}
                                            disabled={!ehEdicao}
                                            value={String(watch("porteiroSaida") ?? "")}
                                            onChange={(e) => {
                                                const item = porteiros.find(p => String(p.id) === e.target.value);
                                                if (item) setValue("porteiroSaida", item.id);
                                            }}
                                        >
                                            <option value="">{ehEdicao ? "Selecionar porteiro" : "Liberado apenas na edição"}</option>
                                            {porteiros.map(item => <option key={item.id} value={String(item.id)}>{item.nome}</option>)}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Secao>
                    </fieldset>

                    <BotaoSalvar carregando={carregando} />
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
                    if (campoSelecionado === "responsavel") {
                        setValue("responsavel", String(usuario.chapa));
                    }
                    setModalAberto(false);
                }}
            />
            <GenericToast
                show={toast.show}
                title={toast.title}
                message={toast.message}
                onClose={() => setToast({ ...toast, show: false })}
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
