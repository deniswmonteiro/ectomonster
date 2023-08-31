import React from "react";
import Header from "../layout/Header";
import TrainingDayCard from "./TrainingDayCard/TrainingDayCard";
import styles from "./Training.module.css";

const trainingDays = [
    "Segunda", "Terça", "Quarta", "Quinta", "Sexta"
];

const Training = ({ weekId }: { weekId: string }) => {
    return (
        <>
            <Header backNavigation={true} href="/" />

            <section className={`container animeLeft ${styles.training}`}>
                <h1 className="title-1">{weekId.replace("-", " ")}</h1>
            
                {trainingDays.map((day) => (
                    <TrainingDayCard key={day} week={weekId} day={day} />
                ))}
            </section>
        </>
    )
}

export default Training