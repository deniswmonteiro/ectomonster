import React from "react";
import { Badge, Carousel } from "react-bootstrap";
import ExerciseSeriesTimer from "./ExerciseSeriesTimer";
import ExerciseWeight from "@/components/ui/ExerciseWeight";
import styles from "./TrainingExercises.module.css";

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

const TrainingExercises = ({ training }: { training: IData }) => {
    return (
        <div className="animeLeft">
            <Carousel controls={false} interval={null}>
                {Object.entries(training.exercises).map((exercise) => (
                    <Carousel.Item key={exercise[0]}>
                        {exercise[1]["is-grouping"] && (
                            <Badge className={styles.exerciseGroupingBadge}>
                                Bi-set
                            </Badge>
                        )}

                        <div className={styles.carouselBg}></div>

                        <Carousel.Caption className={styles.carouselContent}>
                            <div className={styles.exerciseContent}>
                                <h2 className="title-2">{exercise[1].name}</h2>

                                <div className={styles.exerciseInfo}>
                                    <p>
                                        <span>{exercise[1].series}</span> séries
                                    </p>

                                    {exercise[1]["reps-1"] === exercise[1]["reps-4"] ?
                                        (
                                            <p>
                                                {exercise[1].technique === "Rest pause 10s" ?
                                                    (
                                                        <span>{exercise[1]["reps-1"]} + Falha</span> 
                                                    ) : (
                                                        (exercise[1].technique === "Drop-set" ? 
                                                            (
                                                                <span>
                                                                    {exercise[1]["reps-1"]} + {exercise[1]["reps-4"]}
                                                                </span>
                                                            ) : (
                                                                <span>{exercise[1]["reps-1"]}</span>
                                                            )
                                                        )
                                                    )
                                                } repetições
                                            </p>
                                        ) : (
                                            (exercise[1]["reps-2"] !== 0 && exercise[1]["reps-3"] === 0 ?
                                                (
                                                    <p>
                                                        <span>{exercise[1]["reps-1"]} + {exercise[1]["reps-2"]} + {exercise[1]["reps-4"]}</span> repetições
                                                    </p>
                                                ) : (
                                                    (exercise[1]["reps-3"] !== 0 ?
                                                        (
                                                            <p>
                                                                <span>{exercise[1]["reps-1"]} + {exercise[1]["reps-2"]} + {exercise[1]["reps-3"]} + {exercise[1]["reps-4"]}</span> repetições
                                                            </p>
                                                        ) : (
                                                            <p>
                                                                <span>{exercise[1]["reps-1"]}</span> &ndash; <span>{exercise[1]["reps-4"]}</span> repetições
                                                            </p>
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    }
                                </div>

                                <ExerciseSeriesTimer id={exercise[1].exerciseId}
                                    pause={exercise[1].pause}
                                    series={exercise[1].series} />

                                <div className={styles.exerciseDetails}>
                                    <p>
                                        <span>Técnica:</span> {exercise[1].technique}
                                    </p>
                                    
                                    {exercise[1].description !== "null" && (
                                        <p>
                                            {exercise[1].description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <ExerciseWeight exerciseId={exercise[1].exerciseId} weight={exercise[1].weight} />
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    )
}

export default TrainingExercises