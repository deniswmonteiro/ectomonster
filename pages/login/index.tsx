import Head from "next/head";
import Login from "@/components/login/Login";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

const LoginPage = () => {
    return (
        <>
            <Head>
                <meta name="description" content="Entre com seu e-mail e senha" />
                <title>Ectomonster &bull; Login</title>
            </Head>
            <Login />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (session !== null) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return {
        props: { }
    }
}

export default LoginPage