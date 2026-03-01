import {ClassNames} from "../../../global/utils.ts";
import {createElement} from "react";
import {icons} from "./Icons.ts";
import "./Icon.scss"

export type IconNames = keyof typeof icons

type IconProps = {
    icon: IconNames
    className?: string
}

export const Icon = ({icon, className}: IconProps) => {
    return (
        <div className={ClassNames("icon", className)}>
            {createElement(icons[icon], {style: {width: '100%', height: 'auto'}})}
        </div>
    )
}