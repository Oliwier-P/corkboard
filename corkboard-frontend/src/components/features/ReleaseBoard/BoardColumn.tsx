import {ClassNames} from "../../../global/utils.ts";
import "./BoardColumn.scss"
import {Button} from "../../ui/Button/Button.tsx";
import * as _ from 'lodash'
import {useState} from "react";
import {TaskForm} from "../TaskForm/TaskForm.tsx";
import type {TaskType} from "../../../types/TaskType.ts";
import {Task} from "../../ui/Task/Task.tsx";

type BoardColumnProps = {
    type: "adjustments" | "todo" | "in_progress" | "review_pending" | "testing" | "accepted"
    onTaskAdd: (name: string, status: string) => void;
    children?: React.ReactNode;
    tasks: TaskType[]
}
export const BoardColumn = ({type, onTaskAdd, tasks}: BoardColumnProps) => {
    const [showCreateTask, setShowCreateTask] = useState(false)

    const handleTaskAdd = (name: string) => {
        onTaskAdd(name, type)
    }

    return (
        <div className={ClassNames("board-column", [type])}>
            <div className="board-column__header">
                <div className="board-column__dot"/>
                {_.upperCase(type)}
            </div>
            <div className="board-column__tasks">
                {tasks.filter(task => task.status === type).map(task => (
                    <Task name={task.name}/>
                ))}
                {showCreateTask && (
                    <TaskForm onSave={handleTaskAdd}/>
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