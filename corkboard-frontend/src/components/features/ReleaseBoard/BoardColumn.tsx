import {ClassNames} from "../../../global/utils.ts";
import "./BoardColumn.scss"
import {Button} from "../../ui/Button/Button.tsx";
import * as _ from 'lodash'
import {useEffect, useRef, useState} from "react";
import {TaskForm} from "../TaskForm/TaskForm.tsx";
import type {TaskType} from "../../../types/TaskType.ts";
import {useDroppable} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import type {PlaceHolderType} from "../../../types/PlaceholderType.ts";
import {Task} from "../../ui/Task/Task.tsx";

type BoardColumnProps = {
    type: string
    onTaskAdd: (name: string, status: string, callback: () => void) => void;
    children?: React.ReactNode;
    tasks: TaskType[]
    placeholder: PlaceHolderType | null
}
export const BoardColumn = ({type, onTaskAdd, tasks, placeholder}: BoardColumnProps) => {
    const [showCreateTask, setShowCreateTask] = useState(false)
    const {setNodeRef} = useDroppable({id: type})
    const newTaskRef = useRef<HTMLDivElement>(null);

    const handleTaskAdd = (name: string) => {
        onTaskAdd(name, type, () => setShowCreateTask(false))
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (newTaskRef.current && !newTaskRef.current.contains(event.target as Node)) {
                setShowCreateTask(false);
            }
        };

        if (showCreateTask) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showCreateTask]);

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
                    {tasks.length === 0 && placeholder?.column === type && (
                        <div className="board-column__placeholder"/>
                    )}
                    {tasks.map((task, index) => (
                        <>
                            {placeholder && placeholder.column === type && placeholder.index === index && (
                                <div className="board-column__placeholder" style={{height: placeholder.height}}/>
                            )}
                            <Task id={task.id} name={task.name}/>
                        </>
                    ))}
                    {tasks.length > 0 && placeholder?.index === tasks.length && placeholder.column === type && (
                        <div className="board-column__placeholder"/>
                    )}
                    {showCreateTask && (
                        <TaskForm onSave={handleTaskAdd} ref={newTaskRef}/>
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