import React from "react";
import Link from "next/link";
import styles from "./LinkComponent.module.css";

type ILinkComponent = {
    href: string,
    type: "success" | "secondary" | "text",
    textType?: "text-warning",
    query?: {
        name: string,
        gender: string,
        weight: string,
        height: string
    },
    disabled?: boolean,
    children: React.ReactNode
}

const LinkComponent = ({ href, type, textType, query, disabled, children }: ILinkComponent) => {
    let linkClass = "";

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