import { Fragment } from "react";
import { Controller } from "react-hook-form";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useVisaoControllerFormularioPontos } from "./visaoControllerFormularioPontos";
import { GenericToast } from "../../../componentes/toast/toast";
import { SpinnerComponente } from "../../../componentes/spinner/Spinner";
import MenuSuperiorIniciar from "../../../componentes/menus/menuSuperiorIniciar";

export default function FormularioPontos() {
  const {
    setToast,
    abrirConfirmacaoSalvar,
    handleSubmit,
    errors,
    ehEdicao,
    control,
    usuariosPontos,
    toast,
    carregando
  } = useVisaoControllerFormularioPontos();

  return (
    <Fragment>
      <MenuSuperiorIniciar />

      <SpinnerComponente
        estado={carregando}
      />

      <Container className="my-4 border rounded-4 bg-light p-4">
        <h4 className="mb-4 text-center">Controle de Ponto</h4>

        <Form onSubmit={handleSubmit(abrirConfirmacaoSalvar)}>

          <fieldset disabled={carregando}>

            <Form.Group controlId="usuarioPontoSelect" className="mb-3">
              <Form.Label>Selecione o usuário:</Form.Label>

              <Controller
                name="chapa"
                control={control}
                rules={{ required: "Selecione um usuário" }}
                render={({ field }) => (
                  <Form.Select {...field} isInvalid={!!errors.chapa}>
                    <option value="">Selecione o usuário</option>

                    {usuariosPontos.map((usuario) => (
                      <option key={usuario.chapa} value={usuario.chapa}>
                        {usuario.nomeCompleto}
                      </option>
                    ))}

                  </Form.Select>
                )}
              />

              <Form.Control.Feedback type="invalid">
                {errors.chapa?.message}
              </Form.Control.Feedback>
            </Form.Group>

          </fieldset>

          <Row className="mt-4">
            <Col className="text-center">

              <Button
                type="submit"
                variant="success"
                className="w-100"
                disabled={carregando}
              >
                {carregando ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Enviando...
                  </>
                ) : (
                  ehEdicao
                    ? "Confirmar fechamento do ponto"
                    : "Confirmar cadastro do ponto"
                )}
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>

      <GenericToast
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        title={toast.title}
        message={toast.message}
        buttons={[
          { label: "Confirmar", onClick: toast.onConfirm, variant: "success" },
          { label: "Cancelar", onClick: () => setToast({ ...toast, show: false }), variant: "danger" }
        ]}
      />

    </Fragment>
  );
}