import TelaLogin from '../telas/login';
import ControleAcesso from '../telas/controleAcesso/controleAcesso';
import FormularioAcesso from '../telas/controleAcesso/formularioAcesso';   
import DesempenhoAcesso from '../telas/controleAcesso/desempenhoAcesso';  
import ControleVeiculos from '../telas/controleVeiculos/controleVeiculos';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import PaginaInicial from '../telas/paginaInicial/paginaInical';

export default function Rotas() {
  return (
    <Routes>
      <Route path="/Login" element={<TelaLogin />} />
      <Route path="/controleAcesso" element={<ControleAcesso />} />
      <Route path="/controleAcesso/formularioAcesso" element={<FormularioAcesso />} />
      <Route path="/controleAcesso/desempenhoAcesso" element={<DesempenhoAcesso />} />
      <Route path="/controleVeiculos" element={<ControleVeiculos />} />
      <Route path="/" element={<PaginaInicial />} />
    </Routes>
  );
}