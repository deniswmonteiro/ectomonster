import React from "react";
import { Badge, Carousel } from "react-bootstrap";
import ExerciseSeriesTimer from "./ExerciseSeriesTimer";
import ExerciseWeight from "@/components/ui/ExerciseWeight";
import styles from "./TrainingExercises.module.css";

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
    weight?: number,
    "is-grouping"?: boolean,
    description?: string
}

const TrainingExercises = ({ training }: { training: IData }) => {
    return (
        <>
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
                                    
                                    {exercise[1]["reps-min"] === exercise[1]["reps-max"] ?
                                        (
                                            <p>
                                                <span>{exercise[1]["reps-min"]}</span> repetições
                                            </p>
                                        ) : (
                                            <p>
                                                <span>{exercise[1]["reps-min"]}</span> &ndash; <span>{exercise[1]["reps-max"]}</span> repetições
                                            </p>
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
                                    
                                    {exercise[1].description && (
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
        </>
    )
}

export default TrainingExercises