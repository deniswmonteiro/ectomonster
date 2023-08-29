import { WithId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { validate } from "@/helpers/user-validate";
import { dbConnect } from "@/helpers/db-util";

type IUserResponse = {
    name: string,
    gender: "1" | "2",
    weight: string,
    height: string,
}

type ResponseData = {
    message?: string,
    user?: IUserResponse | null
}

type IUser = WithId<Document> & {
    name: string,
    email: string,
    gender: "male" | "female",
    weight: number,
    height: number,
}

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method === "GET") {
        const email = req.query.email;

        try {
            const connect = await dbConnect();
            const db = connect.db();
            const user = await db.collection("users").findOne({ email }) as IUser;

            if (!user) {
                res.status(422).json({
                    message: "Usuário não encontrado.",
                    user: null
                });

                connect.close();
            }

            else {
                const userGender = (user.gender === "male") ? "1" : "2";
                const userWeight = String(user.weight).replace(".", ",");
                const userHeight = String(user.height);

                res.status(201).json({
                    user: {
                        name: user.name,
                        gender: userGender,
                        weight: userWeight,
                        height: userHeight,
                    }
                });
            }
        }
    
        catch (error) {
            res.status(500).json({
                message: "Erro de conexão com o banco de dados."
            });
        }
    }

    // if (req.method === "PATCH") {
    //     const session: ISession | null = await getServerSession(req, res, authOptions);

    //     if (!session) {
    //         res.status(401).json({
    //             message: "Usuário não autenticado."
    //         })
    //     }

    //     else {
    //         const { name, gender, weight, height } = req.body as UserDataProps;

    //         // Validation
    //         const isValidName = name ? validate({ type: "name", value: name, min: 2 }) : false;
    //         const isValidGender = gender ? validate({ type: "gender", value: gender }) : false;
    //         const isValidWeight = weight ? validate({ type: "weight", value: weight }) : false;
    //         const isValidHeight = height ? validate({ type: "height", value: height }) : false;

    //         if (!isValidName || !isValidGender || !isValidWeight || !isValidHeight) {
    //             res.status(422).json({
    //                 message: "Preencha todos os campos corretamente."
    //             });
    //         }

    //         else {
    //             try {
    //                 const email = session.user.email;
    //                 const connect = await dbConnect();
    //                 const users = connect.db().collection("users");
    //                 const user = await users.findOne({ email }) as IUser;

    //                 if (!user) {
    //                     res.status(404).json({
    //                         message: "Usuário não encontrado."
    //                     });

    //                     connect.close();
    //                 }

    //                 else {
    //                     const userGender = (gender === "1") ? "male" : "female";
    //                     const userWeight = Number(weight.replace(",", "."));
    //                     const userHeight = Number(height);

    //                     await users.updateOne({ email }, {
    //                         $set: {
    //                             name,
    //                             gender: userGender,
    //                             weight: userWeight,
    //                             height: userHeight,
    //                         }
    //                     });

    //                     res.status(200).json({
    //                         message: "Dados atualizados com sucesso."
    //                     });
                        
    //                     connect.close();
    //                 }
    //             }

    //             catch (error) {
    //                 res.status(500).json({
    //                     message: "Erro de conexão com o servidor."
    //                 });
    //             }
    //         }
    //     }
    // }
}

export default handler