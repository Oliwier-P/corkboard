import "./Task.scss"

type TaskProps = {
    name: string
}
export const Task = ({name}: TaskProps) => {
    return (
        <div className="task">
            <div className="task__header">
                {name}
            </div>
        </div>
    )
}