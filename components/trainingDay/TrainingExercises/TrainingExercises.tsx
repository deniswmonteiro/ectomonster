import React from "react";
import { Badge, Carousel } from "react-bootstrap";
import ProgressBarComponent from "@/components/ui/ProgressBarComponent";
import PlayIcon from "@/components/icons/play-icon";
import StopIcon from "@/components/icons/stop-icon";
import styles from "./TrainingExercises.module.css";

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
    description?: string
}

const TrainingExercises = ({ training }: { training: IData }) => {
    const [timer, setTimer] = React.useState(0);

    return (
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
                            <div className={styles.timer}>
                                <ProgressBarComponent now={timer} />

                                <span>Descanso</span>
                                <p>1:30</p>
                                
                                <button>
                                    <PlayIcon />
                                    {/* <StopIcon /> */}
                                </button>
                            </div>
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

                        <button className={styles.exerciseWeightButton}>
                            Adicionar Carga
                        </button>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default TrainingExercises