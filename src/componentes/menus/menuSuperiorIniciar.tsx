import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function MenuSuperiorIniciar() {
  return (
    <Navbar expand="lg" style={{ height: '100px' }}>
      <Container className="justify-content-between align-items-center">
        <Navbar.Brand href="#home">
          <img
            src="/images/alberflex.png"
            alt="Alberflex"
            height="50"
            
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" className="text-gray fs-5 fw-bold">
              Central Alberflex.
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
