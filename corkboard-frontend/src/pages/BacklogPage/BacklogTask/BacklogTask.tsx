import "./BacklogTask.scss"
import type {TaskType} from "../../../types/ReleaseBoardTypes.ts";
import {ClassNames} from "../../../global/utils.ts";
import {upperCase} from "lodash";
type BacklogTaskProps = {
    task: TaskType
}
export const BacklogTask = ({task}: BacklogTaskProps) => {
    return <div className="backlog-task">
        <div className="backlog-task__name">{task.name}</div>
        <div className={ClassNames("backlog-task__status", [task.status])}>{upperCase(task.status)}</div>
    </div>
}