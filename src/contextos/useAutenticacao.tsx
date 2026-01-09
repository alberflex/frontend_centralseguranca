import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { VisaoModeloPorteiro } from "../modelo/porteiro/visaoModeloPorteiro";
import { IPorteiro } from "../interfaces/IPorteiro";
import { useNavigate } from "react-router-dom";
import { ICredenciaisLogin } from "../interfaces/ICredenciais";

interface AutenticacaoContextType { tokenJWT: string | null; informacoesUsuario: IPorteiro | null; loginRealizado: (credenciais: ICredenciaisLogin) => Promise<boolean>; logout: () => void; }

const autenticacaoContext = createContext<AutenticacaoContextType | undefined>(undefined);

interface AutenticacaoProviderProps { children: ReactNode; }

export const AutenticacaoProvider: React.FC<AutenticacaoProviderProps> = ({ children }) => {
  const [informacoesUsuario, setInformacoesUsuario] = useState<IPorteiro | null>(null);
  const [tokenJWT, setTokenJWT] = useState<string | null>(() => localStorage.getItem("tokenJWT"));
  const visaoModeloDePorteiro = new VisaoModeloPorteiro();
  const navegacao = useNavigate();

  useEffect(() => {
    const carregarUsuario = async () => {
      if (tokenJWT) {
        try {
          const dadosUsuario = await visaoModeloDePorteiro.buscarInformacoesPorteiroPorID(tokenJWT);
          setInformacoesUsuario(dadosUsuario);
        } catch (error) {
          setInformacoesUsuario(null);
        }
      } else {
        setInformacoesUsuario(null);
      }
    };

    carregarUsuario();
  }, [tokenJWT]);

  const loginRealizado = async (credenciais: ICredenciaisLogin): Promise<boolean> => {
    try {
      const hashToken: string | null = await visaoModeloDePorteiro.realizarLogin(credenciais);
      if (hashToken) {
        setTokenJWT(hashToken);
        localStorage.setItem("tokenJWT", hashToken);
        const dadosUsuario = await visaoModeloDePorteiro.buscarInformacoesPorteiroPorID(hashToken);
        setInformacoesUsuario(dadosUsuario);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const logout = () => { setTokenJWT(null); setInformacoesUsuario(null); localStorage.removeItem("tokenJWT"); navegacao("/") };
  return (<autenticacaoContext.Provider value={{ tokenJWT, informacoesUsuario, loginRealizado, logout }}> {children} </autenticacaoContext.Provider>);
};

export const useAutenticacao = (): AutenticacaoContextType => {
  const context = useContext(autenticacaoContext);

  if (!context) throw new Error("useAutenticacao must be used within an AutenticacaoProvider");
  return context;
};
