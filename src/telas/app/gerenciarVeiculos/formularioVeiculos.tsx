import { Fragment } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useVisaoControllerFormularioVeiculo } from "./visaoControllerFormularioVeiculos";
import { GenericToast } from "../../../componentes/toast/toast";
import { Controller } from "react-hook-form";
import MenuSuperiorIniciar from "../../../componentes/menus/menuSuperiorIniciar";

export default function FormularioVeiculo() {
    const { toast,
        setToast,
        handleSubmit,
        register,
        errors,
        abrirConfirmacaoSalvar,
        editarObjeto,
        ehEdicao,
        carregando,
        setCarregando,
        previewImagem,
        setPreviewImagem, control
    } = useVisaoControllerFormularioVeiculo();

    return (
        <Fragment>
            <MenuSuperiorIniciar />
            <Container className="my-4 border rounded-4 bg-light p-4">
                <h4 className="mb-4 text-center">Formulário de veículo</h4>
                <Form onSubmit={handleSubmit(abrirConfirmacaoSalvar)}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formPlaca">
                                <Form.Label>Placa do veículo:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ex: ETX-0425"
                                    {...register("placa", { required: "A placa é obrigatória" })}
                                    isInvalid={!!errors.placa}
                                    disabled={ehEdicao}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.placa?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="formModelo">
                                <Form.Label>Modelo:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ex: TRUCK"
                                    {...register("modelo", { required: "O modelo é obrigatório" })}
                                    isInvalid={!!errors.modelo}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.modelo?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formKmAtual">
                                <Form.Label>KM Atual:</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ex: 606138"
                                    {...register("km_atual", {
                                        required: "O KM é obrigatório",
                                        min: { value: 0, message: "O KM deve ser positivo" },
                                    })}
                                    isInvalid={!!errors.km_atual}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.km_atual?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Label>Imagem do veículo:</Form.Label>
                            <Controller
                                name="caminho_imagem_veiculo"
                                control={control}
                                render={({ field }) => (
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
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
                        </Col>
                        <Col md={12}>
                            {previewImagem && (
                                <div className="mt-3">
                                    <img
                                        src={previewImagem}
                                        alt="Preview do veículo"
                                        className="img-fluid w-100 rounded shadow"
                                        style={{
                                            height: "50vh",
                                            objectFit: "cover"
                                        }}
                                    />
                                </div>
                            )}
                        </Col>
                    </Row>

                    <Button type="submit" variant="success" className="w-100 mb-2" disabled={carregando}>
                        {carregando ? (<><Spinner animation="border" size="sm" className="me-2" />Enviando...</>) : ("Salvar informações")}
                    </Button>
                </Form>
            </Container>

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

        </Fragment>
    );
}
