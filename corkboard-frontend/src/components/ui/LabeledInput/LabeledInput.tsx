import {Input} from "../Input/Input.tsx";
import "./LabeledInput.scss"
import type {ComponentProps} from "react";
import {ClassNames} from "../../../global/utils.ts";

type LabeledInputProps = {
    label: string;
    require?: boolean
} & ComponentProps<typeof Input>

export const LabeledInput = ({label, require = false, ...inputProps}: LabeledInputProps) => {
    return (
        <div className={ClassNames("labeled-input", {required: require})}>
            <span className="labeled-input__label">{label}</span>
            <Input {...inputProps}/>
        </div>
    )
}