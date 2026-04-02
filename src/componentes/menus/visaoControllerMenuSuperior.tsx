import { useNavigate } from "react-router-dom";
import { useAutenticacao } from "../../contextos/useAutenticacao";
import { EPapel } from "../../enum/EPapel";

export const useVisaoControllerMenuSuperior = () => {
    const navigate = useNavigate();
    const { informacoesUsuario, tokenJWT, logout } = useAutenticacao();

    const vaiParaIntroducao = () => navigate("/Introducao")
    const vaiParaGerenciamentoAcesso = () => navigate("/ControleAcesso");
    const vaiParaGerenciamentoUsuarios = () => navigate("/GerenciamentoUsuarios");
    const vaiParaGerenciamentoVeiculos = () => navigate("/ControleVeiculo");
    const vaiParaGerenciamentoSolicitacaoVeiculos = () => navigate("/ControleSolicitacaoVeiculo");
    const vaiParaGerenciamentoPontos = () => navigate("/ControlePonto")
    const vaiParaGerenciarLogs = () => navigate("/GerenciarLog");

    const limparDados = () => {
        logout();
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    };

    const menuItens = [
        { label: "Dashboard", onClick: vaiParaIntroducao, permissoes: [EPapel.ADMINISTRADOR, EPapel.PORTEIRO, EPapel.COORDENACAO, EPapel.FROTAS] },
        { label: "Gerenciar usuários", onClick: vaiParaGerenciamentoUsuarios, permissoes: [EPapel.ADMINISTRADOR,] },
        { label: "Gerenciar veículos", onClick: vaiParaGerenciamentoVeiculos, permissoes: [EPapel.ADMINISTRADOR, EPapel.PORTEIRO, EPapel.COORDENACAO, EPapel.FROTAS] },
        { label: "Gerenciar pontos", onClick: vaiParaGerenciamentoPontos, permissoes: [EPapel.ADMINISTRADOR, EPapel.PORTEIRO] },
        { label: "Gerenciar solicitações de acessos", onClick: vaiParaGerenciamentoAcesso, permissoes: [EPapel.ADMINISTRADOR, EPapel.PORTEIRO, EPapel.COORDENACAO] },
        { label: "Gerenciar solicitações de veiculos", onClick: vaiParaGerenciamentoSolicitacaoVeiculos, permissoes: [EPapel.ADMINISTRADOR, EPapel.PORTEIRO, EPapel.COORDENACAO, EPapel.FROTAS] },
        { label: "Gerenciar LOGs de sistema", onClick: vaiParaGerenciarLogs, permissoes: [EPapel.ADMINISTRADOR] },
        { label: "Limpar dados em cache", onClick: limparDados, permissoes: [EPapel.ADMINISTRADOR, EPapel.PORTEIRO, EPapel.COORDENACAO, EPapel.FROTAS] },
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
