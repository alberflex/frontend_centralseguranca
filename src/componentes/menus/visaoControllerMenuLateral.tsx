import { useNavigate } from "react-router-dom";
import { useAutenticacao } from "../../contextos/useAutenticacao";
import { EPapel } from "../../enum/EPapel";
import { PiCarSimple } from "react-icons/pi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { IoTimeOutline } from "react-icons/io5";
import { BsPersonVcard } from "react-icons/bs";
import { LuLogs } from "react-icons/lu";
import { GoTrash } from "react-icons/go";
import { TbLogout2 } from "react-icons/tb";
import { LiaAddressCardSolid } from "react-icons/lia";
import { BsPersonVideo } from "react-icons/bs";

export const useVisaoControllerMenuLateral = () => {
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
    { 
        label: "Dashboard", 
        // @ts-ignore
        icon: <MdOutlineSpaceDashboard size={28} />, 
        onClick: vaiParaIntroducao, 
        permissoes: [EPapel.ADMINISTRADOR, EPapel.PORTEIRO, EPapel.COORDENACAO, EPapel.FROTAS] 
    },
    { 
        label: "Gerenciar usuários", 
        // @ts-ignore
        icon: <FiUsers size={28} />, 
        onClick: vaiParaGerenciamentoUsuarios, 
        permissoes: [EPapel.ADMINISTRADOR] 
    },
    { 
        label: "Gerenciar veículos", 
        // @ts-ignore
        icon: <PiCarSimple size={28} />, 
        onClick: vaiParaGerenciamentoVeiculos, 
        permissoes: [EPapel.ADMINISTRADOR, EPapel.PORTEIRO, EPapel.COORDENACAO, EPapel.FROTAS] 
    },
    { 
        label: "Gerenciar pontos", 
        // @ts-ignore
        icon: <IoTimeOutline size={28} />, 
        onClick: vaiParaGerenciamentoPontos, 
        permissoes: [EPapel.ADMINISTRADOR, EPapel.PORTEIRO] 
    },
    { 
        label: "Gerenciar acessos", 
        // @ts-ignore
        icon: <BsPersonVideo size={28} />, 
        onClick: vaiParaGerenciamentoAcesso, 
        permissoes: [EPapel.ADMINISTRADOR, EPapel.PORTEIRO, EPapel.COORDENACAO] 
    },
    { 
        label: "Gerenciar saídas de veículos", 
        // @ts-ignore
        icon: <BsPersonVcard size={28} />, 
        onClick: vaiParaGerenciamentoSolicitacaoVeiculos, 
        permissoes: [EPapel.ADMINISTRADOR, EPapel.PORTEIRO, EPapel.COORDENACAO, EPapel.FROTAS] 
    },
    { 
        label: "Gerenciar LOGs", 
        // @ts-ignore
        icon: <LuLogs size={28} />, 
        onClick: vaiParaGerenciarLogs, 
        permissoes: [EPapel.ADMINISTRADOR] 
    },
    { 
        label: "Limpar dados em cache", 
        // @ts-ignore
        icon: <GoTrash size={28} />, 
        onClick: limparDados, 
        permissoes: [EPapel.ADMINISTRADOR, EPapel.PORTEIRO, EPapel.COORDENACAO, EPapel.FROTAS] 
    },

    { 
        label: "Sair", 
        // @ts-ignore
        icon: <TbLogout2 size={28} />, 
        onClick: logout, 
        permissoes: [EPapel.ADMINISTRADOR, EPapel.PORTEIRO, EPapel.COORDENACAO, EPapel.FROTAS] 
    },
];

    return {
        informacoesUsuario,
        tokenJWT,
        menuItens,
        logout,
        vaiParaGerenciamentoAcesso,
        vaiParaIntroducao
    };
}