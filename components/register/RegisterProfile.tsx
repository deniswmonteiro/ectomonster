import React from "react";
import Header from "../layout/Header";
import useForm from "@/hooks/useForm";
import ProgressBarComponent from "../ui/ProgressBarComponent";
import InputComponent from "../forms/InputComponent";
import SelectComponent from "../forms/SelectComponent";
import LinkComponent from "../forms/LinkComponent";
import styles from "./RegisterProfile.module.css";

const RegisterProfile = () => {
    const name = useForm({ type: "name", min: 2 });
    const gender = useForm({ type: "gender" });
    const weight = useForm({ type: "weight" });
    const height = useForm({ type: "height" });
    const [valid, setValid] = React.useState(false);
    const [fillProgressBar, setFillProgressBar] = React.useState(0);

    /** Validate fields and enable/disable link button */
    React.useEffect(() => {
        if (name.value !== "" && gender.value !== "" && weight.value !== "" && height.value !== "") {
            if (name.validate() && gender.validate() && weight.validate() && height.validate()) {
                setFillProgressBar(50);
                setValid(true);
            }
        }

        else setValid(false);
    }, [name, gender, weight, height]);
    
    return (
        <>
            <Header backNavigation={true} href="/" />

            <section className={`container animeLeft ${styles.registerProfile}`}>
                <ProgressBarComponent now={fillProgressBar} />

                <h1 className="title-2">Adicionar os seus dados de perfil:</h1>

                <form>
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
                </form>

                <LinkComponent href="/cadastro/criar-conta"
                    type="success"
                    query={{
                        name: name.value,
                        gender: gender.value,
                        weight: weight.value,
                        height: height.value
                    }}
                    disabled={!valid}>
                    Próximo
                </LinkComponent>
            </section>
        </>
    )
}

export default RegisterProfile