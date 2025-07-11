import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function MenuSuperiorIniciar() {
  return (
    <Navbar expand="md" style={{ height: '100px' }}>
      <Container className="justify-content-between align-items-center">
        <Navbar.Brand href="#home">
          <img
            src="/images/alberflex.png"
            alt="Alberflex"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Nav>
          <Nav.Link href="#home" className="text-gray fs-5 fw-bold">
            CENTRAL ALBERFLEX
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
