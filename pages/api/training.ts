import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { buildPath, extractData } from "@/helpers/content-util";
import { dbConnect } from "@/helpers/db-util";
import { WithId } from "mongodb";

type ResponseData = {
    message?: string,
    data: IData | null,
    filePath?: string
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

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method === "GET") {
        const week = req.query.week as string;
        const day = req.query.day as string;

        const filePath = buildPath(week, day);

        if (fs.existsSync(filePath)) {
            const data: IData = extractData(filePath);

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