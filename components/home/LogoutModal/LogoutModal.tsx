import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { Modal } from "react-bootstrap";
import ButtonComponent from "@/components/forms/ButtonComponent";
import styles from "./LogoutModal.module.css";

type ILogoutModal = {
    showLogoutModal: boolean,
    handleCloseLogoutModal: () => void
}

const LogoutModal = ({ showLogoutModal, handleCloseLogoutModal }: ILogoutModal) => {
    const router = useRouter();

    /** User logout */
    async function handleLogout() {
        /** User logout if user is null */
        const logout = await signOut({
            redirect: false,
            callbackUrl: "/"
        });

        router.replace(logout.url);
    }

    return (
        <Modal show={showLogoutModal} onHide={handleCloseLogoutModal}
            className={styles.modalLogout}>
            <Modal.Header closeButton>
                <Modal.Title>Sair da Conta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Tem certeza que deseja sair?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <ButtonComponent type="button" style="text"
                    textType="text-danger"
                    onClick={handleCloseLogoutModal}>
                    Não
                </ButtonComponent>
                <ButtonComponent type="button" style="text"
                    textType="text-success"
                    onClick={handleLogout}>
                    Sim
                </ButtonComponent>
            </Modal.Footer>
        </Modal>
    )
}

export default LogoutModal