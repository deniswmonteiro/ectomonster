import React from "react";
import PlayIcon from "../icons/play-icon";
import StopIcon from "@/components/icons/stop-icon";
import styles from "./Timer.module.css";

const Timer = ({ pause, serie }: { pause: number, serie: number }) => {
    const [timer, setTimer] = React.useState(0);
    const [timerStarted, setTimerStarted] = React.useState(false);

    const handleExerciseTimer = () => {
        setTimerStarted(!timerStarted);
    }

    return (
        <div className={styles.timer}>
            <p>Série {serie}</p>

            {timerStarted ?
                (
                    <button>
                        <StopIcon />
                    </button>
                ) : (
                    <button onClick={handleExerciseTimer}>
                        <PlayIcon />
                    </button>
                )
            }
        </div>
    )
}

export default Timer