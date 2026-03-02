import {ClassNames} from "../../../global/utils.ts";
import "./BoardColumn.scss"
import {Button} from "../../ui/Button/Button.tsx";
import * as _ from 'lodash'
import {useState} from "react";
import {TaskForm} from "../TaskForm/TaskForm.tsx";
import type {TaskType} from "../../../types/TaskType.ts";
import {Task} from "../../ui/Task/Task.tsx";
import {useDroppable} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";

type BoardColumnProps = {
    type: string
    onTaskAdd: (name: string, status: string) => void;
    children?: React.ReactNode;
    tasks: TaskType[]
}
export const BoardColumn = ({type, onTaskAdd, tasks}: BoardColumnProps) => {
    const [showCreateTask, setShowCreateTask] = useState(false)
    const {setNodeRef} = useDroppable({id: type})

    const handleTaskAdd = (name: string) => {
        onTaskAdd(name, type)
    }

    return (
        <div className={ClassNames("board-column", [type])} ref={setNodeRef}>
            <div className="board-column__header">
                <div className="board-column__dot"/>
                {_.upperCase(type)}
            </div>
            <SortableContext
                key={type} items={tasks.map(t => t.id)}
                strategy={verticalListSortingStrategy}>
                <div className="board-column__tasks">
                    {tasks.map(task => (
                        <Task id={task.id} name={task.name}/>
                    ))}

                    {showCreateTask && (
                        <TaskForm onSave={handleTaskAdd}/>
                    )}
                </div>
            </SortableContext>
            <Button className="board-column__add-task"
                    variant="text"
                    onClick={() => setShowCreateTask(true)}>
                + Add Task
            </Button>
        </div>
    )
}