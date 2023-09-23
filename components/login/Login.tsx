import React from "react";
import Header from "../layout/Header";
import useForm from "@/hooks/useForm";
import { SignInResponse, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useNotification } from "@/store/NotificationContext";
import InputComponent from "../forms/InputComponent";
import ButtonComponent from "../forms/ButtonComponent";
import { Spinner } from "react-bootstrap";
import styles from "./Login.module.css";

const Login = () => {
    const email = useForm({ type: "email" });
    const password = useForm({ type: "password" });
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();
    const { showNotification } = useNotification();

    const handleLoginFormSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        if (email.validate() && password.validate()) {
            setLoading(true);
            
            const response = await signIn("credentials", {
                redirect: false,
                email: email.value,
                password: password.value
            }) as SignInResponse;

            if (response.ok) router.replace("/");
            
            else {
                showNotification({
                    message: response.error as string,
                    status: "error"
                });

                setLoading(false);
            }
        }
    }

    return (
        <>
            <Header backNavigation={true} href="/" />

            <section className={`container animeLeft ${styles.login}`}>
                <h1 className="title-2">Entre com seu e-mail e senha:</h1>

                <form onSubmit={handleLoginFormSubmit}>
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
                                    Entrar
                                </ButtonComponent>
                            )
                        }
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login