import {ClassNames} from "../../../global/utils.ts";
import type {UseFormRegisterReturn} from "react-hook-form";
import "./Input.scss"

type InputProps = {
    className?: string;
    type?: 'text' | 'number' | "password";
    id?: string;
    placeholder?: string;
    register?: UseFormRegisterReturn;
    isInvaild?: boolean
    variant?: "no-border"
};

export const Input = ({className, type, id, placeholder, register, isInvaild, variant}: InputProps) => {
    return <input className={ClassNames('input', className, {invalid: isInvaild}, [variant])} type={type} id={id}
                  placeholder={placeholder}{...register} />;
};