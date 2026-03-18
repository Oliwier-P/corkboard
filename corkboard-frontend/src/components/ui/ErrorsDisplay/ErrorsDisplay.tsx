import type {FieldErrors} from "react-hook-form";
import "./ErrorsDisplay.scss"

type ErrorLabelProps = {
    errors?: FieldErrors
}

export const ErrorsDisplay = ({errors}: ErrorLabelProps) => {
    if (!errors || Object.keys(errors).length === 0) return null
    const allErrors = Object.entries(errors).flatMap(([_field, value]) => {
        if (!value) return []
        if (Array.isArray(value)) return value.map((message) => (message))
        return [value.message]
    })
    if (allErrors.length === 0) return null

    return (
        <div className="errors-display">
            {allErrors.map(error => (
                <div className="errors-display__error">
                    {error}
                </div>
            ))}
        </div>
    )
}