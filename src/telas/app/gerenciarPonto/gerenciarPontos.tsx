import { Container } from "react-bootstrap";
import { useVisaoControllerGerenciarPontos } from "./visaoControllerGerenciarPontos";
import { GenericToast } from "../../../componentes/toast/toast";
import MenuSuperiorIniciar from "../../../componentes/menus/menuSuperiorIniciar";
import Tabela from "../../../componentes/tabelas/tabela";

export default function GerenciarPontos() {
    const { 
        selecionarPonto, 
        pontos, 
        colunasTabela, 
        toast, 
        setToast, 
        abrirConfirmacaoExclusao, 
        IconeAdicionar, 
        vaiParaFormularioPonto 
    } = useVisaoControllerGerenciarPontos();

    return (
        <Container fluid>
            <MenuSuperiorIniciar />
            <div className="d-flex flex-column flex-md-row justify-content-between px-4">
                <h4 className="text-center text-md-start mb-3 mb-md-0">Gerenciar pontos</h4>
                <div className="d-flex text-center px-2 mb-2 mb-md-0" onClick={vaiParaFormularioPonto} style={{ display: 'flex', cursor: "pointer", alignItems: 'center', justifyContent: 'center' }}>
                    <IconeAdicionar size={22} />
                    <span>Formulário de ponto</span>
                </div>
            </div>
            <Tabela colunas={colunasTabela} dados={pontos} aoDeletar={abrirConfirmacaoExclusao} aoEditar={selecionarPonto} />
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
    )
}