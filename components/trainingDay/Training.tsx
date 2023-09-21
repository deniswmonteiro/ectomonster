import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../layout/Header";
import TrainingDayCard from "./TrainingDayCard/TrainingDayCard";
import styles from "./Training.module.css";

const trainingDays = [
    "Segunda", "Terca", "Quarta", "Quinta", "Sexta"
];

const Training = ({ weekId }: { weekId: string }) => {
    const { data: session } = useSession();
    const router = useRouter();

    React.useEffect(() => {
        /** User logout if session is null */
        async function handleLogout() {
            const logout = await signOut({
                redirect: false,
                callbackUrl: "/login"
            });

            router.replace(logout.url);
        }

        if (session === null) handleLogout();
    }, [router, session]);

    if (session !== null) {
        return (
            <>
                <Header backNavigation={true} href="/" />

                <section className={`container animeLeft ${styles.training}`}>
                    <h1 className="title-1">
                        {weekId.replace("-", " ")}
                    </h1>
                
                    {trainingDays.map((day) => (
                        <TrainingDayCard key={day} week={weekId} day={day} />
                    ))}
                </section>
            </>
        )
    }

    else return null;
}

export default Training