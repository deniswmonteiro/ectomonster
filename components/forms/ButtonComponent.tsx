import Button from "react-bootstrap/Button";
import styles from "./ButtonComponent.module.css";

type ButtonComponentProps = {
    children: React.ReactNode,
    type: "button" | "submit",
    textType?: "text-success" | "text-danger"
    style: "success" | "text",
    disabled?: boolean
}

const ButtonComponent = ({ children, type, style, textType, ...props }: ButtonComponentProps) => {
    let buttonClass;

    switch (style) {
        case "success":
            buttonClass = styles.success;
            break;

        case "text":
            if (textType === "text-success") buttonClass = styles.textSuccess;
            else if (textType === "text-danger") buttonClass = styles.textDanger;
            else buttonClass = "";
            break;

        default:
            buttonClass = "";
            break;
    }

    return (
        <Button type={type} className={`${styles.button} ${buttonClass}`}
            {...props}>
            {children}
        </Button>
    )
}

export default ButtonComponent