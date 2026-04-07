import { Fragment } from "react";
import { Controller } from "react-hook-form";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useVisaoControllerFormularioUsuario } from "./visaoControllerFormularioUsuarios";
import { GenericToast } from "../../../componentes/toast/toast";

export default function FormularioUsuario() {
    const { control, handleSubmit, register, errors, abrirConfirmacaoSalvar, ehEdicao, toast, setToast, } = useVisaoControllerFormularioUsuario();
    const papel = [{ id: "ADMINISTRADOR", papelUsuario: "Administrador" },{ id: "PORTEIRO", papelUsuario: "Porteiro" }, { id: "SUPERVISOR", papelUsuario: "Supervisor" }];
    return (
        <Fragment>
            <Container className="my-4 border rounded-4 bg-light p-4">
                <h4 className="mb-4 text-center">Formulário de porteiros</h4>
                <Form onSubmit={handleSubmit(abrirConfirmacaoSalvar)}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formNomePorteiro">
                                <Form.Label>Nome completo do porteiro:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Informe o nome do porteiro"
                                    disabled={ehEdicao}
                                    {...register("nome", {
                                        required: "O nome é obrigatório.",
                                        minLength: { value: 3, message: "O nome deve ter pelo menos 3 caracteres." },
                                        pattern: { value: /^[A-Za-zÀ-ÿ\s]+$/, message: "O nome deve conter apenas letras." },
                                    })}
                                    isInvalid={!!errors.nome}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.nome?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="formCpfPorteiro">
                                <Form.Label>CPF do porteiro:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="010.024.007-99"
                                    disabled={ehEdicao}
                                    {...register("cpf", !ehEdicao ? {
                                        required: "O CPF é obrigatório.",
                                        pattern: {
                                            value: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
                                            message: "Formato de CPF inválido. Use XXX.XXX.XXX-XX",
                                        },
                                    } : {})}
                                    isInvalid={!!errors.cpf}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.cpf?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formChapaPorteiro">
                                <Form.Label>Chapa do porteiro:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="04850"
                                    disabled={ehEdicao}
                                    {...register("chapa", {
                                        required: "A chapa é obrigatória.",
                                        pattern: { value: /^\d+$/, message: "A chapa deve conter apenas números." },
                                        minLength: { value: 3, message: "A chapa deve ter no mínimo 3 dígitos." },
                                        maxLength: { value: 6, message: "A chapa deve ter no máximo 6 dígitos." },
                                    })}
                                    isInvalid={!!errors.chapa}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.chapa?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="formSenhaPorteiro">
                                <Form.Label>Senha:</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Informe a senha"
                                    {...register("senha", {
                                        required: "A senha é obrigatória.",
                                        minLength: { value: 4, message: "A senha deve ter pelo menos 4 caracteres." },
                                        maxLength: { value: 12, message: "A senha deve ter no máximo 12 caracteres." },
                                        validate: {
                                            hasNumber: v => /\d/.test(v) || "A senha deve conter pelo menos um número.",
                                            hasLetter: v => /[A-Za-z]/.test(v) || "A senha deve conter pelo menos uma letra.",
                                        },
                                    })}
                                    isInvalid={!!errors.senha}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.senha?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={12}>
                            <Controller
                                name="papel"
                                control={control}
                                defaultValue=""
                                rules={{ required: "O perfil de usuário é obrigatório." }}
                                render={({ field, fieldState }) => (
                                    <Form.Group controlId="papel">
                                        <Form.Label>Perfil de usuário:</Form.Label>
                                        <Form.Select {...field} isInvalid={!!fieldState.error}>
                                            <option value="">Selecione</option>
                                            {papel.map((tipo) => (
                                                <option key={tipo.id} value={tipo.id}>
                                                    {tipo.papelUsuario}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {fieldState.error?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                )}
                            />
                        </Col>
                    </Row>
                    <Button variant="success" type="submit" className="w-100 mt-3">Salvar informações</Button>
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
