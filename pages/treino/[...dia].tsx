import React from "react";
import { GetStaticProps } from "next";
import TrainingDay from "@/components/trainingDay/TrainingDay";

type IResult = {
    data: IData
}

type IData = {
    id: number,
    title: string,
    exercises: IExercises
}

type IExercises = {
    [key: string]: IExercisesData
}

type IExercisesData = {
    exerciseId: number,
    name: string,
    series: number,
    "reps-1": number,
    "reps-2": number,
    "reps-3": number,
    "reps-4": number,
    pause: number,
    technique: string,
    "is-grouping": boolean,
    weight: number,
    description: string
}

const trainingDays = [
    "Segunda", "Terca", "Quarta", "Quinta", "Sexta"
];

const DayPage = ({ hasError, trainingData}: { hasError: boolean, trainingData: IData }) => {
    return (
        <TrainingDay hasError={hasError} training={trainingData} />
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const training = context.params?.dia as string[];
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/training/?week=${training[0]}&day=${training[1]}`);

    if (!response.ok) {
        return {
            props: {
                hasError: true
            }
        }
    }

    const result = await response.json() as IResult;
    const trainingData = result.data;

    return {
        props: {
            trainingData
        },
        revalidate: 10
    }
}

export async function getStaticPaths() {
    const paths = trainingDays.map((day) => ({ params: { dia: [ day ] } }));

    return {
        paths: paths,
        fallback: true
    }
}

export default DayPage