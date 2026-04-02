import { Container } from "react-bootstrap";
import { useVisaoControllerGerenciarUsuarios } from "./visaoControllerGerenciarUsuarios";
import { EPapel } from "../../../enum/EPapel";
import Tabela from "../../../componentes/tabelas/tabela";
import MenuSuperiorIniciar from "../../../componentes/menus/menuSuperiorIniciar";

export default function ListagemUsuarios() {
    const {
        selecionarPorteiro,
        abrirConfirmacaoExclusao,
        vaiParaFormularioPortaria,
        colunasTabela,
        porteiro,
        IconeAdicionar,
        informacoesUsuario
    } = useVisaoControllerGerenciarUsuarios();

    return (
        <Container fluid>
            <MenuSuperiorIniciar />
            <div className="d-flex flex-column flex-md-row justify-content-between px-4">
                <h4 className="text-center text-md-start mb-3 mb-md-0">Gerenciar usuários</h4>
                <div className="d-flex text-center px-2 mb-2 mb-md-0"
                    onClick={vaiParaFormularioPortaria}
                    style={{ display: 'flex', cursor: "pointer", alignItems: 'center', justifyContent: 'center' }}>
                    <IconeAdicionar size={22} />
                    <span>Formulário usuários</span>
                </div>
            </div>
            <Tabela
                colunas={colunasTabela}
                dados={porteiro}
                aoDeletar={abrirConfirmacaoExclusao}
                aoEditar={selecionarPorteiro}
                podeDeletar={informacoesUsuario?.papel === EPapel.ADMINISTRADOR} />
        </Container >
    );
}