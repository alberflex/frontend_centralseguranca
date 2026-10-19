import React, { useState, useEffect } from "react";
import { Navbar, Container, Dropdown } from "react-bootstrap";
import { useVisaoControllerMenuSuperior } from "./visaoControllerMenuSuperior";

interface TopbarProps {
    username: string;
    userPhoto?: string;
}

const Topbar: React.FC<TopbarProps> = ({ username }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const { logout } = useVisaoControllerMenuSuperior();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const getInitials = (nome?: string) => {
        if (!nome) return "X";
        return nome.trim().substring(0, 2).toUpperCase();
    };

    return (
        <Navbar expand={false} style={{ minHeight: "60px", height: "auto", backgroundColor: "#ffffff" }} className="shadow-sm">
            <Container fluid className="d-flex justify-content-between align-items-center">
                <Navbar.Brand className="mx-2 mx-md-4 text-truncate" style={{ color: "black" }}>
                    Central de segurança
                </Navbar.Brand>

                <Dropdown align="end">
                    <div className="d-flex align-items-center mx-2 mx-md-4">
                        <Dropdown.Toggle
                            variant="link"
                            className="d-flex align-items-center text-black m-0 p-0 text-decoration-none"
                            id="dropdown-user"
                        >
                            {!isMobile && (
                                <span className="me-2 fw-bold" style={{ fontSize: 18 }}>
                                    Bem-vindo, {username?.toUpperCase()}
                                </span>
                            )}
                            <div
                                className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white fw-bold"
                                style={{
                                    width: isMobile ? 40 : 60,
                                    height: isMobile ? 40 : 60,
                                    fontSize: isMobile ? 14 : 18,
                                    userSelect: "none"
                                }}
                            >
                                {getInitials(username)}
                            </div>
                        </Dropdown.Toggle>
                    </div>

                    <Dropdown.Menu>
                        <Dropdown.Item href="http://help.alberflex.com.br:8080/helpdesk/login">Solicitar suporte</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={logout}>Sair</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Navbar>
    );
};

export default Topbar;
