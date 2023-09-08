import React from "react";
import ExerciseTimerIndicator from "./ExerciseTimerIndicator";
import styles from "./ExerciseSeriesTimer.module.css";

type IExerciseSeriesTimer = {
    id: number,
    pause: number,
    series: number
}

const ExerciseSeriesTimer = ({ id, pause, series }: IExerciseSeriesTimer) => {
    const [serieListDone, setSerieListDone] = React.useState(() => {
        const seriesInfo = [];

        for (let i = 1; i <= series; i++) {
            seriesInfo.push({
                serie: i,
                done: false
            });
        }

        return seriesInfo;
    });

    return (
        <div className={styles.seriesTimer}>
            <ExerciseTimerIndicator id={id}
                pause={pause}
                serieListDone={serieListDone}
                setSerieListDone={setSerieListDone} />
        </div>
    )
}

export default ExerciseSeriesTimer