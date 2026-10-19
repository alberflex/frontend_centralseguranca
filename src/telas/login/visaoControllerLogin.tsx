import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICredenciaisLogin } from "../../interfaces/ICredenciais";
import { useAutenticacao } from "../../contextos/useAutenticacao";
import { useForm } from "react-hook-form";

export const useVisaoControllerLogin = () => {
    const { loginRealizado } = useAutenticacao();
    const { handleSubmit, control, formState: { errors, isSubmitting } } = useForm<ICredenciaisLogin>();
    const [alerta, setAlerta] = useState({ exibe: false, titulo: "", mensagem: "" });
    const navegacao = useNavigate();
    const vaiParaIntroducao = () => { navegacao("/Introducao") }

    const logo = "/images/alberflex.png";
    // Versao clara do logo, para o fundo escuro da metade esquerda
    const logoClaro = "/images/logo_light.png";

    const realizaLogin = async (credenciais: ICredenciaisLogin) => {
        const loginBemSucessido = await loginRealizado(credenciais);

        if (loginBemSucessido) { vaiParaIntroducao(); return; }

        setAlerta({
            exibe: true, titulo: "Credenciais inválidas.",
            mensagem: "Sua chapa não corresponde a senha informada. Tente novamente ou entre em contato com a equipe de Tecnologia da Informação.",
        });
    };

    return {
        logo,
        logoClaro,
        alerta,
        setAlerta,
        vaiParaIntroducao,
        realizaLogin,
        handleSubmit,
        control,
        errors,
        isSubmitting
    }
}
