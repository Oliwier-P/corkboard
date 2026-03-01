import {ClassNames} from "../../../global/utils.ts";
import "./BoardColumn.scss"
import {Button} from "../../ui/Button/Button.tsx";
import * as _ from 'lodash'
import {useState} from "react";
import {EmptyTask} from "./EmptyTask.tsx";

type BoardColumnProps = {
    type: "adjustments" | "todo" | "in_progress" | "review_pending" | "testing" | "accepted"
}
export const BoardColumn = ({type}: BoardColumnProps) => {
    const [showCreateTask, setShowCreateTask] = useState(true)
    return (
        <div className={ClassNames("board-column", [type])}>
            <div className="board-column__header">
                <div className="board-column__dot"/>
                {_.upperCase(type)}
            </div>
            <div className="board-column__tasks">
                {showCreateTask && (
                    <EmptyTask />
                )}
            </div>
            <Button className="board-column__add-task"
                    variant="text"
                    onClick={() => setShowCreateTask(true)}>
                + Add Task
            </Button>
        </div>
    )
}