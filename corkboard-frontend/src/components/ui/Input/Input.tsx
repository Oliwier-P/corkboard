import {ClassNames} from "../../../global/utils.ts";
import type {UseFormRegisterReturn} from "react-hook-form";
import "./Input.scss"
import type {DetailedHTMLProps, InputHTMLAttributes} from "react";

type InputProps = {
    className?: string;
    type?: 'text' | 'number' | "password";
    id?: string;
    placeholder?: string;
    register?: UseFormRegisterReturn;
    isInvaild?: boolean
    variant?: "no-border"
    defaultValue?: string | number
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
    style?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
};

export const Input = ({className, type, id, placeholder, register, isInvaild, variant, defaultValue, onKeyDown, style}: InputProps) => {
    return <input className={ClassNames('input', className, {invalid: isInvaild}, [variant])}
                  defaultValue={defaultValue} type={type} id={id} autoComplete="off" style={style}
                  placeholder={placeholder} onKeyDown={(e) => onKeyDown && onKeyDown(e)} {...register} />;
};