import React from "react";
import PlayIcon from "../icons/play-icon";
import StopIcon from "@/components/icons/stop-icon";
import styles from "./Timer.module.css";
import TimerModal from "../trainingDay/TrainingExercises/TimerModal/TimerModal";
import CheckIcon from "../icons/check-icon";

type ITimer = {
    pause: number,
    serie: number,
    qtySeries: number,
}

const Timer = ({ pause, serie, qtySeries }: ITimer) => {
    const [timer, setTimer] = React.useState(0);
    const [timerStarted, setTimerStarted] = React.useState(false);
    const [exerciseDone, setExerciseDone] = React.useState(false);

    // Modal state
    const [showTimerModal, setShowTimerModal] = React.useState(false);

    /** Timer modal */
    const handleShowTimerModal = () => setShowTimerModal(true);
    const handleCloseTimerModal = () => setShowTimerModal(false);

    const handleTimerModal = () => {
        handleShowTimerModal();
        setTimeout(() => setExerciseDone(true), 1000);
    }

    return (
        <>
            <div className={styles.timer}>
                <p>Série {serie}</p>

                {timerStarted ?
                    (
                        (!exerciseDone ? 
                            (
                                <button onClick={handleTimerModal}>
                                    <StopIcon />
                                </button>
                            ) : (
                                <button className={styles.exerciseDoneButton}>
                                    <CheckIcon />
                                </button>
                            )
                        )
                    ) : (
                        <button onClick={() => setTimerStarted(!timerStarted)}>
                            <PlayIcon />
                        </button>
                    )
                }
            </div>

            {/* Timer modal */}
            <TimerModal pause={pause}
                serie={serie}
                qtySeries={qtySeries}
                showTimerModal={showTimerModal}
                handleCloseTimerModal={handleCloseTimerModal} />
        </>
    )
}

export default Timer