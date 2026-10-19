import { Fragment } from "react";
import { Controller } from "react-hook-form";
import { Container, Form } from "react-bootstrap";
import { useVisaoControllerFormularioPontos } from "./visaoControllerFormularioPontos";
import { GenericToast } from "../../../componentes/toast/toast";
import { SpinnerComponente } from "../../../componentes/spinner/Spinner";
import { BotaoSalvar, CabecalhoFormulario, Secao, estiloCampo, estiloRotulo } from "../../../componentes/formulario/formulario";

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
      <SpinnerComponente estado={carregando} />

      <Container fluid className="p-3 p-md-4">
        <CabecalhoFormulario
          titulo="Controle de ponto"
          descricao={ehEdicao ? "Confirme o fechamento do ponto do colaborador." : "Selecione o colaborador para abrir o ponto."}
        />

        <Form onSubmit={handleSubmit(abrirConfirmacaoSalvar)}>
          <fieldset disabled={carregando}>
            <Secao titulo="1. Colaborador">
              <Form.Group controlId="usuarioPontoSelect">
                <Form.Label className={estiloRotulo}>Usuário</Form.Label>
                <Controller
                  name="chapa"
                  control={control}
                  rules={{ required: "Selecione um usuário" }}
                  render={({ field }) => (
                    <Form.Select size="lg" className={estiloCampo} {...field} isInvalid={!!errors.chapa}>
                      <option value="">Selecione o usuário</option>
                      {usuariosPontos.map((usuario) => (
                        <option key={usuario.chapa} value={usuario.chapa}>{usuario.nomeCompleto}</option>
                      ))}
                    </Form.Select>
                  )}
                />
                <Form.Control.Feedback type="invalid" className="fs-6">{errors.chapa?.message}</Form.Control.Feedback>
              </Form.Group>
            </Secao>
          </fieldset>

          <BotaoSalvar carregando={carregando} texto={ehEdicao ? "Confirmar fechamento do ponto" : "Confirmar cadastro do ponto"} />
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
