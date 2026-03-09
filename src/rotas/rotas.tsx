import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { TelaConsolidador } from '../telas/app/introducao/introducao';
import TelaLogin from '../telas/login/login';
import ControleAcesso from '../telas/app/gerenciarAcesso/gerenciarAcessos';
import FormularioAcesso from '../telas/app/gerenciarAcesso/formularioAcessos';
import ControleVeiculos from '../telas/app/gerenciarSolicitacaoVeiculo/gerenciarSolicitacaoVeiculos';
import GerenciamentoUsuarios from '../telas/app/gerenciarUsuarios/gerenciarUsuarios';
import FormularioUsuario from '../telas/app/gerenciarUsuarios/formularioUsuarios';
import FormularioSolicitacaoVeiculo from '../telas/app/gerenciarSolicitacaoVeiculo/formularioSolicitacaoVeiculos';
import ListagemVeiculo from '../telas/app/gerenciarVeiculos/gerenciarVeiculo';
import FormularioVeiculo from '../telas/app/gerenciarVeiculos/formularioVeiculos';
import GerenciarPontos from '../telas/app/gerenciarPonto/gerenciarPontos';
import FormularioPontos from '../telas/app/gerenciarPonto/formularioPontos';

const rotaConfig = [
  { path: '/', element: <TelaLogin />, title: 'Login - Central de segurança.' },
  { path: '/ControleAcesso', element: <ControleAcesso />, title: 'Controle de acesso - Alberflex' },
  { path: '/FormularioControleAcesso', element: <FormularioAcesso />, title: 'Formulário de acesso - Alberflex' },
  { path: '/ControleSolicitacaoVeiculo', element: <ControleVeiculos />, title: 'Controle de veículo - Alberflex' },
  { path: '/FormularioSolicitacaoVeiculo', element: <FormularioSolicitacaoVeiculo />, title: 'Formulário de veículo - Alberflex' },
  { path: '/GerenciamentoUsuarios', element: <GerenciamentoUsuarios />, title: 'Gerenciamento de usuários - Alberflex' },
  { path: '/FormularioUsuarios', element: <FormularioUsuario />, title: 'Formulário de usuários - Alberflex' },
  { path: '/ControleVeiculo', element: <ListagemVeiculo />, title: 'Listagem de veículo - Alberflex' },
  { path: '/FormularioVeiculo', element: <FormularioVeiculo />, title: 'Formulário de veículo - Alberflex' },
  { path: '/ControlePonto', element: <GerenciarPontos />, title: 'Listagem de pontos - Alberflex' },
  { path: '/FormularioPonto', element: <FormularioPontos />, title: 'Formulário de pontos - Alberflex' },
  { path: '/Introducao', element: <TelaConsolidador />, title: 'Introdução - Alberflex' }
];

export default function Rotas() {
  const local = useLocation();

  useEffect(() => {
    const rota = rotaConfig.find(route => route.path === local.pathname);
    document.title = rota?.title || 'Alberflex';
  }, [local.pathname]);

  return (
    <Routes>
      {rotaConfig.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}