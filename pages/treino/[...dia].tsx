import React from "react";
import { GetStaticProps } from "next";
import TrainingDay from "@/components/training/TrainingDay";

type IResult = {
    data: IData
}

type IData = {
    id: string,
    title: string,
    exercises: IExercises[]
}

type IExercises = {
    name: string,
    series: number,
    "reps-min": number,
    "reps-max": number,
    pause: number,
    technique: string
}

const trainingDays = [
    "Segunda", "Terça", "Quarta", "Quinta", "Sexta"
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
        }
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