import "./Button.scss"
import {ClassNames} from "../../../global/utils.ts";

type ButtonProps = {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    color?: "primary" | "secondary" | "edit" | "delete" | "outlined";
    variant?: "rounded" | "square" | "text"
    type?: "button" | "submit" | "reset"
    size?: "medium" | "small"
}

export const Button = ({
                           onClick,
                           children,
                           className,
                           color,
                           variant = "square",
                           type,
                           size = "medium"
                       }: ButtonProps) => {
    return (
        <button className={ClassNames("button", className, [color, variant, size])} onClick={onClick && onClick}
                type={type}>
            <span className="button__content">
                {children}
            </span>
        </button>
    )
}
