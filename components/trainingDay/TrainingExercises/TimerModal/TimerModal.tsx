import React from "react";
import { Modal } from "react-bootstrap";
import ButtonComponent from "@/components/forms/ButtonComponent";
import styles from "./TimerModal.module.css";
import StopwatchIcon from "@/components/icons/stopwatch-icon";

type ITimerModal = {
    pause: number,
    serie: number,
    qtySeries: number,
    showTimerModal: boolean,
    handleCloseTimerModal: () => void,
}

const TimerModal = ({ pause, serie, qtySeries, showTimerModal, handleCloseTimerModal }: ITimerModal) => {
    const handleTimerStop = () => {
        handleCloseTimerModal();
    }

    return (
        <Modal show={showTimerModal} className={styles.timerModal}>
            <Modal.Header>
                <Modal.Title>Descanso</Modal.Title>
                <StopwatchIcon />
            </Modal.Header>
            <Modal.Body>
                <h2 className="title-2">
                    {serie !== qtySeries ? "Série concluída!" : "Exercício concluído!"}
                </h2>

                <div className={styles.timerModalContent}>
                    {serie !== qtySeries ?
                        (
                            <p>
                                Você finalizou mais uma série, descanse por <span>{pause} segundos</span> antes de iniciar a próxima série.
                            </p>
                        ) : (
                            <p>
                                Você finalizou mais um exercício, descanse por <span>{pause} segundos</span> antes de iniciar o próximo exercício.
                            </p>
                        )
                    }
                </div>
                <div className={styles.timer}>
                    <p>{pause}</p>
                </div>
            </Modal.Body>
            <Modal.Footer className={styles.modalProfileFooter}>
                <ButtonComponent type="button" style="success"
                    onClick={handleTimerStop}>
                    Parar Cronômetro
                </ButtonComponent>
            </Modal.Footer>
        </Modal>
    )
}

export default TimerModal