import { Container, Form, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuSuperiorIniciar from '../componentes/menus/menuSuperiorIniciar';

export default function TelaLogin() {
  const navigate = useNavigate();

  const vaiParaControleAcesso = () => {
    navigate('/inicio');
  };

  return (
    <Container className="mt-5">
      <MenuSuperiorIniciar />
      <h1 style={{ color: '#9c9797' }} className="text-center mb-4">
        CENTRAL DE SEGURANÇA ALBERFLEX.
      </h1>
      <div className="flex-column flex-md-row align-items-center justify-content-center gap-5">
        <div className="text-center w-100 w-md-50">
          <Image
            src="/images/alberflex.png"
            alt="Logo Alberflex"
            fluid
            style={{ maxWidth: '300px' }}
          />
        </div>

        <div className="mx-auto w-100 w-sm-75" style={{ maxWidth: '500px' }}>
          <Form onSubmit={(e) => { e.preventDefault(); vaiParaControleAcesso(); }}>
            <Form.Group className="mt-3 mb-3" controlId="formEmail">
              <Form.Control
                style={{ height: '50px' }}
                type="email"
                placeholder="Digite seu e-mail:"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Control
                style={{ height: '50px' }}
                type="password"
                placeholder="Digite sua senha: "
              />
            </Form.Group>

            <Button
              variant="success"
              type="submit"
              className="w-100"
              style={{ height: '50px' }}
              onClick={vaiParaControleAcesso}
            >
              Entrar
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
}