import { ReactNode } from "react";
import Sidebar from "../menus/MenuLateral";
import Topbar from "../menus/MenuSuperior";
import { useAutenticacao } from "../../contextos/useAutenticacao";

interface LayoutProps {
    children: ReactNode;
}

export const LayoutPrivado = ({ children }: LayoutProps) => {
    const {informacoesUsuario} = useAutenticacao();
    return (
        <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
            <Sidebar logoSrc="/images/logo_light.png" />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
                <Topbar username={`${informacoesUsuario?.nome}`} />
                <div style={{ flex: 1, overflow: "auto", backgroundColor: "#f5f6fa" }}>{children}</div>
            </div>
        </div>
    );
};