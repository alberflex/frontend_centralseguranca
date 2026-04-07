import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

export const LayoutPublico = ({ children }: LayoutProps) => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            {children}
        </div>
    );
};