import { Fragment } from "react";
import { Controller } from "react-hook-form";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useVisaoControllerFormularioUsuario } from "./visaoControllerFormularioUsuarios";
import { GenericToast } from "../../../componentes/toast/toast";
import { BotaoSalvar, CabecalhoFormulario, Secao, estiloCampo, estiloRotulo } from "../../../componentes/formulario/formulario";

const papel = [{ id: "ADMINISTRADOR", papelUsuario: "Administrador" }, { id: "PORTEIRO", papelUsuario: "Porteiro" }, { id: "SUPERVISOR", papelUsuario: "Supervisor" }];

export default function FormularioUsuario() {
    const { control, handleSubmit, register, errors, abrirConfirmacaoSalvar, ehEdicao, toast, setToast, } = useVisaoControllerFormularioUsuario();

    return (
        <Fragment>
            <Container fluid className="p-3 p-md-4">
                <CabecalhoFormulario titulo="Usuário" descricao="Preencha os dados de acesso do usuário. Nome, CPF e chapa não podem ser alterados na edição." />

                <Form onSubmit={handleSubmit(abrirConfirmacaoSalvar)}>
                    <Secao titulo="1. Dados pessoais">
                        <Row className="g-4">
                            <Col md={6}>
                                <Form.Group controlId="formNomePorteiro">
                                    <Form.Label className={estiloRotulo}>Nome completo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        size="lg"
                                        className={estiloCampo}
                                        placeholder="Informe o nome completo"
                                        disabled={ehEdicao}
                                        {...register("nome", {
                                            required: "O nome é obrigatório.",
                                            minLength: { value: 3, message: "O nome deve ter pelo menos 3 caracteres." },
                                            pattern: { value: /^[A-Za-zÀ-ÿ\s]+$/, message: "O nome deve conter apenas letras." },
                                        })}
                                        isInvalid={!!errors.nome}
                                    />
                                    <Form.Control.Feedback type="invalid" className="fs-6">{errors.nome?.message}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formCpfPorteiro">
                                    <Form.Label className={estiloRotulo}>CPF</Form.Label>
                                    <Form.Control
                                        type="text"
                                        size="lg"
                                        inputMode="numeric"
                                        className={estiloCampo}
                                        placeholder="000.000.000-00"
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
                                    <Form.Control.Feedback type="invalid" className="fs-6">{errors.cpf?.message}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Secao>

                    <Secao titulo="2. Acesso ao sistema">
                        <Row className="g-4">
                            <Col md={6}>
                                <Form.Group controlId="formChapaPorteiro">
                                    <Form.Label className={estiloRotulo}>Chapa</Form.Label>
                                    <Form.Control
                                        type="text"
                                        size="lg"
                                        inputMode="numeric"
                                        className={estiloCampo}
                                        placeholder="Somente números"
                                        disabled={ehEdicao}
                                        {...register("chapa", {
                                            required: "A chapa é obrigatória.",
                                            pattern: { value: /^\d+$/, message: "A chapa deve conter apenas números." },
                                            minLength: { value: 3, message: "A chapa deve ter no mínimo 3 dígitos." },
                                            maxLength: { value: 6, message: "A chapa deve ter no máximo 6 dígitos." },
                                        })}
                                        isInvalid={!!errors.chapa}
                                    />
                                    <Form.Control.Feedback type="invalid" className="fs-6">{errors.chapa?.message}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formSenhaPorteiro">
                                    <Form.Label className={estiloRotulo}>Senha</Form.Label>
                                    <Form.Control
                                        type="password"
                                        size="lg"
                                        className={estiloCampo}
                                        placeholder="Letras e números, de 4 a 12 caracteres"
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
                                    <Form.Control.Feedback type="invalid" className="fs-6">{errors.senha?.message}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Controller
                                    name="papel"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: "O perfil de usuário é obrigatório." }}
                                    render={({ field, fieldState }) => (
                                        <Form.Group controlId="papel">
                                            <Form.Label className={estiloRotulo}>Perfil de usuário</Form.Label>
                                            <Form.Select size="lg" className={estiloCampo} {...field} isInvalid={!!fieldState.error}>
                                                <option value="">Selecione</option>
                                                {papel.map((tipo) => <option key={tipo.id} value={tipo.id}>{tipo.papelUsuario}</option>)}
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid" className="fs-6">{fieldState.error?.message}</Form.Control.Feedback>
                                        </Form.Group>
                                    )}
                                />
                            </Col>
                        </Row>
                    </Secao>

                    <BotaoSalvar />
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
