import {Input} from "../Input/Input.tsx";
import {type ComponentProps} from "react";
import "./EditableText.scss"

type EditableTextProps = {
    isEditable: boolean
    value: string | number
} & ComponentProps<typeof Input>
export const EditableText = ({isEditable, value, ...inputProps}: EditableTextProps) => {

    return (
        <div className="editable-text">
            {isEditable ? (
                <Input className="editable-text__input" {...inputProps} defaultValue={value}/>
            ) : (
                <div className="editable-text__label">{value}</div>
            )}
        </div>
    )
}