import React from "react";
import Link from "next/link";
import { Card, Spinner } from "react-bootstrap";
import ArrowRightIcon from "@/components/icons/arrow-right-icon";
import styles from "./TrainingDayCard.module.css";

const TrainingDayCard = ({ day, week }: { day: string, week: string }) => {
    const [loading, setLoading] = React.useState(false);

    return (
        <div className={styles.trainingDay}>
            <Link href={`/treino/${week}/${day.toLowerCase()}`} onClick={() => setLoading(true)}>
                <Card className={styles.cardBgBlue}>
                    <Card.Body className={styles.cardBgBlueContent}>
                        <p>Treino de <span>{day}</span></p>

                        {loading ? 
                            (
                                <Spinner animation="border" size="sm"
                                    className={styles.loading} />
                            ) : (
                                <ArrowRightIcon />
                            )
                        }
                    </Card.Body>
                </Card>
            </Link>
        </div>
    )
}

export default TrainingDayCard