import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { buildPath, extractData } from "@/helpers/content-util";
import { dbConnect, getId } from "@/helpers/db-util";
import { validate } from "@/helpers/form-validate";
import { WithId } from "mongodb";

type ResponseData = {
    message?: string,
    weight?: string
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
    "is-grouping"?: boolean,
    description?: string
}

type IExercise = WithId<Document> & {
    exerciseId: number,
    week: string,
    day: string,
    name: string,
    weight: string
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
            const exercise: string = `exercise-${exerciseId.toString().slice(-1)}`;
            const filePath = buildPath(week, day);

            if (fs.existsSync(filePath)) {
                const data: IData = extractData(filePath);
                const { name } = data.exercises[`${exercise}`];

                const connect = await dbConnect();
                const db = connect.db();

                const exerciseDataExists = await db.collection("exercise").findOne({ exerciseId }) as IExercise;

                if (exerciseDataExists) {
                    //
                }

                else {
                    const exerciseWeight = Number(weight.replace(",", "."));
                    const exerciseWeek = week.replace("-", " ").substring(0, 1).toUpperCase() + week.replace("-", " ").substring(1);
                    const exerciseDay = getDay(day);

                    await db.collection("exercise").insertOne({
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
    }
}

export default handler