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
    const [week, setWeek] = React.useState("");
    const [day, setDay] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    // const router = useRouter();

    const handleEditExerciseWeightFormSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        // event.preventDefault();

        // if (weight.validate()) {
        //     // setLoading(true);

        //     const response = await fetch("/api/exercise", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({
        //             exerciseId,
        //             week,
        //             day,
        //             weight: weight.value
        //         })
        //     });

        //     const result = await response.json() as {
        //         message: string,
        //         weight: string
        //     };

        //     if (response.ok) { 
        //         hideExerciseWeightModal();
        //         // setLoading(false);
        //         setExerciseWeight(result.weight);
        //     }

        //     // else setLoading(false);
        // }
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