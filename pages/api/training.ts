import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { buildPath, extractData } from "@/helpers/content-util";

type ResponseData = {
    message?: string,
    data: IData | null
}

type IData = {
    id: number,
    title: string,
    exercises: IExercises[]
}

type IExercises = {
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