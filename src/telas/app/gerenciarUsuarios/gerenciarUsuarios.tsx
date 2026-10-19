import { Container } from "react-bootstrap";
import { useVisaoControllerGerenciarUsuarios } from "./visaoControllerGerenciarUsuarios";
import { EPapel } from "../../../enum/EPapel";
import Tabela from "../../../componentes/tabelas/tabela";
import { CabecalhoListagem, CardRegistros } from "../../../componentes/listagem/listagem";

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
        <Container fluid className="p-3 p-md-4">
            <CabecalhoListagem
                titulo="Usuários"
                descricao="Consulte, edite ou cadastre usuários do sistema."
                textoBotao="Novo usuário"
                icone={<IconeAdicionar size={26} />}
                onNovo={vaiParaFormularioPortaria}
            />

            <CardRegistros total={porteiro?.length ?? 0}>
                <Tabela
                    colunas={colunasTabela}
                    dados={porteiro}
                    aoDeletar={abrirConfirmacaoExclusao}
                    aoEditar={selecionarPorteiro}
                    podeDeletar={informacoesUsuario?.papel === EPapel.ADMINISTRADOR} />
            </CardRegistros>
        </Container>
    );
}
