import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "./InputComponent.module.css";

type InputComponentProps = React.ComponentProps<"input"> & {
    inputGroup?: boolean,
    inputGroupText?: string,
    label: string,
    value: string,
    message: string | null,
    valid: boolean | null,
}

const InputComponent = ({
    inputGroup, inputGroupText, label, type, id, value, onChange, onBlur, message, valid
}: InputComponentProps) => {
    return (
        <Form.Group className="mb-4">
            <Form.Label htmlFor={id} className={styles.label}>
                {label}
            </Form.Label>

            {inputGroup ?
                (
                    <InputGroup>
                        <Form.Control type={type}
                            className={valid === null ? styles.input : `${valid ? styles.valid : styles.invalid}`}
                            id={id}
                            name={id}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur} />
                        <InputGroup.Text className={styles.inputGroupText}>
                            {inputGroupText}
                        </InputGroup.Text>
                    </InputGroup>
                ) : (
                    <Form.Control type={type}
                        className={valid === null ? styles.input : `${valid ? styles.valid : styles.invalid}`}
                        id={id}
                        name={id}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur} />
                )
            }

            <Form.Control.Feedback type={valid ? "valid" : "invalid"}
                style={{display: "block"}}>
                {message && message}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export default InputComponent