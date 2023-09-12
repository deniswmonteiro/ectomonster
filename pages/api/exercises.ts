import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { validate } from "@/helpers/form-validate";
import { buildPath, extractData, updateData } from "@/helpers/content-util";
import { dbConnect } from "@/helpers/db-util";
import { WithId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

type ResponseData = {
    message?: string,
    weight?: string | null,
    exerciseData?: IExerciseGet
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

type IExerciseGet = WithId<Document>[] & [IExerciseData]

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
        const week = req.query.week as string;

        // Adding exercise weight value to data if exists
        const connect = await dbConnect();
        const db = connect.db();

        const exerciseWeek = (week.substring(0, 1).toUpperCase() + week.substring(1)).replace("-", " ");
        const exerciseData = await db.collection("exercises").find({ week: exerciseWeek }).toArray() as IExerciseGet;

        res.status(201).json({
            exerciseData
        });
    }

    if (req.method === "POST") {
        const { exerciseId, week, day, weight } = req.body as IExerciseData;

        // Validation
        const isValidExerciseWeight = weight ? validate({ type: "exerciseWeight", value: weight }) : false;

        if (!isValidExerciseWeight) {
            res.status(422).json({
                message: "Preencha o campo corretamente."
            });
        }

        else {
            const exercise: string = `exercise-${exerciseId}`;
            const filePath = buildPath(week, day);

            if (fs.existsSync(filePath)) {
                const data: IData = extractData(filePath);

                const { name } = data.exercises[`${exercise}`];

                const connect = await dbConnect();
                const db = connect.db();

                const exerciseWeight = Number(weight.replace(",", "."));
                const exerciseWeek = week.replace("-", " ").substring(0, 1).toUpperCase() + week.replace("-", " ").substring(1);
                const exerciseDay = getDay(day);

                await db.collection("exercises").insertOne({
                    exerciseId,
                    week: exerciseWeek,
                    day: exerciseDay,
                    name,
                    weight: exerciseWeight
                });

                res.status(201).json({
                    message: "Carga adicionada com sucesso.",
                    weight
                });

                connect.close();
            }
        }
    }

    if (req.method === "PATCH") {
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
                    const exercises = connect.db().collection("exercises");
                    const exercise = await exercises.findOne({ exerciseId }) as IExercise;

                    if (!exercise) {
                        res.status(404).json({
                            message: "Exercício não encontrado."
                        });

                        connect.close();
                    }

                    else {
                        const exerciseWeight = Number(weight.replace(",", "."));

                        await exercises.updateOne({ exerciseId }, {
                            $set: {
                                weight: exerciseWeight,
                            }
                        });

                        res.status(200).json({
                            message: "Carga atualizada com sucesso."
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
}

export default handler