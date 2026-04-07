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
                <Topbar userPhoto="https://img.freepik.com/vetores-premium/icone-de-perfil-de-avatar-padrao-imagem-de-usuario-de-midia-social-icone-de-avatar-cinza-silhueta-de-perfil-em-branco-ilustracao-vetorial_561158-3383.jpg?semt=ais_hybrid&w=740&q=80" username={`${informacoesUsuario?.nome}`} />
                <div style={{ flex: 1, overflow: "auto" }}>{children}</div>
            </div>
        </div>
    );
};