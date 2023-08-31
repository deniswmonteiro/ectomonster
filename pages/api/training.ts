import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

type ResponseData = {
    message?: string,
    data: IData | null
}

type IData = {
    id: string,
    title: string,
    exercises: IExercises[]
}

type IExercises = {
    name: string,
    series: number,
    "reps-min": number,
    "reps-max": number,
    pause: number,
    technique: string
}

function buildPath(week: string, day: string) {
    return path.join(process.cwd(), `content/${week}`, `${day}.json`);
}

function extractData(filePath: string) {
    const fileData = fs.readFileSync(filePath);

    return JSON.parse(fileData.toString());
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