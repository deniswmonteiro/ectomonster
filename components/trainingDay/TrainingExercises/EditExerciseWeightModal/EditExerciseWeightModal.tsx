import React from "react";
import useForm from "@/hooks/useForm";
import { Modal, Spinner } from "react-bootstrap";
import InputComponent from "@/components/forms/InputComponent";
import ButtonComponent from "@/components/forms/ButtonComponent";

type IEditExerciseWeightModal = {
    exerciseId: number,
    showEditExerciseWeightModal: boolean,
    handleCloseEditExerciseWeightModal: () => void
}

const EditExerciseWeightModal = ({ exerciseId, showEditExerciseWeightModal, handleCloseEditExerciseWeightModal }: IEditExerciseWeightModal) => {
    const weight = useForm({ type: "exerciseWeight" });
    const [loading, setLoading] = React.useState(false);

    const handleEditExerciseWeightFormSubmit = () => {
        //
    }

    return (
        <Modal show={showEditExerciseWeightModal} onHide={handleCloseEditExerciseWeightModal}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Carga</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleEditExerciseWeightFormSubmit}>
                    {/* Exercise Weight */}
                    <InputComponent inputGroup={true}
                        inputGroupText="kg"
                        label="Carga"
                        type="text"
                        id="exercise-weight"
                        {...weight} />

                    {loading ? 
                        (
                            <ButtonComponent type="submit" style="success"
                                disabled>
                                <Spinner animation="border" variant="light" size="sm" />
                            </ButtonComponent>
                        ) : (
                            <ButtonComponent type="submit" style="success">
                                Salvar
                            </ButtonComponent>
                        )
                    }
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default EditExerciseWeightModal