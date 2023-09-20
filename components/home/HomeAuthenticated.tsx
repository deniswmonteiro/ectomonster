import React from "react";
import Header from "../layout/Header";
import Calendar from "../ui/Calendar";
import ProfileModal from "./ProfileModal/ProfileModal";
import LogoutModal from "./LogoutModal/LogoutModal";
import TrainingWeekCard from "./TrainingWeekCard/TrainingWeekCard";
import PersonCircleIcon from "../icons/person-circle-icon";
import styles from "./HomeAuthenticated.module.css";
import { getWithExpiry } from "@/helpers/localstorage-util";

type IUserData = {
    name: string,
    gender: "1" | "2",
    weight: string,
    height: string
}

const trainingWeeks = [
    "Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 5", "Semana 6", "Semana 7", "Semana 8", "Semana 9", "Semana 10", "Semana 11", "Semana 12", 
];

const HomeAuthenticated = ({ user }: { user: IUserData }) => {
    const [dayDone, setDayDone] = React.useState("");

    /** Modal state */
    const [showProfileModal, setShowProfileModal] = React.useState(false);
    const [showLogoutModal, setShowLogoutModal] = React.useState(false);
    
    /** Profile modal */
    const handleShowProfileModal = () => setShowProfileModal(true);
    const handleCloseProfileModal = () => setShowProfileModal(false);

    /** Logout modal */
    const handleShowLogoutModal = () => setShowLogoutModal(true);
    const handleCloseLogoutModal = () => setShowLogoutModal(false);

    React.useEffect(() => {
        /** Get day done from local storage */
        const calendarData = getWithExpiry(`Calendar`) as string;

        if (calendarData !== null) setDayDone(calendarData);
    }, []);

    return (
        <>
            <Header />

            <section className="container animeLeft">
                <div className={styles.title}>
                    <h1 className="title-1">
                        Olá, {user.name}
                    </h1>
                    <button onClick={handleShowProfileModal}>
                        <PersonCircleIcon />
                    </button>
                </div>
                <div className={styles.workoutsWeek}>
                    <h3 className="title-3">Treinos feitos na semana</h3>
                    <Calendar dayDone={dayDone} />
                </div>
                <div className={styles.workouts}>
                    <h2 className="title-2">Plano de Treino</h2>

                    {trainingWeeks.map((week) => (
                        <TrainingWeekCard key={week} week={week} />
                    ))}
                </div>
            </section>

            {/* Profile modal */}
            <ProfileModal user={user}
                showProfileModal={showProfileModal}
                handleCloseProfileModal={handleCloseProfileModal}
                handleShowLogoutModal={handleShowLogoutModal} />

            {/* Logout modal */}
            <LogoutModal showLogoutModal={showLogoutModal}
                handleCloseLogoutModal={handleCloseLogoutModal} />
        </>
    )
}

export default HomeAuthenticated