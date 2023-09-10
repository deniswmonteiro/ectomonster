import React from "react";
import Link from "next/link";
import { Card, Spinner } from "react-bootstrap";
import PlayIcon from "@/components/icons/play-icon";
import styles from "./TrainingDayCard.module.css";

const TrainingDayCard = ({ day, week }: { day: string, week: string }) => {
    const [loading, setLoading] = React.useState(false);

    return (
        <div className={styles.trainingDayCard}>
            <Link href={`/treino/${week}/${day.toLowerCase()}`} onClick={() => setLoading(true)}>
                <Card className={styles.cardBgBlue}>
                    <Card.Body className={styles.cardBgBlueContent}>
                        <p>Treino de <span>{day === "Terca" ? "Terça" : day}</span></p>

                        {loading ? 
                            (
                                <Spinner animation="border" size="sm"
                                    className={styles.loading} />
                            ) : (
                                <PlayIcon />
                            )
                        }
                    </Card.Body>
                </Card>
            </Link>
        </div>
    )
}

export default TrainingDayCard