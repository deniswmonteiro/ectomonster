import React from "react";
import { useNotification } from "@/store/NotificationContext";
import Notification from "../ui/Notification"

const Layout = ({ children }: React.PropsWithChildren ) => {
    const { notification } = useNotification();

    return (
        <>
            <main>
                {children}

                {notification !== null &&
                    <Notification message={notification.message} status={notification.status} />
                }
            </main>
        </>
    )
}

export default Layout