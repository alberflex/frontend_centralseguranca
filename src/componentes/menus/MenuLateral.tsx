import React, { useState, useEffect, JSX } from "react";
import { Nav, Button } from "react-bootstrap";
import { LuSquareArrowLeft, LuSquareArrowRight } from "react-icons/lu";
import { useVisaoControllerMenuLateral } from "../menus/visaoControllerMenuLateral";
import { useAutenticacao } from "../../contextos/useAutenticacao";
import { EPapel } from "../../enum/EPapel";

interface SidebarProps {
    logoSrc: string;
}

const Sidebar: React.FC<SidebarProps> = ({ logoSrc }) => {
    const [open, setOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const { informacoesUsuario, menuItens, logout } = useVisaoControllerMenuLateral();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const papel = informacoesUsuario?.papel as EPapel;
    const menuFiltrado = papel ? menuItens.filter(item => item.permissoes.includes(papel)) : [];
    const renderSidebar = () => (
        <div
            className="d-flex flex-column text-white"
            style={{
                width: open ? 320 : 100,
                height: "100vh",
                transition: "width 0.3s",
                justifyContent: "space-between",
                backgroundColor: "#1b0644",
                position: "sticky",
                top: 0
            }}
        >
            <Nav
                className="flex-column mt-3 d-flex"
                style={{ alignItems: open ? "flex-start" : "center" }}
            >
                {menuFiltrado.map((item, idx) => (
                    <Nav.Link
                        key={idx}
                        as="div"
                        className="text-white d-flex align-items-center p-3 w-100"
                        style={{
                            justifyContent: open ? "flex-start" : "center",
                            cursor: "pointer",
                            transition: "background-color 0.3s ease"
                        }}
                        onClick={item.onClick}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "rgb(61, 58, 236)")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "transparent")
                        }
                    >
                        <div
                            style={{
                                width: 80,
                                display: "flex",
                                justifyContent: "center"
                            }}
                        >
                            {item.icon}
                        </div>

                        {open && <span className="fs-6">{item.label}</span>}
                    </Nav.Link>
                ))}
            </Nav>

            <div
                className="d-flex align-items-center border-secondary p-3"
                style={{ justifyContent: open ? "space-between" : "center" }}
            >
                {open && (
                    <img
                        src={logoSrc}
                        alt="Logo"
                        style={{ maxHeight: 50, margin: "auto" }}
                    />
                )}

                <Button
                    variant="link"
                    className="text-white m-0 p-0"
                    onClick={() => setOpen(!open)}
                >
                    {open ? (
                        // @ts-ignore
                        <LuSquareArrowLeft size={35} />
                    ) : (
                        // @ts-ignore
                        <LuSquareArrowRight size={35} />
                    )}
                </Button>
            </div>
        </div>
    );

    const renderBottomNav = () => (
        <div
            className="d-flex overflow-auto text-white"
            style={{
                position: "fixed",
                bottom: 0,
                width: "100%",
                backgroundColor: "#1b0644",
                padding: "0.5rem 0",
                zIndex: 1000
            }}
        >
            {menuFiltrado.map((item, idx) => (
                <Nav.Link
                    key={idx}
                    as="div"
                    className="d-flex flex-column align-items-center mx-2"
                    onClick={item.onClick}
                    style={{ cursor: "pointer", minWidth: 60 }}
                >
                    {React.cloneElement(item.icon, { size: 25 })}
                    <div style={{ fontSize: 10, textAlign: "center" }}>
                        {item.label}
                    </div>
                </Nav.Link>
            ))}
        </div>
    );

    return <>{isMobile ? renderBottomNav() : renderSidebar()}</>;
};

export default Sidebar;