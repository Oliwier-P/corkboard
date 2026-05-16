import "./Progress.scss"
import {ClassNames} from "../../../global/utils.ts";

type ProgressBarProps = {
    maxValue: number
    value: number
    className?: string
}
export const Progress = ({value, maxValue, className}: ProgressBarProps) => {
    const fillWidth = maxValue > 0 ? `${(value / maxValue) * 100}%` : "0%"
    return (
        <div className={ClassNames("progress", className)}>
            <div className="progress__bar">
                <div className="progress__fill" style={{width: fillWidth}}/>
            </div>
            <div className="progress__label">
                {value}/{maxValue}
            </div>
        </div>
    )
}