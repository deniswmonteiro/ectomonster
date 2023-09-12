import React from "react";
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
                    <TrainingExercises training={training} />
                </section>
            </>
        )
    }

    else return null;
}

export default TrainingDay