import { Nav, Navbar, Container } from "react-bootstrap";
import { BsFilterCircle, BsFiletypeXlsx, BsFileEarmarkMedical, BsFileBarGraph, BsPlusCircle } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";

const IconeFiltro = BsFilterCircle as unknown as React.FC<{ size?: number, className?: string; }>;
const IconeXLSX = BsFiletypeXlsx as unknown as React.FC<{ size?: number, className?: string; }>;
const IconeDocumento = BsFileEarmarkMedical as unknown as React.FC<{ size?: number, className?: string; }>;
const IconeGrafico = BsFileBarGraph as unknown as React.FC<{ size?: number, className?: string; }>;
const IconeCadastrar = BsPlusCircle as unknown as React.FC<{ size?: number, className?: string; }>;

interface TabelaProps {
    nomeOperacoesGerenciais: string[];
    nomeOperacoesDiarias: string[];
}

export default function MenuSuperiorOperacoes({ nomeOperacoesGerenciais }: TabelaProps) {
    const navigate = useNavigate();

    const vaiParaControleAcesso = () => {
        navigate('/controleAcesso/formularioAcesso');
    };

    const vaiParaDesempenhoAcesso = () => {
        navigate('/controleAcesso/desempenhoAcesso');
    };

    return (
        <Navbar bg="light" expand="lg" className="my-3 rounded-3">
            <Container fluid>
                <Navbar.Toggle className="ms-auto" aria-controls="menu-operacoes" />
                <Navbar.Collapse id="menu-operacoes">
                    <div className="d-flex flex-column flex-lg-row justify-content-between w-100 gap-3">
                        <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center">
                            <Nav.Link href="#" className="d-flex align-items-center" onClick={vaiParaControleAcesso}>
                                <IconeCadastrar size={30} className="me-2" />
                                {nomeOperacoesGerenciais.map((operacao, index) => (
                                    <span key={index} className="me-1">{operacao}</span>
                                ))}
                            </Nav.Link>
                        </div>

                        <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3">
                            <Nav.Link href="#" className="d-flex align-items-center">
                                <IconeFiltro size={30} className="me-2" />
                                Filtro
                            </Nav.Link>

                            <Nav.Link href="#" className="d-flex align-items-center">
                                <IconeXLSX size={30} className="me-2" />
                                Exportar XLSX
                            </Nav.Link>

                            <Nav.Link href="#" className="d-flex align-items-center">
                                <IconeDocumento size={30} className="me-2" />
                                Relatório
                            </Nav.Link>

                            <Nav.Link href="#" className="d-flex align-items-center" onClick={vaiParaDesempenhoAcesso}>
                                <IconeGrafico size={30} className="me-2" />
                                Desempenho
                            </Nav.Link>
                        </div>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}