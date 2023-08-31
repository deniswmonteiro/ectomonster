import React from "react";
import useForm from "@/hooks/useForm";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import Header from "../layout/Header";
import InputComponent from "../forms/InputComponent";
import SelectComponent from "../forms/SelectComponent";
import ButtonComponent from "../forms/ButtonComponent";
import Spinner from "react-bootstrap/Spinner";
import styles from "./Profile.module.css";

type IUserData = {
    name: string,
    gender: "1" | "2",
    weight: string,
    height: string
}

const Profile = ({ user }: { user: IUserData | null }) => {
    const name = useForm({ type: "name", min: 2, initial: user?.name});
    const gender = useForm({ initial: user?.gender });
    const weight = useForm({ type: "weight", initial: user?.weight });
    const height = useForm({ type: "height", initial: user?.height });
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        /** User logout if user is null */
        async function handleLogout() {
            const logout = await signOut({
                redirect: false,
                callbackUrl: "/"
            });

            router.replace(logout.url);
        }

        if (user === null) handleLogout();
    }, [router, user]);

    /** Update user profile */
    const handleFormEditProfileSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        setLoading(true);

        const response = await fetch("/api/profile", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name.value,
                gender: gender.value,
                weight: weight.value,
                height: height.value,
            })
        });

        const result = await response.json() as {
            message: string
        };

        if (response.ok) router.replace("/");
        else console.log(result.message);
    }

    if (user === null) return null;

    else {
        return (
            <>
                <Header backNavigation={true} href="/" />

                <section className={`container animeLeft ${styles.profile}`}>
                    <h1 className="title-2">Editar dados de perfil:</h1>

                    <form onSubmit={handleFormEditProfileSubmit}>
                        {/* Name */}
                        <InputComponent label="Nome" type="text"
                            id="name"
                            {...name} />

                        {/* Gender */}
                        <SelectComponent label="Sexo"
                            id="gender"
                            options={["Selecione o sexo", "Masculino", "Feminino"]}
                            {...gender} />

                        {/* Weight */}
                        <InputComponent inputGroup={true}
                            inputGroupText="kg"
                            label="Peso"
                            type="text"
                            id="weight"
                            {...weight} />

                        {/* Height */}
                        <InputComponent inputGroup={true}
                            inputGroupText="cm"
                            label="Altura"
                            type="text"
                            id="height"
                            {...height} />

                        <div className={styles.actions}>
                            {loading ? 
                                (
                                    <ButtonComponent type="submit" style="success"
                                        disabled>
                                        <Spinner animation="border" variant="light" size="sm" />
                                    </ButtonComponent>
                                ) : (
                                    <ButtonComponent type="submit" style="success">
                                        Salvar
                                    </ButtonComponent>
                                )
                            }
                        </div>
                    </form>
                </section>
            </>
        )
    }
}

export default Profile