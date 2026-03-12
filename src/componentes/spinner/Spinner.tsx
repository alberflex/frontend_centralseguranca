import Spinner from "react-bootstrap/Spinner";

interface SpinnerComponenteProps {
    titulo?: string;
    estado: boolean;
}

export const SpinnerComponente = ({ titulo = "Carregando...", estado }: SpinnerComponenteProps) => {
    if (!estado) return null;
    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{
                backgroundColor: "rgba(0,0,0,0.4)",
                zIndex: 2000
            }}
        >
            <div className="text-center text-white">
                <Spinner animation="border" />
                <div className="mt-2">{titulo}</div>
            </div>
        </div>
    );
};