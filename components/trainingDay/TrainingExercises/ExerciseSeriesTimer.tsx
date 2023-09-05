import React from "react";
import ExerciseTimerIndicator from "./ExerciseTimerIndicator";
import styles from "./ExerciseSeriesTimer.module.css";

const ExerciseSeriesTimer = ({ pause, series }: { pause: number, series: number }) => {
    const [qtyTimer, setQtyTimer] = React.useState<number[]>([]);

    React.useEffect(() => {
        const arrPauses: number[] = []

        function createArray() {
            for (let i = 1; i <= series; i++) {
                arrPauses.push(pause);
            }
        }

        createArray();

        setQtyTimer(() => [...arrPauses]);
    }, [series, pause]);

    return (
        <div className={styles.seriesTimer}>
            {qtyTimer.map((timer, index) => (
                <ExerciseTimerIndicator key={index} pause={timer} serie={index + 1} qtySeries={series} />
            ))}
        </div>
    )
}

export default ExerciseSeriesTimer