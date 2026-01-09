import { useNavigate } from "react-router-dom";
import { useAutenticacao } from "../../contextos/useAutenticacao";

export const useVisaoControllerMenuSuperior = () => {
    const navigate = useNavigate();
    const { informacoesUsuario, tokenJWT, logout } = useAutenticacao();

    const vaiParaIntroducao = () => navigate("/Introducao")
    const vaiParaGerenciamentoAcesso = () => navigate("/ControleAcesso");
    const vaiParaGerenciamentoUsuarios = () => navigate("/GerenciamentoUsuarios");
    const vaiParaGerenciamentoVeiculos = () => navigate("/ControleVeiculo");
    const vaiParaGerenciamentoSolicitacaoVeiculos = () => navigate("/ControleSolicitacaoVeiculo");
    const vaiParaGerenciamentoPontos = () => navigate("/ControlePonto")

    const menuItens = [
        { label: "Dashboard", onClick: vaiParaIntroducao, permissoes: ["PORTEIRO", "SUPERVISOR", "ADMINISTRADOR"] },
        { label: "Gerenciar usuários", onClick: vaiParaGerenciamentoUsuarios, permissoes: ["PORTEIRO", "ADMINISTRADOR", "SUPERVISOR"] },
        { label: "Gerenciar veículos", onClick: vaiParaGerenciamentoVeiculos, permissoes: ["PORTEIRO", "SUPERVISOR", "ADMINISTRADOR"] },
        { label: "Gerenciar pontos", onClick: vaiParaGerenciamentoPontos, permissoes: ["PORTEIRO", "SUPERVISOR", "ADMINISTRADOR"] },
        { label: "Gerenciar solicitações de acessos", onClick: vaiParaGerenciamentoAcesso, permissoes: ["PORTEIRO", "SUPERVISOR", "ADMINISTRADOR"] },
        { label: "Gerenciar solicitações de veiculos", onClick: vaiParaGerenciamentoSolicitacaoVeiculos, permissoes: ["PORTEIRO", "ADMINISTRADOR", "SUPERVISOR"] },
    ];

    return {
        informacoesUsuario,
        tokenJWT,
        menuItens,
        logout,
        vaiParaGerenciamentoAcesso,
        vaiParaIntroducao
    };
};
