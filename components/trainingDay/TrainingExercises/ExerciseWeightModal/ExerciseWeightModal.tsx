import React from "react";
import useForm from "@/hooks/useForm";
import { Modal } from "react-bootstrap";
import InputComponent from "@/components/forms/InputComponent";
import ButtonComponent from "@/components/forms/ButtonComponent";
import styles from "./ExerciseWeightModal.module.css";

type IExerciseWeightModal = {
    showExerciseWeightModal: boolean,
    handleCloseExerciseWeightModal: () => void,
}

const ExerciseWeightModal = ({ showExerciseWeightModal, handleCloseExerciseWeightModal }: IExerciseWeightModal ) => {
    const exerciseWeight = useForm({ type: "exerciseWeight" });

    const handleExerciseWeightFormSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        
    }

    return (
        <Modal show={showExerciseWeightModal} onHide={handleCloseExerciseWeightModal}>
            <Modal.Header closeButton>
                <Modal.Title>Adicionar Carga</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleExerciseWeightFormSubmit}>
                    {/* Exercise Weight */}
                    <InputComponent inputGroup={true}
                        inputGroupText="kg"
                        label="Carga"
                        type="text"
                        id="exercise-weight"
                        {...exerciseWeight} />

                    <ButtonComponent type="submit" style="success">
                        Salvar
                    </ButtonComponent>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default ExerciseWeightModal