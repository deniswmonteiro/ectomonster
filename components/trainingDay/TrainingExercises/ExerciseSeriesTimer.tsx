import React from "react";
import ExerciseTimerIndicator from "./ExerciseTimerIndicator";
import styles from "./ExerciseSeriesTimer.module.css";

type IExerciseSeriesTimer = {
    id: number,
    pause: number,
    series: number
}

const ExerciseSeriesTimer = ({ id, pause, series }: IExerciseSeriesTimer ) => {
    const [qtyTimer, setQtyTimer] = React.useState<number[]>([]);
    const [serieListDone, setSerieListDone] = React.useState<number[]>([]);

    React.useEffect(() => {
        const arrPauses: number[] = [];

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
                <ExerciseTimerIndicator key={index} id={id}
                    pause={timer}
                    serie={index + 1}
                    setSerieListDone={setSerieListDone}
                    serieListDone={serieListDone} />
            ))}
        </div>
    )
}

export default ExerciseSeriesTimer