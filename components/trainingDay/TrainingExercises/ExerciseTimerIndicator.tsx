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
    serieListDone: number[],
    setSerieListDone: React.Dispatch<React.SetStateAction<number[]>>   
}

const ExerciseTimerIndicator = ({ id, pause, serie, serieListDone, setSerieListDone }: IExerciseTimerIndicator) => {
    const [timerStarted, setTimerStarted] = React.useState(false);
    const [exerciseDone, setExerciseDone] = React.useState(false);
    const [serieDone, setSerieDone] = React.useState(false);
    const [exerciseSerieListDone, setExerciseSerieListDone] = React.useState([]);

    /** Modal state */
    const [showTimerModal, setShowTimerModal] = React.useState(false);

    /** Timer modal */
    const handleShowTimerModal = () => setShowTimerModal(true);
    const handleCloseTimerModal = () => setShowTimerModal(false);

    const handleTimerModal = () => {
        if (pause > 0) {
            handleShowTimerModal();
            setSerieDone(true);

            setSerieListDone((serieListDone) => [...serieListDone, serie]);
        }

        else {
            setSerieDone(true);
            setSerieListDone((serieListDone) => [...serieListDone, serie]);
        }
    }

    React.useEffect(() => {
        /** Save done series in local storage */
        const setSerieDone = () => {
            window.localStorage.setItem(`Exercise-${id}`, JSON.stringify(serieListDone));
        }

        if (serieListDone.length > 0) setSerieDone();

        /** Get done series from local storage */
        const getSerieDone = () => {
            const done = window.localStorage.getItem(`Exercise-${id}`);

            if (done) setExerciseSerieListDone(JSON.parse(done));
        }

        getSerieDone();
    }, [id, serieListDone]);

    return (
        <>
            <div className={styles.timerIndicator}>
                <p>Série {serie}</p>

                {timerStarted ?
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
                }

                {/* {serie === Number(exerciseSerieDone) ? 
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
                } */}
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