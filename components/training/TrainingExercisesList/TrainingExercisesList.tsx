import React from "react";
import { Badge, ListGroup } from "react-bootstrap";
import styles from "./TrainingExercisesList.module.css";

type IExercise = {
    name: string,
    series: number,
    "reps-min": number,
    "reps-max": number,
    pause: number,
    technique: string,
    "is-grouping"?: boolean,
    grouping?: Omit<IExercise, "is-grouping" | "grouping"> 
}

const TrainingExercisesList = ({ exercise }: { exercise: IExercise }) => {
    return (
        <>
            <ListGroup className={`${styles.exercise} ${exercise["is-grouping"] ? styles.exerciseGrouping : ""}`}>
                <ListGroup.Item className={styles.exerciseItem}>
                    {exercise["is-grouping"] && (
                        <Badge className={styles.exerciseGroupingBadge}>
                            Bi-set
                        </Badge>
                    )}

                    <h2 className="title-2">{exercise.name}</h2>

                    <div className={styles.exerciseInfo}>
                        <Badge>Séries: {exercise.series}</Badge>

                        {exercise["reps-min"] === exercise["reps-max"] ?
                            (
                                <Badge>
                                    Repetições: {exercise["reps-min"]}
                                </Badge>
                            ) : (
                                <Badge>
                                    Repetições: {exercise["reps-min"]} a {exercise["reps-max"]}
                                </Badge>
                            )
                        }
                    </div>
                </ListGroup.Item>

                {exercise["is-grouping"] && (
                    <ListGroup.Item className={styles.exerciseItem}>
                        <h2 className="title-2">{exercise.grouping?.name}</h2>

                        <div className={styles.exerciseInfo}>
                            <Badge>Séries: {exercise.grouping?.series}</Badge>

                            {exercise.grouping?.["reps-min"] === exercise.grouping?.["reps-max"] ?
                                (
                                    <Badge>
                                        Repetições: {exercise.grouping?.["reps-min"]}
                                    </Badge>
                                ) : (
                                    <Badge>
                                        Repetições: {exercise.grouping?.["reps-min"]} a {exercise.grouping?.["reps-max"]}
                                    </Badge>
                                )
                            }
                        </div>
                    </ListGroup.Item>
                )}
            </ListGroup>
        </>
    )
}

export default TrainingExercisesList