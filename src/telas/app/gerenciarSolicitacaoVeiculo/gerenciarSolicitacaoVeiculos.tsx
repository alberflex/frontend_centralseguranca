import { Container } from "react-bootstrap";
import { useVisaoControllerListagemSolicitacaoVeiculo } from "./visaoControllerGerenciarSolicitacaoVeiculos";
import { GenericToast } from "../../../componentes/toast/toast";
import Tabela from "../../../componentes/tabelas/tabela";
import MenuSuperiorIniciar from "../../../componentes/menus/menuSuperiorIniciar";

export default function ControleSolicitacaoVeiculo() {
    const { 
        colunasTabela, 
        solicitacaoVeiculo, 
        selecionarSolicitacaoVeiculo, 
        abrirConfirmacaoExclusao, 
        setToast, 
        toast, 
        IconeAdicionar, 
        vaiParaFormularioSolicitacaoVeiculo 
    } = useVisaoControllerListagemSolicitacaoVeiculo();
    return (
        <Container fluid>
            <MenuSuperiorIniciar />
            <div className="d-flex flex-column flex-md-row justify-content-between px-4">
                <h4 className="text-center text-md-start mb-3 mb-md-0">Gerenciar solicitação de veículo.</h4>
                <div className="d-flex text-center px-2 mb-2 mb-md-0" onClick={vaiParaFormularioSolicitacaoVeiculo} style={{ display: 'flex', cursor: "pointer", alignItems: 'center', justifyContent: 'center' }}>
                    <IconeAdicionar size={22} />
                    <span>Formulário solicitação de veículos</span>
                </div>

            </div>
            <Tabela colunas={colunasTabela} dados={solicitacaoVeiculo} aoEditar={selecionarSolicitacaoVeiculo} aoDeletar={abrirConfirmacaoExclusao} />
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
        </Container>
    );
}