import React from "react";
import TimerModal from "./TimerModal/TimerModal";
import StopIcon from "@/components/icons/stop-icon";
import PlayIcon from "@/components/icons/play-icon";
import CheckIcon from "@/components/icons/check-icon";
import styles from "./ExerciseTimerIndicator.module.css";

type IExerciseTimerIndicator = {
    id: number,
    pause: number,
    serie: number,
}

const ExerciseTimerIndicator = ({ id, pause, serie }: IExerciseTimerIndicator) => {
    const [timerStarted, setTimerStarted] = React.useState(false);
    const [exerciseDone, setExerciseDone] = React.useState(false);
    const [serieDone, setSerieDone] = React.useState(false);
    const [exerciseSerieDone, setExerciseSerieDone] = React.useState("");

    /** Modal state */
    const [showTimerModal, setShowTimerModal] = React.useState(false);

    /** Timer modal */
    const handleShowTimerModal = () => setShowTimerModal(true);
    const handleCloseTimerModal = () => setShowTimerModal(false);

    const handleTimerModal = () => {
        if (pause > 0) {
            handleShowTimerModal();
            setTimeout(() => setSerieDone(true), 1000);
        }

        else setSerieDone(true);
    }

    React.useEffect(() => {
        const serieId = String(id).concat(String(serie));
        
        const setSerieDone = () => {
            if (serieDone) window.localStorage.setItem(`Serie-${serieId}`, `${serieId}`);
        }
        
        const getSerieDone = () => {
            const done = window.localStorage.getItem(`Serie-${serieId}`)

            if (done) setExerciseSerieDone(done.slice(-1));
        }

        setSerieDone();
        getSerieDone();
    }, [serieDone, id, serie]);

    return (
        <>
            <div className={styles.timerIndicator}>
                <p>Série {serie}</p>

                {serie === Number(exerciseSerieDone) ? 
                    (
                        <button className={styles.serieDoneButton}>
                            <CheckIcon />
                        </button>
                    ) : (
                        (timerStarted ?
                            (
                                (!serieDone ? 
                                    (
                                        <button onClick={handleTimerModal}>
                                            <StopIcon />
                                        </button>
                                    ) : (
                                        <button className={styles.serieDoneButton}>
                                            <CheckIcon />
                                        </button>
                                    )
                                )
                            ) : (
                                <button onClick={() => setTimerStarted(!timerStarted)}>
                                    <PlayIcon />
                                </button>
                            )
                        )
                    )
                }
            </div>

            {/* Timer modal */}
            <TimerModal pause={pause}
                serie={serie}
                showTimerModal={showTimerModal}
                handleCloseTimerModal={handleCloseTimerModal} />
        </>
    )
}

export default ExerciseTimerIndicator