import React from "react";
import TimerModal from "./TimerModal/TimerModal";
import StopIcon from "@/components/icons/stop-icon";
import PlayIcon from "@/components/icons/play-icon";
import CheckIcon from "@/components/icons/check-icon";
import styles from "./ExerciseTimerIndicator.module.css";

type IExerciseTimerIndicator = {
    pause: number,
    serie: number,
    qtySeries: number,
}

const ExerciseTimerIndicator = ({ pause, serie, qtySeries }: IExerciseTimerIndicator) => {
    const [timerStarted, setTimerStarted] = React.useState(false);
    const [exerciseDone, setExerciseDone] = React.useState(false);

    // Modal state
    const [showTimerModal, setShowTimerModal] = React.useState(false);

    /** Timer modal */
    const handleShowTimerModal = () => setShowTimerModal(true);
    const handleCloseTimerModal = () => setShowTimerModal(false);

    const handleTimerModal = () => {
        if (pause > 0) {
            handleShowTimerModal();
            setTimeout(() => setExerciseDone(true), 1000);
        }

        else setExerciseDone(true);
    }

    return (
        <>
            <div className={styles.timerIndicator}>
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

export default ExerciseTimerIndicator