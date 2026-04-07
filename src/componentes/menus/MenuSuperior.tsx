import React, { useState, useEffect } from "react";
import { Navbar, Container, Image, Dropdown } from "react-bootstrap";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useVisaoControllerMenuSuperior } from "./visaoControllerMenuSuperior";

interface TopbarProps {
    username: string;
    userPhoto: string;
}

const Topbar: React.FC<TopbarProps> = ({ username, userPhoto }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const { informacoesUsuario, logout } = useVisaoControllerMenuSuperior();
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Navbar variant="dark" expand={false} style={{ height: '7vh', backgroundColor: "#ffffff", marginBottom:"10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }} className="px-3">
            <Container fluid className="d-flex justify-content-between align-items-center">
                <Navbar.Brand className={`fw-bold ${isMobile ? "fs-5" : "fs-4"}`} style={{ color: 'black' }}>
                    {`Bem-vindo, ${informacoesUsuario?.nome}`}
                </Navbar.Brand>

                <Dropdown align="end">
                    <div className="d-flex align-items-center">
                        {/* @ts-ignore */}
                        <IoMdNotificationsOutline
                            size={isMobile ? 25 : 35}
                            style={{ marginRight: '5px', cursor: "pointer" }}
                        />
                        <Dropdown.Toggle
                            variant="link"
                            className="d-flex align-items-center text-black m-0 p-0 text-decoration-none"
                            id="dropdown-user"
                        >
                            {!isMobile && (
                                <span className="me-2 fw-bold" style={{ fontSize: isMobile ? 12 : 18 }}>
                                    {username}
                                </span>
                            )}
                            <Image
                                src={userPhoto}
                                roundedCircle
                                width={isMobile ? 40 : 60}
                                height={isMobile ? 40 : 60}
                                alt="Foto do usuário"
                            />
                        </Dropdown.Toggle>
                    </div>

                    <Dropdown.Menu className="w-100">
                        <Dropdown.Item href="#">Perfil</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#">Solicitar suporte</Dropdown.Item>
                        <Dropdown.Item onClick={logout}>Limpar cache</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={logout}>Sair</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Navbar>
    );
};

export default Topbar;