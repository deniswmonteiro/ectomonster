import HomeAuthenticated from "@/components/home/HomeAuthenticated";
import HomeVisitor from "@/components/home/HomeVisitor";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

type IUser = {
    name: string,
    email: string,
    image: string | null
}

type ISession = {
    user: IUser,
    expires: string
}

type IUserData = {
    name: string,
    gender: "1" | "2",
    weight: string,
    height: string
}

const HomePage = ({ session, user }: { session: ISession, user: IUserData }) => {
    if (session !== null) {
        return (
            <HomeVisitor />
            // <HomeAuthenticated user={user} />
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
    // let user: IUserData | null = null;
    
    // // Get user data
    // if (session !== null) {
    //     const userEmail = session.user.email;
    //     const userReq = await fetch(`${process.env.NEXTAUTH_URL}/api/user/?email=${userEmail}`);
    //     const userRes = await userReq.json() as IUserData;
        
    //     if (userReq.ok) user = userRes;

    //     else {
    //         user = null;
    //         session = null;
    //     }
    // }

    const user = null;

    return {
        props: {
            session,
            user,
        }
    }
}

export default HomePage