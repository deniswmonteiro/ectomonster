import React from "react";
import { Badge, ListGroup } from "react-bootstrap";
import styles from "./TrainingExercisesList.module.css";

type IExercise = {
    name: string,
    series: number,
    "reps-min": number,
    "reps-max": number,
    pause: number,
    technique: string
}

const TrainingExercisesList = ({ exercise }: { exercise: IExercise }) => {
    return (
        <ListGroup className={styles.exercise}>
            <ListGroup.Item className={styles.exerciseItem}>
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
        </ListGroup>
    )
}

export default TrainingExercisesList