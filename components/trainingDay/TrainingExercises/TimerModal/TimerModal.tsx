import React from "react";
import { Modal } from "react-bootstrap";
import StopwatchIcon from "@/components/icons/stopwatch-icon";
import Timer from "@/components/ui/Timer";
import ButtonComponent from "@/components/forms/ButtonComponent";
import styles from "./TimerModal.module.css";

type ITimerModal = {
    pause: number,
    serie: number,
    showTimerModal: boolean,
    handleCloseTimerModal: () => void,
}

const TimerModal = ({ pause, serie, showTimerModal, handleCloseTimerModal }: ITimerModal) => {
    return (
        <Modal show={showTimerModal} className={styles.timerModal}>
            <Modal.Header>
                <Modal.Title>Descanso</Modal.Title>
                <StopwatchIcon />
            </Modal.Header>
            <Modal.Body>
                <h2 className="title-2">
                    Série concluída!
                </h2>

                <div className={styles.timerModalContent}>
                    <p>
                        Você finalizou mais uma série, descanse por <span>{pause} segundos</span> antes de iniciar a próxima série.
                    </p>
                </div>
                
                <Timer pause={pause} handleCloseTimerModal={handleCloseTimerModal} />

            </Modal.Body>
            <Modal.Footer className={styles.modalProfileFooter}>
                <ButtonComponent type="button" style="success"
                    onClick={handleCloseTimerModal}>
                    Parar Cronômetro
                </ButtonComponent>
            </Modal.Footer>
        </Modal>
    )
}

export default TimerModal