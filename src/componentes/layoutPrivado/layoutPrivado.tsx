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
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <Sidebar logoSrc="/images/logo_light.png" />
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Topbar userPhoto="https://avatars.githubusercontent.com/u/87160095?s=48&v=4" username={`${informacoesUsuario?.nome}`} />
                <div style={{ flex: 1, overflow: "auto" }}>{children}</div>
            </div>
        </div>
    );
};