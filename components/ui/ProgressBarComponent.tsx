import ProgressBar from "react-bootstrap/ProgressBar";
import styles from "./ProgressBarComponent.module.css";

type IProgressBarComponent = {
    now: number,
}

const ProgressBarComponent = ({ now }: IProgressBarComponent) => {
    return (
        <ProgressBar now={now} className={styles.progressBar} />
    )
}

export default ProgressBarComponent