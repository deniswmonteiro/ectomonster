import React from "react";
import Header from "../layout/Header";
import { useRouter } from "next/router";
import TrainingExerciseCard from "./TrainingExercisesCard/TrainingExerciseCard";
import styles from "./TrainingDay.module.css";

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

const TrainingDay = ({ hasError, training}: { hasError: boolean, training: IData }) => {
    const [week, setWeek] = React.useState("");
    const router = useRouter();

    React.useEffect(() => {
        if (router.query.dia) setWeek(router.query.dia[0]);
    }, [router.query.dia]);

    if (hasError) {
        return (
            <>
                <Header backNavigation={true} href={`/treino/${week}`} />
                <p>Não há treinos para esse dia.</p>
            </>
        )
    }

    if (training) {
        return (
            <>
                <Header backNavigation={true} href={`/treino/${week}`} />

                <section className={`container animeLeft ${styles.trainingDay}`}>
                    <h1 className="title-1">{training.title}</h1>
                
                    {Object.entries(training.exercises).map((exercise) => (
                        <TrainingExerciseCard key={exercise[0]} exercise={exercise[1]} />
                    ))}
                </section>
            </>
        )
    }

    else return null;
}

export default TrainingDay