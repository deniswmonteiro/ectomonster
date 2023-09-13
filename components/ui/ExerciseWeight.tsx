import React from "react";
import ExerciseWeightModal from "../trainingDay/TrainingExercises/ExerciseWeightModal/ExerciseWeightModal";
import styles from "./ExerciseWeight.module.css";

const ExerciseWeight = ({ exerciseId, weight }: { exerciseId: number, weight: number }) => {
    const [exerciseWeight, setExerciseWeight] = React.useState(() => {
        return weight !== 0 ? weight.toString().replace(".", ",") : "";
    });
    
    /** Modal state */
    const [showExerciseWeightModal, setShowExerciseWeightModal] = React.useState(false);

    /**  Exercise Weight modal */
    const handleShowExerciseWeightModal = () => setShowExerciseWeightModal(true);
    const handleCloseExerciseWeightModal = () => setShowExerciseWeightModal(false);

    return (
        <>  
            {exerciseWeight === "" ? 
                (
                    <button className={styles.exerciseWeightButton}
                        onClick={handleShowExerciseWeightModal}>
                        Adicionar Carga
                    </button>
                ) : (
                    <button className={styles.exerciseWeightButton}
                        onClick={handleShowExerciseWeightModal}>
                        {exerciseWeight} kg
                    </button>
                )
            }

            {/* Exercise Weight modal */}
            <ExerciseWeightModal exerciseId={exerciseId}
                exerciseWeight={exerciseWeight}
                setExerciseWeight={setExerciseWeight}
                showExerciseWeightModal={showExerciseWeightModal}
                handleCloseExerciseWeightModal={handleCloseExerciseWeightModal} />
        </>
    )
}

export default ExerciseWeight