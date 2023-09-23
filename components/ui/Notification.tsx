import React from "react";
import { useNotification } from "@/store/NotificationContext";
import styles from "./Notification.module.css";

const Notification = ({ message, status }: { message: string, status: string }) => {
    const { hideNotification } = useNotification();

    let statusClass = "";
    
    switch (status) {
        case "success":
            statusClass = styles.success;
            break;

        case "error":
            statusClass = styles.error;
            break;

        default:
            statusClass = "";
            break;
    }

    return (
        <div className={`${styles.notification} ${statusClass}`}
            onClick={hideNotification}>
            <p>{message}</p>
        </div>
    )
}

export default Notification