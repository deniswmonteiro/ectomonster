import React from "react";
import TimerModal from "./TimerModal/TimerModal";
import StopIcon from "@/components/icons/stop-icon";
import CheckIcon from "@/components/icons/check-icon";
import PlayIcon from "@/components/icons/play-icon";
import styles from "./ExerciseTimerIndicator.module.css";

type IExerciseTimerIndicator = {
    id: number,
    pause: number,
    serieListDone: {
        serie: number;
        done: boolean;
    }[],
    setSerieListDone: React.Dispatch<React.SetStateAction<{
        serie: number;
        done: boolean;
    }[]>>
}

const ExerciseTimerIndicator = ({ id, pause, serieListDone, setSerieListDone }: IExerciseTimerIndicator) => {
    const [serieStarted, setSerieStarted] = React.useState(0);

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

        // Save done series in local storage
        window.localStorage.setItem(`Exercise-${id}`, JSON.stringify(serieListDone));
    }

    React.useEffect(() => {
        /** Get done series from local storage */
        const handleGetSerieDone = () => {
            const done = window.localStorage.getItem(`Exercise-${id}`);

            if (done !== null) setSerieListDone(JSON.parse(done));
        }

        handleGetSerieDone();
    }, [id, setSerieListDone]);

    return (
        <>
            {serieListDone.map((item) => (
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
            ))}

            {/* Timer modal */}
            <TimerModal pause={pause}
                showTimerModal={showTimerModal}
                handleCloseTimerModal={handleCloseTimerModal} />
        </>
    )
}

export default ExerciseTimerIndicator