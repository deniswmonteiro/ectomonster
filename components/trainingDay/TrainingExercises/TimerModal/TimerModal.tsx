import React from "react";
import { Modal } from "react-bootstrap";
import StopwatchIcon from "@/components/icons/stopwatch-icon";
import Timer from "@/components/ui/Timer";
import ButtonComponent from "@/components/forms/ButtonComponent";
import styles from "./TimerModal.module.css";

type ITimerModal = {
    pause: number,
    serie: number,
    qtySeries: number,
    showTimerModal: boolean,
    handleCloseTimerModal: () => void,
}

const TimerModal = ({ pause, serie, qtySeries, showTimerModal, handleCloseTimerModal }: ITimerModal) => {
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
                                Você finalizou uma série, descanse por <span>{pause} segundos</span> antes de iniciar a próxima série.
                            </p>
                        ) : (
                            <p>
                                Você finalizou um exercício, descanse por <span>{pause} segundos</span> antes de iniciar o próximo exercício.
                            </p>
                        )
                    }
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