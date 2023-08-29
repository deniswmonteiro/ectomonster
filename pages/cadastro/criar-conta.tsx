import Head from "next/head";
import RegisterAccount from "@/components/register/RegisterAccount";

const RegisterAccountPage = () => {
    return (
        <>
            <Head>
                <meta name="description" content="Crie a sua conta" />
                <title>Ectomonster &bull; Cria a sua conta</title>
            </Head>
            <RegisterAccount />
        </>
    )
}

export default RegisterAccountPage