import ProgressBar from "react-bootstrap/ProgressBar";
import styles from "./ProgressBarComponent.module.css";

type ProgressBarComponentProps = {
    size: number
}

const ProgressBarComponent = ({ size }: ProgressBarComponentProps) => {
    return (
        <ProgressBar now={size} className={styles.progressBar} />
    )
}

export default ProgressBarComponent