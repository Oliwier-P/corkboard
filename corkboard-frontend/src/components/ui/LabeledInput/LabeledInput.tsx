import {Input} from "../Input/Input.tsx";
import "./LabeledInput.scss"
import type {ComponentProps} from "react";

type LabeledInputProps = {
    label: string;
} & ComponentProps<typeof Input>

export const LabeledInput = ({label, ...inputProps}: LabeledInputProps) => {
    return (
        <div className="labeled-input">
            <span className="labeled-input__label">{label}</span>
            <Input {...inputProps}/>
        </div>
    )
}