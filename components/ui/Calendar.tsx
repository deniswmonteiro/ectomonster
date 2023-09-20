import React from "react";
import { getDates } from "@/helpers/calendar-util";
import styles from "./Calendar.module.css";

type IWeek = {
    name: string,
    date: number
}

const Calendar = ({ dayDone }: { dayDone: string }) => {
    const [daysWeek, setDaysWeek] = React.useState<IWeek[]>([]);

    React.useEffect(() => {
        /** Get dates to fill the calendar */
        const week = getDates();
        setDaysWeek(week);
    }, [dayDone]);

    return (
        <>
            <ul className={styles.calendar}>
                {daysWeek.map((day) => (
                    <li key={day.date}
                        className={`${styles.calendarItem} ${day.name === dayDone ? styles.itemActive : ""}`}>
                        <p>{day.name}</p>
                        <p>{day.date}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Calendar