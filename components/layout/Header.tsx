import React from "react";
import Link from "next/link";
import ArrowLeftIcon from "../Icons/arrow-left.svg";
import { Spinner } from "react-bootstrap";
import styles from "./Header.module.css";

type HeaderProps = {
    backNavigation?: boolean,
    href?: string,
}

const Header = ({ backNavigation, href }: HeaderProps) => {
    const [loading, setLoading] = React.useState(false);

    return (
        <header className={styles.header}>
            {backNavigation && (
                (loading ? 
                    ( 
                        <Spinner animation="border" size="sm"
                            className={styles.loading} />
                    ) : (
                        <Link href={{ pathname: href }}
                            onClick={() => setLoading(true)}>
                            <ArrowLeftIcon />
                        </Link>
                    )
                )
            )}

            <div className={styles.logo}>
                Ectomonster
            </div>
        </header>
    )
}

export default Header