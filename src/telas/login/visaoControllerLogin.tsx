import { useNavigate } from "react-router-dom";
import { ICredenciaisLogin } from "../../interfaces/ICredenciais";
import { useAutenticacao } from "../../contextos/useAutenticacao";
import { useForm } from "react-hook-form";

export const useVisaoControllerLogin = () => {
    const { loginRealizado } = useAutenticacao();
    const { handleSubmit, control } = useForm<ICredenciaisLogin>()
    const navegacao = useNavigate();
    const vaiParaIntroducao = () => { navegacao("/Introducao") }

    const realizaLogin = async (credenciais: ICredenciaisLogin) => {
        const loginBemSucessido = await loginRealizado(credenciais);
        if (loginBemSucessido) {
            vaiParaIntroducao();
        } else {
            alert('Credenciais inválidas.');
        }
    };

    return {
        vaiParaIntroducao,
        realizaLogin, 
        handleSubmit, 
        control
    }
}