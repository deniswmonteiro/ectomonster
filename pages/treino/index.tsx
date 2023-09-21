import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

type ISession = {
    user: {
        name: string,
        email: string,
        image: string | null
    },
    expires: string
}

const TrainingPage = () => {
    return null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    let session: ISession | null = await getServerSession(context.req, context.res, authOptions);

    if (session === null) {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }

    else {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
}

export default TrainingPage