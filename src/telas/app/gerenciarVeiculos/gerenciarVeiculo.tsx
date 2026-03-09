import { Container } from "react-bootstrap";
import { useVisaoControllerGerenciarVeiculo } from "./visaoControllerGerenciarVeiculos";
import { GenericToast } from "../../../componentes/toast/toast";
import { EPapel } from "../../../enum/EPapel";
import Tabela from "../../../componentes/tabelas/tabela";
import MenuSuperiorIniciar from "../../../componentes/menus/menuSuperiorIniciar";

export default function ListagemVeiculo() {
    const { colunasTabela, veiculo, selecionarVeiculo, toast, setToast, abrirConfirmacaoExclusao, IconeAdicionar, vaiParaFormularioVeiculo, informacoesUsuario } = useVisaoControllerGerenciarVeiculo();
    return (
        <Container fluid>
            <MenuSuperiorIniciar />
            <div className="d-flex flex-column flex-md-row justify-content-between px-4">
                <h4 className="text-center text-md-start mb-3 mb-md-0">Gerenciar veículos</h4>
                <div className="d-flex text-center px-2 mb-2 mb-md-0" onClick={vaiParaFormularioVeiculo} style={{ display: 'flex', cursor: "pointer", alignItems: 'center', justifyContent: 'center' }}>
                    <IconeAdicionar size={22} />
                    <span>Formulário de veículo</span>
                </div>
            </div>
            <Tabela colunas={colunasTabela} dados={veiculo} aoDeletar={abrirConfirmacaoExclusao} aoEditar={selecionarVeiculo} podeDeletar={informacoesUsuario?.papel === EPapel.ADMINISTRADOR}
            />
            <GenericToast
                show={toast.show}
                onClose={() => setToast({ ...toast, show: false })}
                title={toast.title}
                message={toast.message}
                buttons={[
                    { label: "Confirmar", onClick: toast.onConfirm, variant: "success" },
                    { label: "Cancelar", onClick: () => setToast({ ...toast, show: false }), variant: "danger" },
                ]}
            />
        </Container >
    );
}