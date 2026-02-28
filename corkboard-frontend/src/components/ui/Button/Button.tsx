import "./Button.scss"
import {ClassNames} from "../../../global/utils.ts";

type ButtonProps = {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    color?: "primary" | "secondary" | "edit" | "delete";
    variant?: "rounded" | "square" | "text"
    type?: "button" | "submit" | "reset"
}

export const Button = ({onClick, children, className, color, variant = "square", type}: ButtonProps) => {
    return (
        <button className={ClassNames("button", className, [color, variant])} onClick={onClick && onClick} type={type}>
            <span className="button__content">
                {children}
            </span>
        </button>
    )
}
