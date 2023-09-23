import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../layout/Header";
import TrainingExercises from "./TrainingExercises/TrainingExercises";
import { Spinner } from "react-bootstrap";
import styles from "./TrainingDay.module.css";

type IData = {
    id: number,
    title: string,
    exercises: IExercisesData[]
}

type IExercisesData = {
    exerciseId: number,
    name: string,
    series: number,
    "reps-1": number,
    "reps-2": number,
    "reps-3": number,
    "reps-4": number,
    pause: number,
    technique: string,
    "is-grouping": boolean,
    weight: number,
    description: string
}

const TrainingDay = ({ hasError, training}: { hasError: boolean, training: IData }) => {
    const [trainingData, setTrainingData] = React.useState<IData | null>(null);
    const [week, setWeek] = React.useState("");
    const { data: session } = useSession();
    const router = useRouter();

    /** Get user exercise weight */
    const handleExerciseWeight = React.useCallback(async () => {
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
    }, [session, training]);

    React.useEffect(() => {
        /** User logout if session is null */
        async function handleLogout() {
            const logout = await signOut({
                redirect: false,
                callbackUrl: "/login"
            });

            router.replace(logout.url);
        }

        if (session === null) handleLogout();

        else {
            if (router.query.dia) setWeek(router.query.dia[0]);

            handleExerciseWeight();
        }
    }, [router, router.query.dia, session, training, handleExerciseWeight]);

    if (session !== null) {
        if (hasError) {
            return (
                <>
                    <Header backNavigation={true} href={`/treino/${week}`} />
                    
                    <section className={`container animeLeft ${styles.trainingDay}`}>
                        <p>Não há treino para essa dia.</p>
                    </section>
                </>
            )
        }

        else {
            if (!trainingData) return (
                <>
                    <Header backNavigation={true} href={`/treino/${week}`} />
                
                    <section className={`container animeLeft ${styles.trainingDayLoading}`}>
                        <h1 className="title-1">
                            Seu treino está sendo carregado
                        </h1>
                        <Spinner animation="border" className={styles.loading} />
                    </section>
                </>
            )

            else {
                return (
                    <>
                        <Header backNavigation={true} href={`/treino/${week}`} />

                        <section className={`container animeLeft ${styles.trainingDay}`}>
                            <TrainingExercises training={trainingData} />
                        </section>
                    </>
                )
            }
        }
    }

    else return null;
}

export default TrainingDay