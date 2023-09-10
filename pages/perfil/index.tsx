import Profile from "@/components/profile/Profile";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

type IUserData = {
    user: IUser | null
}

type IUser = {
    name: string,
    gender: "1" | "2",
    weight: string,
    height: string,
}

type ISession = {
    user: {
        name: string,
        email: string,
        image: string | null
    },
    expires: string
}

const ProfilePage = ({ user }: { user: IUser | null }) => {
    return (
        <Profile user={user} />
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    let session: ISession | null = await getServerSession(context.req, context.res, authOptions);
    let user: IUser | null = null;

    if (session === null) {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }

    else {
        // Get user data
        const userEmail = session.user.email;
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/profile/?email=${userEmail}`);

        if (response.ok) {
            const userData = await response.json() as IUserData;
            user = userData.user;
        }

        else user = null;
        
        return {
            props: {
                user
            }
        }
    }
}

export default ProfilePage