import { useAutenticacao } from "../../contextos/useAutenticacao";


export const useVisaoControllerMenuSuperior = () => {
    const { informacoesUsuario, logout } = useAutenticacao();

    return {
        informacoesUsuario,
        logout
    }
};
