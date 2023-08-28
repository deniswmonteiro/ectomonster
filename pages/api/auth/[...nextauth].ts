import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "@/helpers/db-util";
import { verifyPassword } from "@/helpers/auth-util";

type CredentialsProps = {
    email: string,
    password: string
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    site: process.env.NEXTAUTH_URL,
    providers: [
        CredentialsProvider({
            async authorize(credentials: CredentialsProps) {
                const connect = await dbConnect();
                const usersCollection = connect.db().collection("users");
                const user = await usersCollection.findOne({ email: credentials.email });

                if (!user) {
                    connect.close();
                    throw new Error("Usuário não encontrado.");
                }

                else {
                    const password = await verifyPassword(credentials.password, user.password);

                    if (!password) {
                        connect.close();
                        throw new Error("Senha incorreta.");
                    }

                    else {
                        return {
                            name: user.name,
                            email: user.email,
                            image: null,
                        }
                    }
                }
            }
        })
    ],
};

export default NextAuth(authOptions);