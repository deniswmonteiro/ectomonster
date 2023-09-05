import React from "react";
import styles from "./Timer.module.css";

type ITimer = {
    handleCloseTimerModal: () => void,
    pause: number
}

const Timer = ({ pause, handleCloseTimerModal }: ITimer ) => {
    const [remaining, setRemaining] = React.useState(pause);

    React.useEffect(() => {
        const timer = () => {
            let pauseTime = pause;
            
            setRemaining((time) => {
                if (time > 0) return time - 1;

                else {
                    pauseTime = 0;
                    return 0;
                }
            });

            if (pauseTime === 0) {
                handleCloseTimerModal();
                clearInterval(downloadTimer);
            }
        }

        const downloadTimer = setInterval(timer, 1000);

        return () => clearInterval(downloadTimer);
    }, [pause, handleCloseTimerModal]);

    return (
        <div className={styles.timer}>
            <p>{remaining}</p>
        </div>
    )
}

export default Timer