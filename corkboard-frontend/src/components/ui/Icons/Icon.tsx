import "./Icon.scss";
import { ClassNames } from "@/global/utils.ts";
import { createElement } from "react";
import { icons } from "./Icons.ts";

export type IconNames = keyof typeof icons;

type IconProps = {
    icon: IconNames;
    className?: string;
    color?: string;
};

export const Icon = ({ icon, className, color }: IconProps) => {
    return <div className={ClassNames("icon", className)}>{createElement(icons[icon], { style: { width: "100%", height: "auto", color: color } })}</div>;
};
