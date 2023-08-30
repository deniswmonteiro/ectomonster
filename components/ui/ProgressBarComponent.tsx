import ProgressBar from "react-bootstrap/ProgressBar";
import styles from "./ProgressBarComponent.module.css";

type IProgressBarComponent = {
    size: number
}

const ProgressBarComponent = ({ size }: IProgressBarComponent) => {
    return (
        <ProgressBar now={size} className={styles.progressBar} />
    )
}

export default ProgressBarComponent