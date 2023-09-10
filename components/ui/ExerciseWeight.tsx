import React from "react";
import { Spinner } from "react-bootstrap";
import CreateExerciseWeightModal from "../trainingDay/TrainingExercises/CreateExerciseWeightModal/CreateExerciseWeightModal";
import EditExerciseWeightModal from "../trainingDay/TrainingExercises/EditExerciseWeightModal/EditExerciseWeightModal";
import styles from "./ExerciseWeight.module.css";

const ExerciseWeight = ({ exerciseId }: {exerciseId: number}) => {
    const [loading, setLoading] = React.useState(false);
    const [exerciseWeight, setExerciseWeight] = React.useState("");
    
     /** Modal state */
     const [showCreateExerciseWeightModal, setShowCreateExerciseWeightModal] = React.useState(false);
     const [showEditExerciseWeightModal, setShowEditExerciseWeightModal] = React.useState(false);

     /** Create Exercise Weight modal */
     const handleShowCreateExerciseWeightModal = () => setShowCreateExerciseWeightModal(true);
     const handleCloseCreateExerciseWeightModal = () => setShowCreateExerciseWeightModal(false);

     /** Edit Exercise Weight modal */
     const handleShowEditExerciseWeightModal = () => setShowEditExerciseWeightModal(true);
     const handleCloseEditExerciseWeightModal = () => setShowEditExerciseWeightModal(false);

    React.useEffect(() => {
        /** Get Exercise Weight */
        const handleGetExerciseWeight = async () => {
            setLoading(true);

            const response = await fetch(`/api/exercise/?exerciseId=${exerciseId}`);

            if (response.ok) {
                setLoading(false);

                const result = await response.json() as { weight: string };

                setExerciseWeight(result.weight);
            }

            else setLoading(false);
        }

        handleGetExerciseWeight();
    }, [exerciseId]);

    return (
        <>
            {loading ?
                (
                    <button className={styles.exerciseWeightButton}
                        disabled>
                        <Spinner animation="border" variant="light" size="sm" />
                    </button>
                ) : (
                    (exerciseWeight === "" ? 
                        (
                            <button className={styles.exerciseWeightButton}
                                onClick={handleShowCreateExerciseWeightModal}>
                                Adicionar Carga
                            </button>
                        ) : (
                            <button className={styles.exerciseWeightButton}
                                onClick={handleShowEditExerciseWeightModal}>
                                {exerciseWeight} kg
                            </button>
                        )
                    )
                )
            }

            {/* Create Exercise Weight modal */}
            <CreateExerciseWeightModal exerciseId={exerciseId}
                setExerciseWeight={setExerciseWeight}
                showCreateExerciseWeightModal={showCreateExerciseWeightModal}
                handleCloseCreateExerciseWeightModal={handleCloseCreateExerciseWeightModal} />

            {/* Edit Exercise Weight modal */}
            <EditExerciseWeightModal exerciseId={exerciseId}
                showEditExerciseWeightModal={showEditExerciseWeightModal}
                handleCloseEditExerciseWeightModal={handleCloseEditExerciseWeightModal} />
        </>
    )
}

export default ExerciseWeight