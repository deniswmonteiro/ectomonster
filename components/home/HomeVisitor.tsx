import React from "react";
import LinkComponent from "../forms/LinkComponent";
import HomeIcon from "../icons/home-icon";
import styles from "./HomeVisitor.module.css";

const HomeVisitor = () => {
    return (
        <section className={`container animeLeft ${styles.home}`}>
            <HomeIcon />
            
            <h1>Ectomonster</h1>

            <div className={styles.actions}>
                <LinkComponent href="/cadastro/dados-perfil"
                    type="success">
                    Cadastrar-se
                </LinkComponent>

                <LinkComponent href="/login"
                    type="secondary">
                    Já tenho uma conta
                </LinkComponent>
            </div>
        </section>
    )
}

export default HomeVisitor