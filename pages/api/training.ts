import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { buildPath, extractData } from "@/helpers/content-util";
import { dbConnect } from "@/helpers/db-util";
import { WithId } from "mongodb";

type ResponseData = {
    message?: string,
    data: IData | null
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
    weight?: number,
    "is-grouping"?: boolean,
    description?: string
}

type IExercise = WithId<Document>[] & [IExerciseData]

type IExerciseData = {
    exerciseId: number,
    week: string,
    day: string,
    weight: string
}

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method === "GET") {
        const week = req.query.week as string;
        const day = req.query.day as string;

        const filePath = buildPath(week, day);

        if (fs.existsSync(filePath)) {
            const data: IData = extractData(filePath);
            
            // Adding exercise weight value to data if exists
            const connect = await dbConnect();
            const db = connect.db();
            
            const exerciseWeek = (week.substring(0, 1).toUpperCase() + week.substring(1)).replace("-", " ");
            const exerciseData = await db.collection("exercises").find({ week: exerciseWeek }).toArray() as IExercise;
            
            exerciseData.map((exercise: IExerciseData) => {
                const exerciseId = `exercise-${exercise.exerciseId}`;

                if (data.exercises[`${exerciseId}`].exerciseId === exercise.exerciseId) {
                    data.exercises[`${exerciseId}`].weight = Number(exercise.weight)
                }
            });

            res.status(200).json({
                data
            });
        }

        else {
            res.status(500).json({
                message: "Dia de treino não encontrado.",
                data: null
            });
        }
    }
}

export default handler