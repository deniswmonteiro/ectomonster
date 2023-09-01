import React from "react";
import Header from "../layout/Header";
import { useRouter } from "next/router";
import TrainingExercisesList from "./TrainingExercisesList/TrainingExercisesList";
import styles from "./TrainingDay.module.css";

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
    grouping?: Omit<IExercises, "is-grouping" | "grouping"> 
}

const TrainingDay = ({ hasError, training}: { hasError: boolean, training: IData }) => {
    const router = useRouter();
    const [week, setWeek] = React.useState("");

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
                    <h1 className="title-1">
                        {training.title}
                    </h1>
                    
                    {Object.entries(training.exercises).map((exercise) => (
                        <TrainingExercisesList key={exercise[0]} exercise={exercise[1]} />
                    ))}
                </section>
            </>
        )
    }

    else return null;
}

export default TrainingDay