import "./Button.scss";
import { ClassNames } from "@/global/utils.ts";
import { Icon, type IconNames } from "@/ui/Icons/Icon.tsx";
import React from "react";

type ButtonProps = {
    color?: "primary" | "secondary" | "orange" | "green" | "red" | "outlined" | "none";
    variant?: "rounded" | "square" | "text" | "icon" | "tab";
    size?: "medium" | "small" | "large";
    icon?: IconNames;
    ref?: React.Ref<HTMLButtonElement>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, className, color = "primary", variant = "square", size = "medium", icon, ref, ...props }: ButtonProps) => {
    return (
        <button ref={ref} className={ClassNames("button", className, [color, variant, size])} {...props}>
            <span className="button__content">
                {icon && <Icon icon={icon} className="button__icon" />}
                {children}
            </span>
        </button>
    );
};
