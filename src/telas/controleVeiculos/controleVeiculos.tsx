import { Container } from "react-bootstrap";
import MenuSuperiorModulos from "../../componentes/menus/menuSuperiorModulos";
import MenuSuperiorOperacoes from "../../componentes/menus/menuSuperiorOperacoes";
import Tabela from "../../componentes/tabelas/tabela";

export default function ControleVeiculos() {
    const nomeOperacoesGerenciais = ['Cadastrar registro.'];
    const nomeOperacoesDiarias = ['Filtro', 'Exportar XLSX', 'Gerar relatório', 'Desempenho'];
    const colunas = ['Identificador', 'Data entrada', 'Hora entrada', 'Data saída', 'Hora saída', 'Nome visitante', 'CPF', 'Empresa', 'Placa', 'Destino', 'Nome responsável'];
    const dados = [
        ['1', '01/01/2023', '08:00', '01/01/2023', '17:00', 'João Silva', '123.456.789-00', 'Empresa A', 'ABC-1234', 'Sala de Reuniões', 'Maria Oliveira'],
        ['2', '02/01/2023', '09:00', '02/01/2023', '18:00', 'Ana Souza', '987.654.321-00', 'Empresa B', 'XYZ-5678', 'Sala de Diretoria', 'Carlos Pereira'],
    ];
    return (
        <Container fluid>
            <MenuSuperiorModulos />
            <MenuSuperiorOperacoes
                nomeOperacoesGerenciais={nomeOperacoesGerenciais}
                nomeOperacoesDiarias={nomeOperacoesDiarias}
            />
            <Tabela
                colunas={colunas}
                dados={dados}
            />
        </Container>
    );
}