import RegisterProfile from "@/components/register/RegisterProfile";
import Head from "next/head";
import React from "react";

const RegisterProfilePage = () => {
    return (
        <>
            <Head>
                <meta name="description" content="Adicionar os dados de perfil" />
                <title>Ectomonster &bull; Adicionar dados de perfil</title>
            </Head>
            <RegisterProfile />
        </>
    )
}

export default RegisterProfilePage