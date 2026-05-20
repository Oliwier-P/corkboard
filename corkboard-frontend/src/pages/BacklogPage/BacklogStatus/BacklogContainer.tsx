import "./BacklogContainer.scss"
import {ClassNames} from "../../../global/utils.ts";
import type {TaskType} from "../../../types/ReleaseBoardTypes.ts";
import {BacklogTask} from "../BacklogTask/BacklogTask.tsx";
import * as _ from "lodash";

type BacklogContainerProps = {
    status: string;
    tasks: TaskType[]
}

export const BacklogContainer = ({status, tasks}: BacklogContainerProps) => {
    return (
        <div className={ClassNames("backlog-container", [status])}>
            <div className="backlog-container__header">
                <div className="backlog-container__dot" />
                {_.upperCase(status)}
            </div>
            <div className="backlog-container__tasks">
                {tasks?.map((task) => (
                    <BacklogTask task={task}/>
                ))}
            </div>
        </div>
    )
}