import React from "react";
import Header from "../layout/Header";
import useForm from "@/hooks/useForm";
import { useRouter } from "next/router";
import ProgressBarComponent from "../ui/ProgressBarComponent";
import InputComponent from "../forms/InputComponent";
import ButtonComponent from "../forms/ButtonComponent";
import { Spinner } from "react-bootstrap";
import styles from "./RegisterAccount.module.css";

const RegisterAccount = () => {
    const email = useForm({ type: "email" });
    const password = useForm({ type: "password", min: 6 });
    const [loading, setLoading] = React.useState(false);
    const [fillProgressBar, setFillProgressBar] = React.useState(0);
    const router = useRouter();
    const userProfileData = router.query;

    React.useEffect(() => {
        if (Object.keys(userProfileData).length > 0) {
            window.history.replaceState(null, "", "/cadastro/criar-conta");
        }

        else router.replace("/cadastro/dados-perfil");

        if (email.validate() && password.validate()) setFillProgressBar(100);
    }, [userProfileData, router, email, password]);

    const handleRegisterFormSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        if (email.validate() && password.validate()) {
            setLoading(true);
            
            const userData = {
                name: userProfileData.name,
                gender: userProfileData.gender,
                weight: userProfileData.weight,
                height: userProfileData.height,
                email: email.value,
                password: password.value
            }
    
            const response = await fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();

            console.log(result)

            // if (response.ok) {
            //     const login = await signIn("credentials", {
            //         redirect: false,
            //         email: email.value,
            //         password: password.value
            //     });

            //     if (login.ok) router.replace("/");
            //     else console.log(response.error);
            // }

            // else setLoading(false);
        }
    }

    return (
        <>
            <Header backNavigation={true} href="/cadastro/dados-perfil" />

            <section className={`container animeLeft ${styles.registerAccount}`}>
                <ProgressBarComponent size={fillProgressBar} />

                <h1 className="title-2">Crie a sua conta:</h1>

                <form onSubmit={handleRegisterFormSubmit}>
                    {/* Email */}
                    <InputComponent label="Email" type="email"
                        id="email"
                        {...email} />

                    {/* Password */}
                    <InputComponent label="Senha" type="password"
                        id="password"
                        {...password} />

                    <div className={styles.actions}>
                        {loading ? 
                            (
                                <ButtonComponent type="submit" style="success"
                                    disabled>
                                    <Spinner animation="border" variant="light" size="sm" />
                                </ButtonComponent>
                            ) : (
                                <ButtonComponent type="submit" style="success">
                                    Começar
                                </ButtonComponent>
                            )
                        }
                    </div>
                </form>
            </section>
        </>
    )
}

export default RegisterAccount