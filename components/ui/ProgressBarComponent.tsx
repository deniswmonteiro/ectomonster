import ProgressBar from "react-bootstrap/ProgressBar";
import styles from "./ProgressBarComponent.module.css";

const ProgressBarComponent = ({ now }: { now: number }) => {
    return (
        <ProgressBar now={now} className={styles.progressBar} />
    )
}

export default ProgressBarComponent