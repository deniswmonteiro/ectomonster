import React from "react";
import styles from "./Calendar.module.css";

type IWeek = {
    name: string,
    date: number
}

const days = [
    "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"
]

const Calendar = () => {
    const dateObj = new Date();
    const firstDay = dateObj.getDate() - dateObj.getDay();

    const getDates = () => {
        const week: IWeek[] = [];

        for (let i = 0; i < days.length; i++) {
            let nextDate = new Date(dateObj.getTime());
            nextDate.setDate(firstDay + i);

            const nameDayDate = nextDate.getDate();

            week.push({
                name: days[i],
                date: nameDayDate
            });
        }

        return week;
    }
    
    const daysWeek = getDates();

    return (
        <>
            <ul className={styles.calendar}>
                {daysWeek.map((day) => (
                    <li key={day.date} className={styles.calendarItem}>
                        <p>{day.name}</p>
                        <p>{day.date}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Calendar