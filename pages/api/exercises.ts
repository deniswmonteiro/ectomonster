import { NextApiRequest, NextApiResponse } from "next";
import { validate } from "@/helpers/form-validate";
import { dbConnect } from "@/helpers/db-util";
import { WithId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

type ResponseData = {
    message?: string,
    weight?: string | null,
    exercisesData?: IExercisesGetData[]
}

type IExerciseData = {
    exerciseId: number,
    week: string,
    day: string,
    weight: string
}

type IData = {
    id: number,
    title: string,
    exercises: IExercises
}

type IExercises = {
    [key: string]: IExercisesData
}

type IExercisesData = {
    exerciseId: number,
    name: string,
    series: number,
    "reps-min": number,
    "reps-max": number,
    pause: number,
    technique: string,
    weight: number,
    "is-grouping"?: boolean,
    description?: string
}

type IExercise = WithId<Document> & IExerciseData & {
    name: string,
}

type ISession = {
    user: {
        name: string,
        email: string,
        image: string | null
    },
    expires: string
}

type IUser = WithId<Document> & {
    id: number
}

type IExercisesGet = WithId<Document>[] & [{
    exerciseId: number,
    weight: number
}]

type IExercisesGetData = {
    exerciseId: number,
    weight: number
}

function getDay(day: string) {
    let dayName = "";

    switch (day) {
        case "segunda":
            dayName = "Segunda";
            break;

        case "terca":
            dayName = "Terça";
            break;

        case "quarta":
            dayName = "Quarta";
            break;

        case "quinta":
            dayName = "Quinta";
            break;

        case "sexta":
            dayName = "Sexta";
            break;
    }

    return dayName;
}

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method === "GET") {
        const email = req.query.email as string;
        
        try {
            const connect = await dbConnect();
            const db = connect.db();
            const user = await db.collection("users").findOne({ email }) as IUser;

            if (!user) {
                res.status(422).json({
                    message: "Usuário não encontrado.",
                });

                connect.close();
            }

            else {
                const exercises = await db.collection("exercises").find({ userId: user.id }).toArray() as IExercisesGet;
                const exercisesData = exercises.map((exercise: IExercisesGetData) => {
                    return {
                        exerciseId: exercise.exerciseId,
                        weight: exercise.weight
                    }
                });
                
                res.status(201).json({
                    exercisesData
                });
            }
        }
    
        catch (error) {
            res.status(500).json({
                message: "Erro de conexão com o banco de dados."
            });
        }
    }

    if (req.method === "POST") {
        const session: ISession | null = await getServerSession(req, res, authOptions);

        if (!session) {
            res.status(401).json({
                message: "Usuário não autenticado."
            })
        }

        else {
            const { exerciseId, weight } = req.body as IExerciseData;

            // Validation
            const isValidExerciseWeight = weight ? validate({ type: "exerciseWeight", value: weight }) : false;

            if (!isValidExerciseWeight) {
                res.status(422).json({
                    message: "Preencha o campo corretamente."
                });
            }

            else {
                try {
                    const connect = await dbConnect();
                    const db = connect.db();
                    
                    const email = session.user.email;
                    const users = db.collection("users");
                    const user = await users.findOne({ email }) as IUser;

                    if (!user) {
                        res.status(404).json({
                            message: "Usuário não encontrado."
                        });

                        connect.close();
                    }

                    else {
                        const exerciseWeight = Number(weight.replace(",", "."));

                        await db.collection("exercises").insertOne({
                            exerciseId,
                            userId: user.id,
                            weight: exerciseWeight
                        });
    
                        res.status(201).json({
                            message: "Carga adicionada com sucesso.",
                            weight
                        });

                        connect.close();
                    }
                }

                catch (error) {
                    res.status(500).json({
                        message: "Erro de conexão com o servidor."
                    });
                }
            }
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
    //         const { exerciseId, weight } = req.body as IExerciseData;

    //         // Validation
    //         const isValidExerciseWeight = weight ? validate({ type: "exerciseWeight", value: weight }) : false;

    //         if (!isValidExerciseWeight) {
    //             res.status(422).json({
    //                 message: "Preencha o campo corretamente."
    //             });
    //         }

    //         else {
    //             try {
    //                 const connect = await dbConnect();
    //                 const exercises = connect.db().collection("exercises");
    //                 const exercise = await exercises.findOne({ exerciseId }) as IExercise;

    //                 if (!exercise) {
    //                     res.status(404).json({
    //                         message: "Exercício não encontrado."
    //                     });

    //                     connect.close();
    //                 }

    //                 else {
    //                     const exerciseWeight = Number(weight.replace(",", "."));

    //                     await exercises.updateOne({ exerciseId }, {
    //                         $set: {
    //                             weight: exerciseWeight,
    //                         }
    //                     });

    //                     res.status(200).json({
    //                         message: "Carga atualizada com sucesso."
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