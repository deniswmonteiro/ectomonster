import React from "react";

type INotificationData = {
    message: string,
    status: string,
}

type INotificationContext = {
    notification: INotificationData | null,
    showNotification: (notificationData: INotificationData) => void,
    hideNotification: () => void,
}

const NotificationContext = React.createContext<INotificationContext | null>({
    notification: null,
    showNotification: () => {},
    hideNotification: () => {}
});

export const useNotification = () => {
    const context = React.useContext(NotificationContext);

    if (context === null) throw new Error("useContext deve estar dentro do provider.");

    return context;
}

export const NotificationContextProvider = ({ children }: React.PropsWithChildren) => {
    const [activeNotification, setActiveNotification] = React.useState<INotificationData | null>(null);

    const handleShowNotification = (notificationData: INotificationData) => setActiveNotification(notificationData);
    const handleHideNotification = () => setActiveNotification(null);

    React.useEffect(() => {
        if (activeNotification) {
            const timer = setTimeout(() => handleHideNotification(), 4000);

            return () => clearTimeout(timer);
        }
    }, [activeNotification]);

    const context = {
        notification: activeNotification,
        showNotification: handleShowNotification,
        hideNotification: handleHideNotification
    }

    return (
        <NotificationContext.Provider value={context}>
            {children}
        </NotificationContext.Provider>
    )
}