import React from "react";
import useForm from "@/hooks/useForm";
import { useRouter } from "next/router";
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

const ExerciseWeightModal = ({ exerciseId, exerciseWeight, setExerciseWeight, showExerciseWeightModal, handleCloseExerciseWeightModal }: IExerciseWeightModal ) => {
    const weight = useForm({ type: "exerciseWeight" });
    const [week, setWeek] = React.useState("");
    const [day, setDay] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        if (router.query.dia) {
            setWeek(router.query.dia[0]);
            setDay(router.query.dia[1]);
        }
    }, [router.query.dia]);

    /** Close modal and reset form */
    const hideExerciseWeightModal = () => {
        handleCloseExerciseWeightModal();
        weight.setValue("");
        weight.setMessage(null);
        weight.setValid(null);
    }

    /** Submit form with exercise data */
    const handleExerciseWeightFormSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        if (weight.validate()) {
            setLoading(true);

            const response = await fetch("/api/exercise", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    exerciseId,
                    week,
                    day,
                    weight: weight.value
                })
            });

            const result = await response.json() as {
                message: string,
                weight: string
            };

            if (response.ok) { 
                hideExerciseWeightModal();
                setLoading(false);
                setExerciseWeight(result.weight);
            }

            else setLoading(false);
        }
    }

    return (
        <Modal show={showExerciseWeightModal} onHide={hideExerciseWeightModal}>
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