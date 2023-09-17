import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/helpers/db-util";
import { WithId } from "mongodb";
import { validate } from "@/helpers/form-validate";

type ResponseData = {
    message?: string,
    data?: IData | null,
    weight?: string
}

type IData = {
    title: string;
    exercises: {
        exerciseId: number;
        name: string;
        series: number;
        "reps-min": number;
        "reps-avg"?: number;
        "reps-max": number;
        pause: number;
        technique: string;
        "is-grouping"?: boolean,
        description?: string,
        weight: number;
    }[]
}

type IExercisesData = {
    exerciseId: number,
    week: string,
    day: string,
    name: string,
    series: number,
    "reps-min": number,
    "reps-avg"?: number,
    "reps-max": number,
    pause: number,
    technique: string,
    "is-grouping"?: boolean,
    description?: string,
    weight: number
}

type ITraining = WithId<Document>[] & [IExercisesData]

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
        const day = req.query.day as string;

        try {
            const connect = await dbConnect();
            const db = connect.db();

            const exerciseWeek = (week.substring(0, 1).toUpperCase() + week.substring(1)).replace("-", " ");
            const exerciseDay = getDay(day);

            const training = await db.collection("training").find({
                $and: [
                    { week: exerciseWeek },
                    { day: exerciseDay }
                ]}).toArray() as ITraining;

            const trainingData = training.map((item: IExercisesData) => {
                return {
                    exerciseId: item.exerciseId,
                    name: item.name,
                    series: item.series,
                    "reps-min": item["reps-min"],
                    "reps-avg": item["reps-avg"],
                    "reps-max": item["reps-max"],
                    pause: item.pause,
                    technique: item.technique,
                    "is-grouping": item["is-grouping"],
                    description: item.description,
                    weight: item.weight
                }
            });

            const data = {
                title: `Treino de ${getDay(day)}`,
                exercises: trainingData
            }

            res.status(200).json({
                data
            });
        }

        catch (error) {
            res.status(500).json({
                message: "Dia de treino não encontrado.",
                data: null
            });
        }
    }

    if (req.method === "PATCH") {
        const { exerciseId, weight } = req.body as {
            exerciseId: number,
            weight: string
        }

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
                const exercises = connect.db().collection("training");
                const exercise = await exercises.findOne({ exerciseId });

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
                        message: "Carga atualizada com sucesso.",
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

export default handler