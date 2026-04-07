import React from 'react';
import ReactDOM from 'react-dom/client';
import Rotas from './rotas/rotas';
import { BrowserRouter } from 'react-router-dom';
import { AutenticacaoProvider } from './contextos/useAutenticacao';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AutenticacaoProvider>
        <Rotas />
      </AutenticacaoProvider>
    </BrowserRouter>
  </React.StrictMode>
);