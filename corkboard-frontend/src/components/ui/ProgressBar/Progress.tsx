import "./Progress.scss"

type ProgressBarProps = {
    maxValue: number
    value: number
}
export const Progress = ({value, maxValue}: ProgressBarProps) => {
    const fillWidth = maxValue > 0 ? `${(value / maxValue) * 100}%` : "0%"
    return (
        <div className="progress">
            <div className="progress__bar">
                <div className="progress__fill" style={{width: fillWidth}}/>
            </div>
            <div className="progress__label">
                {value}/{maxValue}
            </div>
        </div>
    )
}