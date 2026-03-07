import {ClassNames} from "../../../global/utils.ts";
import "./BoardColumn.scss"
import {Button} from "../../ui/Button/Button.tsx";
import * as _ from 'lodash'
import {memo, useEffect, useRef, useState} from "react";
import {TaskForm} from "../TaskForm/TaskForm.tsx";
import {useReleaseBoardStore} from "../../../store/releaseBoardStore.ts";
import {Task} from "../Task/Task.tsx";
import {useShallow} from "zustand/react/shallow";
import {dropTargetForElements} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

type BoardColumnProps = {
    columnId: string
}
export const BoardColumn = memo(({columnId}: BoardColumnProps) => {
    const [showCreateTask, setShowCreateTask] = useState(false)
    const newTaskRef = useRef<HTMLDivElement>(null);
    const ref = useRef<HTMLDivElement>(null)
    const [isDragOver, setIsDragOver] = useState(false)
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

    const taskIds = useReleaseBoardStore(useShallow(state => state.columns.find(col => col.id === columnId)?.taskIds ?? []))
    const addTask = useReleaseBoardStore(state => state.addTask)

    const handleTaskAdd = (name: string) => {
        if (name.trim()) {
            addTask(columnId, name.trim())
        }
        setShowCreateTask(false)
    }

    useEffect(() => {
        if (!ref.current) return

        return dropTargetForElements({
            element: ref.current,
            canDrop: ({source}) => source.data.type === "task",
            onDragEnter: () => setIsDragOver(true),
            onDragLeave: () => {
                setIsDragOver(false)
                setDragOverIndex(null)
            },
            onDrag: ({location}) => {
                const taskElements = ref.current?.querySelectorAll(".task:not(.dragging)")
                if (!taskElements) return

                const y = location.current.input.clientY
                let index = taskIds.length

                taskElements.forEach((element, i) => {
                    const rect = element.getBoundingClientRect()
                    const middle = rect.top + rect.height / 2
                    if (y < middle && index === taskIds.length) {
                        index = i
                    }
                })

                setDragOverIndex(index)
            },
            onDrop: ({source, location}) => {
                setIsDragOver(false)
                setDragOverIndex(null)

                const taskId = source.data.taskId as number
                if (!taskId) return

                const {columns, moveTaskBetweenColumns, reorderTaskInColumn} = useReleaseBoardStore.getState()
                const fromColumn = columns.find(col => col.taskIds.includes(taskId))
                if (!fromColumn) return;

                const taskElements = ref.current?.querySelectorAll(".task:not(.dragging)")

                const y = location.current.input.clientY
                let index = taskIds.length

                taskElements?.forEach((element, i) => {
                    const rect = element.getBoundingClientRect()
                    const middle = rect.top + rect.height / 2
                    if (y < middle && index === taskIds.length) {
                        index = i
                    }
                })

                if (fromColumn.id !== columnId) {
                    moveTaskBetweenColumns(taskId, fromColumn.id, columnId, index)
                } else {
                    reorderTaskInColumn(columnId, taskId, index)
                }
            }
        })
    }, [columnId, taskIds]);

    return (
        <div ref={ref} className={ClassNames("board-column", [columnId.toString()], {over: isDragOver})}>
            <div className="board-column__header">
                <div className="board-column__dot"/>
                {_.upperCase(columnId as string)}
            </div>
            <div className="board-column__tasks">
                {taskIds.map((taskId, index) => (
                    <>
                        {dragOverIndex === index && (
                            <div className="board-column__placeholder"/>
                        )}
                        <Task key={taskId} taskId={taskId}/>
                    </>
                ))}
                {dragOverIndex === taskIds.length && (
                    <div className="board-column__placeholder"/>
                )}
                {showCreateTask && (
                    <TaskForm onSave={handleTaskAdd} ref={newTaskRef}/>
                )}
            </div>
            <Button className="board-column__add-task"
                    variant="text"
                    onClick={() => setShowCreateTask(true)}>
                + Add Task
            </Button>
        </div>
    )
})