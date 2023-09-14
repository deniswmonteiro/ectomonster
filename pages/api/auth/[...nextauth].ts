import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "@/helpers/db-util";
import { verifyPassword } from "@/helpers/auth-util";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string,
                    password: string
                }

                const connect = await dbConnect();
                const usersCollection = connect.db().collection("users");
                const user = await usersCollection.findOne({ email });

                if (!user) {
                    connect.close();
                    throw new Error("Usuário não encontrado.");
                }

                else {
                    const verifiedPassword = await verifyPassword(password, user.password);

                    if (!verifiedPassword) {
                        connect.close();
                        throw new Error("Senha incorreta.");
                    }

                    else {
                        return {
                            id: user.id,
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