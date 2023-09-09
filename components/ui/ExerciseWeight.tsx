import React from "react";
import ExerciseWeightModal from "../trainingDay/TrainingExercises/ExerciseWeightModal/ExerciseWeightModal";
import styles from "./ExerciseWeight.module.css";

const ExerciseWeight = ({ exerciseId }: {exerciseId: number}) => {
    const [exerciseWeight, setExerciseWeight] = React.useState("");
    
     /** Modal state */
     const [showExerciseWeightModal, setShowExerciseWeightModal] = React.useState(false);

     /** Exercise Weight modal */
     const handleShowExerciseWeightModal = () => setShowExerciseWeightModal(true);
     const handleCloseExerciseWeightModal = () => setShowExerciseWeightModal(false);

    return (
        <>
            <button className={styles.exerciseWeightButton}
                onClick={handleShowExerciseWeightModal}>
                {exerciseWeight === "" ? "Adicionar Carga" : `${exerciseWeight} kg`}
            </button>

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