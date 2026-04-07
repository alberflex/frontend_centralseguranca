import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { TelaConsolidador } from '../telas/app/introducao/introducao';
import { LayoutPrivado } from '../componentes/layoutPrivado/layoutPrivado';
import { LayoutPublico } from '../componentes/layoutPublico/layoutPublico';
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
import GerenciarLog from '../telas/app/gerenciarLogs/gerenciarLogs';

const rotaConfig = [
  {
    path: '/',
    element: <LayoutPublico> <TelaLogin /></LayoutPublico>,
    title: 'Login - Central de segurança.'
  },

  {
    path: '/ControleAcesso',
    element: <LayoutPrivado><ControleAcesso /></LayoutPrivado>,
    title: 'Controle de acesso - Alberflex'
  },

  {
    path: '/FormularioControleAcesso',
    element: <LayoutPrivado><FormularioAcesso /></LayoutPrivado>,
    title: 'Formulário de acesso - Alberflex'
  },

  {
    path: '/ControleSolicitacaoVeiculo',
    element: <LayoutPrivado><ControleVeiculos /></LayoutPrivado>,
    title: 'Controle de veículo - Alberflex'
  },

  {
    path: '/FormularioSolicitacaoVeiculo',
    element: <LayoutPrivado><FormularioSolicitacaoVeiculo /></LayoutPrivado>,
    title: 'Formulário de veículo - Alberflex'
  },

  {
    path: '/GerenciamentoUsuarios',
    element: <LayoutPrivado><GerenciamentoUsuarios /></LayoutPrivado>,
    title: 'Gerenciamento de usuários - Alberflex'
  },

  {
    path: '/FormularioUsuarios',
    element: <LayoutPrivado><FormularioUsuario /></LayoutPrivado>,
    title: 'Formulário de usuários - Alberflex'
  },

  {
    path: '/ControleVeiculo',
    element: <LayoutPrivado><ListagemVeiculo /></LayoutPrivado>,
    title: 'Listagem de veículo - Alberflex'
  },

  {
    path: '/GerenciarLog',
    element: <LayoutPrivado><GerenciarLog /></LayoutPrivado>,
    title: 'Listagem de LOGs - Alberflex'
  },

  {
    path: '/FormularioVeiculo',
    element: <LayoutPrivado><FormularioVeiculo /></LayoutPrivado>,
    title: 'Formulário de veículo - Alberflex'
  },

  {
    path: '/ControlePonto',
    element: <LayoutPrivado><GerenciarPontos /></LayoutPrivado>,
    title: 'Listagem de pontos - Alberflex'
  },

  {
    path: '/FormularioPonto',
    element: <LayoutPrivado><FormularioPontos /></LayoutPrivado>,
    title: 'Formulário de pontos - Alberflex'
  },

  {
    path: '/Introducao',
    element: <LayoutPrivado><TelaConsolidador /></LayoutPrivado>,
    title: 'Introdução - Alberflex'
  }
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