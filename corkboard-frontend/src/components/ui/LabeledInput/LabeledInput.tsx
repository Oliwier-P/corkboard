import "./LabeledInput.scss";
import { Input } from "@/ui/Input/Input.tsx";
import { ClassNames } from "@/global/utils.ts";
import type { ComponentProps } from "react";

type LabeledInputProps = {
    label: string;
    require?: boolean;
} & ComponentProps<typeof Input>;

export const LabeledInput = ({ label, require = false, ...inputProps }: LabeledInputProps) => {
    return (
        <div className={ClassNames("labeled-input", { required: require }, inputProps.className)} style={inputProps.style}>
            <span className="labeled-input__label">{label}</span>
            <Input {...inputProps} />
        </div>
    );
};
