import React from "react";
import useForm from "@/hooks/useForm";
import { Modal, Spinner } from "react-bootstrap";
import InputComponent from "@/components/forms/InputComponent";
import ButtonComponent from "@/components/forms/ButtonComponent";

type IExerciseWeightModal = {
    exerciseId: number,
    exerciseWeight: string,
    setExerciseWeight: React.Dispatch<React.SetStateAction<string>>,
    showExerciseWeightModal: boolean,
    handleCloseExerciseWeightModal: () => void
}

const ExerciseWeightModal = ({ exerciseId, exerciseWeight, setExerciseWeight, showExerciseWeightModal, handleCloseExerciseWeightModal }: IExerciseWeightModal) => {
    const weight = useForm({ type: "exerciseWeight", initial: exerciseWeight });
    const [loading, setLoading] = React.useState(false);

    /** Close modal and reset form */
    const hideExerciseWeightModal = (saved: boolean) => {
        handleCloseExerciseWeightModal();

        if (!saved && exerciseWeight === "") weight.setValue("")
        
        weight.setMessage(null);
        weight.setValid(null);
    }

    /** Submit form with exercise data */
    const handleExerciseWeightFormSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        if (weight.validate()) {
            // setLoading(true);

            const response = await fetch("/api/exercises", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    exerciseId,
                    weight: weight.value
                })
            });

            const result = await response.json() as {
                message: string,
                weight: string
            };

            if (response.ok) { 
                hideExerciseWeightModal(true);
                // setLoading(false);
                setExerciseWeight(result.weight);
            }

            // else setLoading(false);
        }
    }

    return (
        <Modal show={showExerciseWeightModal} onHide={() => hideExerciseWeightModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {exerciseWeight === "" ? "Adicionar" : "Editar"} Carga
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleExerciseWeightFormSubmit}>
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

export default ExerciseWeightModal