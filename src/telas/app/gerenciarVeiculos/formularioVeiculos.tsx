import { Fragment } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useVisaoControllerFormularioVeiculo } from "./visaoControllerFormularioVeiculos";
import { GenericToast } from "../../../componentes/toast/toast";
import { Controller } from "react-hook-form";
import { SpinnerComponente } from "../../../componentes/spinner/Spinner";
import { BotaoSalvar, CabecalhoFormulario, Secao, estiloCampo, estiloRotulo } from "../../../componentes/formulario/formulario";

export default function FormularioVeiculo() {
    const {
        toast,
        setToast,
        handleSubmit,
        register,
        errors,
        abrirConfirmacaoSalvar,
        ehEdicao,
        carregando,
        previewImagem,
        setPreviewImagem,
        control
    } = useVisaoControllerFormularioVeiculo();

    return (
        <Fragment>
            <SpinnerComponente estado={carregando} />

            <Container fluid className="p-3 p-md-4">
                <CabecalhoFormulario titulo="Veículo" descricao="Preencha os dados do veículo da frota. A placa não pode ser alterada na edição." />

                <Form onSubmit={handleSubmit(abrirConfirmacaoSalvar)}>
                    <fieldset disabled={carregando}>
                        <Secao titulo="1. Dados do veículo">
                            <Row className="g-4">
                                <Col md={4}>
                                    <Form.Group controlId="formPlaca">
                                        <Form.Label className={estiloRotulo}>Placa</Form.Label>
                                        <Form.Control
                                            type="text"
                                            size="lg"
                                            className={estiloCampo}
                                            placeholder="Ex: ETX-0425"
                                            {...register("placa", { required: "A placa é obrigatória" })}
                                            isInvalid={!!errors.placa}
                                            disabled={ehEdicao}
                                        />
                                        <Form.Control.Feedback type="invalid" className="fs-6">{errors.placa?.message}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group controlId="formModelo">
                                        <Form.Label className={estiloRotulo}>Modelo</Form.Label>
                                        <Form.Control
                                            type="text"
                                            size="lg"
                                            className={estiloCampo}
                                            placeholder="Ex: TRUCK"
                                            {...register("modelo", { required: "O modelo é obrigatório" })}
                                            isInvalid={!!errors.modelo}
                                        />
                                        <Form.Control.Feedback type="invalid" className="fs-6">{errors.modelo?.message}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group controlId="formKmAtual">
                                        <Form.Label className={estiloRotulo}>Quilometragem atual</Form.Label>
                                        <Form.Control
                                            type="number"
                                            size="lg"
                                            className={estiloCampo}
                                            placeholder="Ex: 606138"
                                            {...register("km_atual", {
                                                required: "O KM é obrigatório",
                                                min: { value: 0, message: "O KM deve ser positivo" },
                                            })}
                                            isInvalid={!!errors.km_atual}
                                        />
                                        <Form.Control.Feedback type="invalid" className="fs-6">{errors.km_atual?.message}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Secao>

                        <Secao titulo="2. Foto do veículo">
                            <Form.Group controlId="formImagem">
                                <Form.Label className={estiloRotulo}>Escolha uma imagem</Form.Label>
                                <Controller
                                    name="caminho_imagem_veiculo"
                                    control={control}
                                    render={({ field }) => (
                                        <Form.Control
                                            type="file"
                                            size="lg"
                                            accept="image/*"
                                            className="fs-5 border-2 border-secondary-subtle"
                                            onChange={(e) => {
                                                const target = e.target as HTMLInputElement;
                                                const files = target.files;

                                                field.onChange(files);

                                                if (files && files[0]) {
                                                    const url = URL.createObjectURL(files[0]);
                                                    setPreviewImagem(url);
                                                }
                                            }}
                                        />
                                    )}
                                />
                            </Form.Group>

                            {previewImagem ? (
                                <img
                                    src={previewImagem}
                                    alt="Pré-visualização do veículo"
                                    className="img-fluid w-100 rounded-3 border mt-3"
                                    style={{ maxHeight: "50vh", objectFit: "cover" }}
                                />
                            ) : (
                                <div className="d-flex align-items-center justify-content-center bg-light border border-2 rounded-3 mt-3" style={{ height: 200 }}>
                                    <span className="fs-5 text-muted">Nenhuma imagem selecionada</span>
                                </div>
                            )}
                        </Secao>
                    </fieldset>

                    <BotaoSalvar carregando={carregando} />
                </Form>
            </Container>

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
        </Fragment>
    );
}
