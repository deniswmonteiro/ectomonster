import React from "react";
import Link from "next/link";
import { Card, Spinner } from "react-bootstrap";
import ArrowRightIcon from "../../icons/arrow-right-icon";
import styles from "./TrainingWeekCard.module.css";

const TrainingWeekCard = ({ week }: { week: string }) => {
    const [loading, setLoading] = React.useState(false);

    return (
        <div className={styles.trainingWeekCard}>
            <Link href={`/treino/${week.replace(" ", "-").toLowerCase()}`} onClick={() => setLoading(true)}>
                <Card className={styles.cardBgBlue}>
                    <Card.Body className={styles.cardBgBlueContent}>
                        <p>{week.split(" ")[0]} <span>{week.split(" ")[1]}</span></p>

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

export default TrainingWeekCard