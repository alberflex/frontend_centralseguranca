import { Container } from 'react-bootstrap';
import { useVisaoControllerGerenciarAcessos } from './visaoControllerGerenciarAcessos';
import { GenericToast } from '../../../componentes/toast/toast';
import MenuSuperiorIniciar from '../../../componentes/menus/menuSuperiorIniciar';
import Tabela from '../../../componentes/tabelas/tabela';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ControleAcesso() {
    const {
        acessos,
        colunasTabela,
        toast,
        IconeAdicionar,
        deletarAcesso,
        selecionarAcesso,
        setToast,
        abrirConfirmacaoExclusao,
        vaiParaFormularioAcesso
    } = useVisaoControllerGerenciarAcessos();
    
    return (
        <Container fluid>
            <MenuSuperiorIniciar />
            <div className="d-flex flex-column flex-md-row justify-content-between px-4">
                <h4 className="text-center text-md-start mb-3 mb-md-0">Gerenciar solicitações de acesso.</h4>
                <div className="d-flex text-center px-2 mb-2 mb-md-0" onClick={vaiParaFormularioAcesso} style={{ display: 'flex', cursor: "pointer", alignItems: 'center', justifyContent: 'center' }}>
                    <IconeAdicionar size={22} />
                    <span>Formulário solicitação de acesso</span>
                </div>
            </div>
            <Tabela colunas={colunasTabela} dados={acessos} aoDeletar={abrirConfirmacaoExclusao} aoEditar={selecionarAcesso} />

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
