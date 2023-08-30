import React from "react";
import Form from "react-bootstrap/Form";
import styles from "./SelectComponent.module.css";

type ISelectComponent = React.ComponentProps<"select"> & {
    label: string,
    options: string[],
    value: string,
    message: string | null,
    valid: boolean | null,
}

const SelectComponent = ({ label, id, options, value, onChange, onBlur, message, valid }: ISelectComponent) => {
    return (
        <Form.Group className="mb-4">
            <Form.Label htmlFor={id} className={styles.label}>
                {label}
            </Form.Label>
            <Form.Select className={valid === null ? styles.select : `${valid ? styles.valid : styles.invalid}`}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                onBlur={onBlur}>
                <option value="" disabled>
                    {options[0]}
                </option>
                
                {options.map((option, index) => (
                    (index > 0 &&
                        <option key={option} value={index}>
                            {option}
                        </option>
                    )
                ))}
            </Form.Select>

            <Form.Control.Feedback type={valid ? "valid" : "invalid"}
                style={{display: "block"}}>
                {message && message}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export default SelectComponent