import React from "react";
import TimerModal from "./TimerModal/TimerModal";
import StopIcon from "@/components/icons/stop-icon";
import CheckIcon from "@/components/icons/check-icon";
import PlayIcon from "@/components/icons/play-icon";
import styles from "./ExerciseTimerIndicator.module.css";

type IExerciseTimerIndicator = {
    id: number,
    pause: number,
    serieListDone: ISeriesList[],
    setSerieListDone: React.Dispatch<React.SetStateAction<ISeriesList[]>>
}

type ISeriesList = {
    serie: number;
    done: boolean;
}

type IStorageExerciseData = {
    data: [ISeriesList],
    expiry: number
}

const ExerciseTimerIndicator = ({ id, pause, serieListDone, setSerieListDone }: IExerciseTimerIndicator) => {
    const [serieStarted, setSerieStarted] = React.useState(0);
    const [exerciseFinished, setExerciseFinished] = React.useState(false);

    /** Modal state */
    const [showTimerModal, setShowTimerModal] = React.useState(false);

    /** Timer modal */
    const handleShowTimerModal = () => setShowTimerModal(true);
    const handleCloseTimerModal = () => setShowTimerModal(false);

    /** When the series is started */
    const handleSerieStarted = (serie: number) => {
        if (serie === 1) setSerieStarted(serie);

        else {
            serieListDone.find((serieId) => {
                if (serieId.serie === serie - 1) {
                    if (serieId.done) setSerieStarted(serie);
                }
            });
        }
    }

    /** When the series is finished */
    const handleSerieFinished = (serie: number) => {
        // Show modal with timer if is a non-zero pause
        if (pause > 0) handleShowTimerModal();

        serieListDone.find((serieId) => {
            if (serieId.serie === serie) return serieId.done = true;
        });

        setSerieListDone((serieListDone) => [...serieListDone]);

        // Save done series in local storage expiring in one day
        setWithExpiry(`Exercise-${id}`, serieListDone, 86400000);

        handleExerciseDone();
    }

    /** Set exercise as done if all series are finished */
    const handleExerciseDone = React.useCallback(() => {
        const exercisesSeries = window.localStorage.getItem(`Exercise-${id}`);

        if (exercisesSeries !== null) {
            const storagedSeries = JSON.parse(exercisesSeries) as IStorageExerciseData;
            const seriesDone = storagedSeries.data.every((item: ISeriesList) => item.done);

            if (seriesDone) setExerciseFinished(true);
        }
    }, [id]);

    /** Save done series in local storage expiring in one day */
    function setWithExpiry(key: string, value: ISeriesList[], ttl: number) {
        const now = new Date();

        const item = {
            data: value,
            expiry: now.getTime() + ttl,
        }

        localStorage.setItem(key, JSON.stringify(item));
    }

    /** Get done series from local storage */
    function getWithExpiry(key: string) {
        const itemStr = localStorage.getItem(key);

        // If the item doesn't exist, return null
        if (!itemStr) return null;

        const item = JSON.parse(itemStr) as IStorageExerciseData;
        const now = new Date();

        // Compare the expiry time of the item with the current time
        if (now.getTime() > item.expiry) {
            // If the item is expired, delete the item from storage and return null
            localStorage.removeItem(key);
            return null;
        }

        return item.data;
    }

    React.useEffect(() => {
        /** Get done series from local storage */
        const exerciseSeriesList = getWithExpiry(`Exercise-${id}`);

        if (exerciseSeriesList !== null) {
            setSerieListDone(exerciseSeriesList)
            handleExerciseDone()
        }
    }, [id, setSerieListDone, handleExerciseDone]);

    return (
        <>
            {!exerciseFinished ? 
                (serieListDone.map((item) => (
                    <div key={item.serie} className={styles.timerIndicator}>
                        <p>Série {item.serie}</p>

                        {item.done ? 
                            (
                                <button className={styles.serieDoneButton}>
                                    <CheckIcon />
                                </button>
                            ) : (
                                serieStarted === item.serie ?
                                    (
                                        <button onClick={() => handleSerieFinished(item.serie)}>
                                            <StopIcon />
                                        </button>
                                    ) : (
                                        <button onClick={() => handleSerieStarted(item.serie)}>
                                            <PlayIcon />
                                        </button>
                                    )
                            )
                        }
                    </div>
                ))) : (
                    <div className={styles.exerciseFinished}>
                        <p>Exercício concluído</p>
                        <CheckIcon />
                    </div>
                )
            }

            {/* Timer modal */}
            <TimerModal pause={pause}
                showTimerModal={showTimerModal}
                handleCloseTimerModal={handleCloseTimerModal} />
        </>
    )
}

export default ExerciseTimerIndicator