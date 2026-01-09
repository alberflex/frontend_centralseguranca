import { Fragment, useEffect, useRef, useState } from "react";
import { Form, Button, Row, Col, Container, Card, Dropdown } from "react-bootstrap";
import { useVisaoControllerFormularioAcesso } from "./visaoControllerFormularioAcessos";
import { GenericToast } from "../../../componentes/toast/toast";
import SignatureCanvas from "react-signature-canvas";
import MenuSuperiorIniciar from "../../../componentes/menus/menuSuperiorIniciar";
import ModalBuscarUsuario from "../../../componentes/modal/modal";
import Webcam from "react-webcam";

export default function FormularioAcesso() {
    const {
        register, handleSubmit, formatarCPF, buscarVisitantePorCPF,
        abrirConfirmacaoSalvar, setValue, modalAberto, setModalAberto, termoPesquisa, setCampoSelecionado,
        setTermoPesquisa, campoSelecionado, pessoal, buscarPessoal, ehEdicao, toast, setToast,
        abrirCamera, cameraAberta, foto, tirarFoto, webcamRef, watch, camposBloqueados, porteiros, buscarPorteiros
    } = useVisaoControllerFormularioAcesso();

    useEffect(() => { buscarPessoal(); buscarPorteiros(); }, []);

    const sigRef = useRef<SignatureCanvas>(null);
    const salvarAssinatura = () => {
        if (!sigRef.current) return;

        if (sigRef.current.isEmpty()) {
            setValue("caminho_imagem_assinatura", null);
        } else {
            const assinaturaBase64 = sigRef.current.toDataURL();
            setValue("caminho_imagem_assinatura", assinaturaBase64);
        }
    };
    const assinatura = watch("caminho_imagem_assinatura");

    return (
        <Fragment>
            <MenuSuperiorIniciar />
            <Container className="my-4 border rounded-4 bg-light p-4">
                <h4 className="text-center mb-4">Solicitação de acesso</h4>

                <Form onSubmit={handleSubmit(abrirConfirmacaoSalvar)}>
                    <Row className="mb-3">
                        <Col md={9}>
                            <Form.Label>CPF do visitante:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="000.000.000-00"
                                disabled={ehEdicao ? true : false}
                                {...register("cpf")}
                                onChange={(e) =>
                                    setValue("cpf", formatarCPF(e.target.value))
                                }
                            />
                        </Col>
                        <Col md={3} className="d-flex align-items-end">
                            <Button className="w-100" onClick={buscarVisitantePorCPF} disabled={ehEdicao ? true : false}>
                                Buscar
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Label>Nome do visitante:</Form.Label>
                            <Form.Control
                                {...register("nome")}
                                disabled={camposBloqueados}
                            />

                        </Col>

                        <Col md={6}>
                            <Form.Label>Empresa:</Form.Label>
                            <Form.Control
                                {...register("empresa")}
                                disabled={camposBloqueados}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Label>Imagem do visitante:</Form.Label>
                            <div style={{ width: "100%", height: "220px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", backgroundColor: "#f8f9fa", marginBottom: "15px", borderStyle: 'solid', borderWidth: '0.1px', borderColor: '#e0e0e0ff' }} >
                                {cameraAberta ? (
                                    <Webcam
                                        ref={webcamRef}
                                        audio={false}
                                        screenshotFormat="image/jpeg"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        videoConstraints={{ facingMode: "user" }}
                                    />
                                ) : foto ? (
                                    <img
                                        src={foto}
                                        alt="Foto capturada"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                ) : watch("caminho_foto_visitante") ? (
                                    <img
                                        src={watch("caminho_foto_visitante") as string}
                                        alt="Foto do visitante"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                ) : (
                                    <span className="text-muted">Nenhuma imagem</span>
                                )}
                            </div>

                            <Row className="g-2">
                                <Col><Button variant="primary" className="w-100" onClick={abrirCamera} disabled={ehEdicao ? true : false}>Abrir câmera</Button></Col>
                                <Button
                                    type="button"
                                    variant="success"
                                    className="w-100"
                                    onClick={tirarFoto}
                                    disabled={!cameraAberta}

                                >
                                    Tirar foto
                                </Button>
                            </Row>
                        </Col>

                        <Col md={6}>
                            <Form.Label>Assinatura:</Form.Label>

                            {ehEdicao ? (
                                typeof assinatura === "string" && assinatura.trim() !== "" ? (
                                    <div
                                        className="border rounded d-flex align-items-center justify-content-center"
                                        style={{ height: "175px", backgroundColor: "#fff" }}
                                    >
                                        <img
                                            src={assinatura}
                                            alt="Assinatura do visitante"
                                            style={{
                                                maxWidth: "100%",
                                                maxHeight: "100%",
                                                objectFit: "contain",
                                                pointerEvents: "none"
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className="border rounded d-flex align-items-center justify-content-center text-muted"
                                        style={{ height: "175px", backgroundColor: "#f8f9fa" }}
                                    >
                                        Assinatura não disponível
                                    </div>
                                )
                            ) : (
                                <SignatureCanvas
                                    ref={sigRef}
                                    penColor="black"
                                    canvasProps={{
                                        width: 500,
                                        height: 175,
                                        className: "border rounded w-100"
                                    }}
                                />
                            )}

                            <Button
                                variant="primary"
                                className="w-100 mt-2"
                                disabled={ehEdicao}
                                onClick={() => {
                                    sigRef.current?.clear();
                                    setValue("caminho_imagem_assinatura", null);
                                }}
                            >
                                Limpar assinatura
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Label>Placa do veículo:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Exemplo: ABC-1234"
                                {...register("placa")}
                            />
                        </Col>
                        <Col md={6}>
                            <Form.Label>Número do cartão:</Form.Label>
                            <Form.Select {...register("numeroCartao")}>
                                <option value="">Selecione</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="1">4</option>
                                <option value="2">5</option>
                            </Form.Select>
                        </Col>

                    </Row>

                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Label>Motivo da visita:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                type="text"
                                placeholder="Exemplo: Entrega de materiais da empresa de metal"
                                {...register("motivo")}
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3 align-items-end">
                        <Col md={9}>
                            <Form.Label>Responsável pelo visitante:</Form.Label>
                            <Form.Control {...register("responsavel")} readOnly={true} disabled={true} />
                        </Col>
                        <Col md={3}>
                            <Button
                                className="w-100"
                                variant="primary"
                                onClick={() => {
                                    setCampoSelecionado("responsavel");
                                    setModalAberto(true);
                                }}
                            >
                                Buscar
                            </Button>
                        </Col>
                    </Row>

                    <Row className="mb-3 align-items-end">
                        <Col>
                            <Form.Label>Responsável pela liberação de entrada:</Form.Label>
                            <Form.Group>
                                <Dropdown className="w-100">
                                    <Dropdown.Toggle
                                        className="w-100 text-start"
                                        variant="outline-secondary"
                                        disabled={ehEdicao ? true : false}
                                    >
                                        {porteiros.find(p => p.id === watch("porteiroEntrada"))?.nome
                                            || "Selecionar porteiro"}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="w-100">
                                        {porteiros.map(item => (
                                            <Dropdown.Item
                                                key={item.id}
                                                onClick={() => setValue("porteiroEntrada", item.id)}
                                            >
                                                {item.nome}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3 align-items-end">
                        <Col >
                            <Form.Label>Responsável pela liberação de saída:</Form.Label>
                            <Dropdown className="w-100">
                                <Dropdown.Toggle
                                    className="w-100 text-start"
                                    variant="outline-secondary"
                                    disabled={ehEdicao ? false : true}
                                >
                                    {porteiros.find(p => p.id === watch("porteiroSaida"))?.nome
                                        || "Selecionar porteiro"}
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="w-100">
                                    {porteiros.map(item => (
                                        <Dropdown.Item
                                            key={item.id}
                                            onClick={() => setValue("porteiroSaida", item.id)}
                                        >
                                            {item.nome}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>

                    <Button
                        type="submit"
                        variant="success"
                        className="w-100"
                        onClick={salvarAssinatura}
                    >
                        Salvar informações
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
                buttons={[
                    { label: "Confirmar", variant: "success", onClick: toast.onConfirm },
                    { label: "Cancelar", variant: "danger", onClick: () => setToast({ ...toast, show: false }) }
                ]}
            />
        </Fragment>
    );

}
