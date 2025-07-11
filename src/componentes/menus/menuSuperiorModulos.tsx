import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap';
import { BsFillSendCheckFill, BsCarFront, BsClock } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const IconeRecebimento = BsFillSendCheckFill as unknown as React.FC<{ size?: number, className?: string; }>;
const IconeCarro = BsCarFront as unknown as React.FC<{ size?: number, className?: string; }>;
const IconeRelogio = BsClock as unknown as React.FC<{ size?: number, className?: string; }>;

export default function MenuSuperiorModulos() {
    const navigate = useNavigate();

    const vaiParaControleVeiculo = () => {
        navigate('/controleVeiculos');
    };

    return (
        <Navbar expand="lg" className='my-3 bg-light rounded-3'>
            <Container fluid>
                <Navbar.Brand href="#" className='fw-bold'>Alberflex.</Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">Ações</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href="#" className="d-flex align-items-center" onClick={vaiParaControleVeiculo}>
                                <IconeCarro size={30} className="me-2" />
                                Controle de frota.
                            </Nav.Link>
                            <Nav.Link href="#" className="d-flex align-items-center">
                                <IconeRelogio size={30} className="me-2" />
                                Controle de entrada.
                            </Nav.Link>
                            <Nav.Link href="#" className="d-flex align-items-center">
                                <IconeRecebimento size={30} className="me-2" />
                                Controle de recebimento.
                            </Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}