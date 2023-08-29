import HomeAuthenticated from "@/components/home/HomeAuthenticated";
import HomeVisitor from "@/components/home/HomeVisitor";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

type ISession = {
    user: {
        name: string,
        email: string,
        image: string | null
    },
    expires: string
}

type IUser = {
    name: string,
    gender: "1" | "2",
    weight: string,
    height: string
}

const HomePage = ({ session, user }: { session: ISession, user: IUser }) => {
    if (session !== null) {
        return (
            <HomeAuthenticated user={user} />
        )
    }

    else {
       return (
            <HomeVisitor />
        )
    }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    let session: ISession | null = await getServerSession(context.req, context.res, authOptions);
    let user: IUser | null = null;
    
    // Get user data
    if (session !== null) {
        const userEmail = session.user.email;
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user/?email=${userEmail}`);
        
        if (response.ok) user = await response.json() as IUser;

        else {
            user = null;
            session = null;
        }
    }

    return {
        props: {
            session,
            user,
        }
    }
}

export default HomePage