import { Navbar, Container, Offcanvas, Nav, Button, Dropdown, Image } from "react-bootstrap";
import { useVisaoControllerMenuSuperior } from "./visaoControllerMenuSuperior";
import { EPapel } from "../../enum/EPapel";

export default function MenuSuperiorIniciar() {
  const { informacoesUsuario, menuItens, logout, vaiParaIntroducao } = useVisaoControllerMenuSuperior();

  const permissao = (informacoesUsuario?.papel as EPapel) ?? EPapel.PORTEIRO; 
  const menuVisivel = menuItens.filter(item => item.permissoes.includes(permissao));

  return (
    <Navbar expand={false} style={{ height: "100px", marginBottom: '2vh' }}>
      <Container fluid className="justify-content-between align-items-center px-4">
        <Navbar.Brand onClick={vaiParaIntroducao}><img src="/assets/alberflex_titulo.png" alt="Alberflex" height="50" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end">
          <Offcanvas.Header closeButton>
            <div className="d-flex align-items-center">
              <Image
                srcSet="https://img.freepik.com/vetores-premium/icone-de-perfil-de-usuario-em-estilo-plano-ilustracao-em-vetor-avatar-membro-em-fundo-isolado-conceito-de-negocio-de-sinal-de-permissao-humana_157943-15752.jpg?semt=ais_hybrid&w=740&q=80"
                roundedCircle
                width={70}
                height={70}
                alt="Foto do usuário"
                style={{ objectFit: "cover" }}
              />
              <p className="fs-6 mb-0"
                style={{ color: "#5f5e5eff", fontWeight: 'bolder' }}>
                {`Seja bem-vindo, ${informacoesUsuario?.nome}.`}
              </p>
            </div>
          </Offcanvas.Header>

          <Offcanvas.Body
            className="d-flex flex-column justify-content-between"
            style={{ height: "100%" }}
          >
            <Nav className="flex-column">


              {menuVisivel.map((item) => (
                <Nav.Link
                  key={item.label}
                  className="fs-6"
                  style={{ color: "#8a8a8a" }}
                  onClick={item.onClick}
                >
                  {item.label}
                </Nav.Link>
              ))}

              <Dropdown className="py-1">
                <Dropdown.Toggle
                  as="a"
                  className="fs-6"
                  style={{
                    color: "#8a8a8a",
                    cursor: "pointer",
                    textDecoration: "none"
                  }}
                >
                  Ferramentas de trabalho
                </Dropdown.Toggle>

                <Dropdown.Menu >
                  <Dropdown.Item href="http://srv-app-prot.alberflex.corp:8081/" style={{
                    color: "#8a8a8a",
                    cursor: "pointer",
                    textDecoration: "none"
                  }}>
                    TOTVS Protheus
                  </Dropdown.Item>
                  
                  <Dropdown.Item href="http://help.alberflex.com.br:8080/helpdesk/login" style={{
                    color: "#8a8a8a",
                    cursor: "pointer",
                    textDecoration: "none"
                  }}>
                    Helpdesk
                  </Dropdown.Item>
                  <Dropdown.Item href="http://intranet-alberflex.com.br/" style={{
                    color: "#8a8a8a",
                    cursor: "pointer",
                    textDecoration: "none"
                  }}>
                    Intranet Alberflex
                  </Dropdown.Item>

                  <Dropdown.Item href="https://www.alberflex.com.br/" style={{
                    color: "#8a8a8a",
                    cursor: "pointer",
                    textDecoration: "none"
                  }}>
                    Site institucional
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>


            <div>
              <Button className="w-100 bg-success" onClick={logout} style={{ border: "none" }}>
                Sair
              </Button>
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};