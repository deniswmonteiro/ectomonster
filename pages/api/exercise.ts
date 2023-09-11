import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { validate } from "@/helpers/form-validate";
import { buildPath, extractData, updateData } from "@/helpers/content-util";

type ResponseData = {
    message?: string,
    weight?: string | null
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
            const exercise: string = `exercise-${exerciseId}`;
            const filePath = buildPath(week, day);

            if (fs.existsSync(filePath)) {
                const data: IData = extractData(filePath);

                // Update exercise weight
                data.exercises[`${exercise}`].weight = Number(weight.replace(",", "."));

                updateData(filePath, data);

                res.status(201).json({
                    message: "Carga adicionada com sucesso.",
                    weight
                });
            }

            else {
                res.status(500).json({
                    message: "Erro de conexão com o banco de dados."
                });
            }
        }
    }
}

export default handler