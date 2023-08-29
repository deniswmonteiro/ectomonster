import React from "react";
import Header from "../layout/Header";
import Calendar from "../ui/Calendar";
import PersonCircleIcon from "../icons/person-circle-icon";
import styles from "./HomeAuthenticated.module.css";
import ProfileModal from "./ProfileModal/ProfileModal";

type IUserData = {
    name: string,
    gender: "1" | "2",
    weight: string,
    height: string
}

const HomeAuthenticated = ({ user }: { user: IUserData }) => {
    // Modal state
    const [showProfileModal, setShowProfileModal] = React.useState(false);
    const [showLogoutModal, setShowLogoutModal] = React.useState(false);
    
    /** Profile modal */
    const handleShowProfileModal = () => setShowProfileModal(true);
    const handleCloseProfileModal = () => setShowProfileModal(false);

    /** Logout modal */
    const handleShowLogoutModal = () => setShowLogoutModal(true);
    const handleCloseLogoutModal = () => setShowLogoutModal(false);

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
                    <Calendar />
                </div>
                <div className={styles.workouts}>
                    <div className={styles.workoutsTitle}>
                        <h2 className="title-2">Meu Treino</h2>

                        {/* {training.length > 0 &&
                            (
                                <button type="button" className={styles.btnCreateTraining}
                                    onClick={handleCreateTrainingPlan}>
                                    <PlusCircleFillIcon />
                                </button>
                            )
                        } */}
                    </div>

                    {/* {training.length > 0 ?
                        (
                            training.map((plan) => (
                                <TrainingPlanCard key={plan.id} plan={plan}
                                    setTrainingData={setTrainingData}
                                    trainingName={trainingName}
                                    setTrainingDays={setTrainingDays}
                                    handleShowEditTrainingModal={handleShowEditTrainingModal}
                                    handleShowDeleteTrainingPlanModal={handleShowDeleteTrainingPlanModal} />
                            ))
                        ) : (
                            <button type="button" onClick={handleCreateTrainingPlan}>
                                <Card className={styles.cardBgBlue}>
                                    <Card.Body className={styles.cardBgBlueContent}>
                                        <p>
                                            Criar um <span>plano de treino</span>
                                        </p>
                                        <PlusIcon />
                                    </Card.Body>
                                </Card>
                            </button>
                        )
                    } */}
                </div>
            </section>

            {/* Profile modal */}
            <ProfileModal user={user}
                showProfileModal={showProfileModal}
                handleCloseProfileModal={handleCloseProfileModal}
                handleShowLogoutModal={handleShowLogoutModal} />

            {/* Logout modal */}
            {/* <LogoutModal showLogoutModal={showLogoutModal}
                handleCloseLogoutModal={handleCloseLogoutModal} /> */}
        </>
    )
}

export default HomeAuthenticated