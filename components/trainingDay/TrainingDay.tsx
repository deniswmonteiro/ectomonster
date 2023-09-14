import React from "react";
import { useSession } from "next-auth/react";
import Header from "../layout/Header";
import { useRouter } from "next/router";
import TrainingExercises from "./TrainingExercises/TrainingExercises";
import styles from "./TrainingDay.module.css";

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
}

const TrainingDay = ({ hasError, training}: { hasError: boolean, training: IData }) => {
    const [trainingData, setTrainingData] = React.useState<IData | null>(null)
    const [week, setWeek] = React.useState("");
    const { data: session } = useSession();
    const router = useRouter();

    React.useEffect(() => {
        if (router.query.dia) setWeek(router.query.dia[0]);

        async function handleExerciseWeight() {
            if (session && session.user) {
                const response = await fetch(`/api/exercises/?email=${session.user.email}`);
                const result = await response.json() as {
                    exercisesData: {
                        exerciseId: number,
                        weight: number
                    }[]
                };

                if (training) {
                    Object.entries(training.exercises).map((exercise) => {
                        result.exercisesData.map((data) => {
                            if (exercise[1].exerciseId === data.exerciseId) {
                                exercise[1].weight = data.weight;
                            }
                        })
                    })

                    setTrainingData(training);
                }
            }
        }

        handleExerciseWeight();
    }, [router.query.dia, session, training]);

    if (hasError) {
        return (
            <>
                <Header backNavigation={true} href={`/treino/${week}`} />
                <p>Não há treinos para esse dia.</p>
            </>
        )
    }

    if (!trainingData) return (
        <>
            <Header backNavigation={true} href={`/treino/${week}`} />
        
            <section className={`container animeLeft ${styles.trainingDay}`}>
                <p>carregando o treino...</p>
            </section>
        </>
    )

    if (trainingData) {
        return (
            <>
                <Header backNavigation={true} href={`/treino/${week}`} />

                <section className={`container animeLeft ${styles.trainingDay}`}>
                    <TrainingExercises training={trainingData} />
                </section>
            </>
        )
    }

    else return null;
}

export default TrainingDay