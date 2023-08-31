import React from "react";

type IExercise = {
    name: string,
    series: number,
    "reps-min": number,
    "reps-max": number,
    pause: number,
    technique: string
}


const TrainingExerciseCard = ({ exercise }: { exercise: IExercise }) => {
    return (
        <div>{exercise.name}</div>
    )
}

export default TrainingExerciseCard