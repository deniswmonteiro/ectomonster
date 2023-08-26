import React from "react";
import Link from "next/link";
import styles from "./LinkComponent.module.css";

type LinkComponentProps = {
    href: string,
    type: "success" | "secondary" | "text",
    textType?: string,
    query?: string,
    disabled?: boolean,
    children: string
}

const LinkComponent = ({ href, type, textType, query, disabled, children }: LinkComponentProps) => {
    let linkClass;

    switch (type) {
        case "success":
            linkClass = styles.success;
            break;

        case "secondary":
            linkClass = styles.secondary;
            break;

        case "text":
            if (textType === "text-warning") linkClass = styles.textWarning;
            else linkClass = "";
            break;

        default:
            linkClass = "";
            break;
    }

    return (
        <Link href={{ pathname: href, query: query }}
            className={`${styles.link} ${linkClass} ${disabled === true ? styles.disabled : ""}`}>
            {children}
        </Link>
    )
}

export default LinkComponent