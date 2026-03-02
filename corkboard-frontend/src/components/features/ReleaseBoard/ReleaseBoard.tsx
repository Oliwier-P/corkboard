import {BoardColumn} from "./BoardColumn.tsx";
import "./ReleaseBoard.scss"
import type {releaseType} from "../../../types/ReleaseType.ts";
import {api} from "../../../api/api.ts";
import {useEffect, useState} from "react";
import type {TaskType} from "../../../types/TaskType.ts";
import {arrayMove} from "@dnd-kit/sortable";
import {closestCorners, DndContext, type DragEndEvent, DragOverlay} from "@dnd-kit/core";
import {Task} from "../../ui/Task/Task.tsx";

type ReleaseBoardProps = {
    release: releaseType
}

type ColumnIdType = "adjustments" | "todo" | "in_progress" | "review_pending" | "testing" | "accepted"
type ColumnType = Record<ColumnIdType, TaskType[]>

export const ReleaseBoard = ({release}: ReleaseBoardProps) => {
    const [columns, setColumns] = useState<ColumnType>({
        adjustments: [],
        todo: [],
        in_progress: [],
        review_pending: [],
        testing: [],
        accepted: []
    })

    const [draggedTask, setDraggedTask] = useState<TaskType | null>(null)

    useEffect(() => {
        api.get("/tasks", {params: {release_id: release.id}}).then((res) => {
            setColumns(res.data)
        })
    }, [release.id])

    const handleAddTask = (name: string, status: string) => {
        const task = {
            name,
            release_id: release.id,
            status
        }
        api.post("/tasks", task)
    }

    const findColumnByTaskId = (taskId: number): ColumnIdType | null => {
        return (Object.keys(columns) as ColumnIdType[]).find(col => columns[col].some(task => task.id === taskId)) ?? null
    }

    const findTaskByID = (taskId: number) => {
        return Object.values(columns).flatMap(t => t).find(task => task.id === taskId)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event
        if (!over) return;

        const fromColumn = findColumnByTaskId(active.id as number)
        const toColumn = findColumnByTaskId(over.id as number) ?? (over.id as ColumnIdType)

        if (!fromColumn || !toColumn) return;

        if (fromColumn === toColumn) {
            const oldIndex = columns[fromColumn].findIndex(t => t.id === active.id)
            const newIndex = columns[toColumn].findIndex(t => t.id === over.id)

            api.put(`tasks/${active.id}`, {task: {order: newIndex}})

            setColumns(prevState => ({
                ...prevState,
                [fromColumn]: arrayMove(prevState[fromColumn], oldIndex, newIndex)
            }))
        } else {
            const fromTasks = [...columns[fromColumn]]
            const toTasks = [...columns[toColumn]]

            const taskIndex = fromTasks.findIndex(t => t.id === active.id)
            const [task] = fromTasks.splice(taskIndex, 1)

            const updatedTask = {...task, status: toColumn}
            toTasks.push(updatedTask);

            setColumns(prevState => ({
                ...prevState,
                [fromColumn]: fromTasks,
                [toColumn]: toTasks
            }))

            api.put(`tasks/${active.id}`, {task: {order: taskIndex, status: toColumn}})
        }
    }

    return (
        <DndContext collisionDetection={closestCorners}
                    onDragStart={event => {
                        const task = findTaskByID(parseInt(event.active.id as string))
                        if (!task) return
                        setDraggedTask(task)
                    }}
                    onDragCancel={() => setDraggedTask(null)}
                    onDragEnd={handleDragEnd}
        >
            <div className="release-board">
                {(Object.keys(columns) as ColumnIdType[]).filter(column => !["review_pending", "testing", "accepted"].includes(column)).map(columnId => (
                    <BoardColumn type={columnId} onTaskAdd={handleAddTask} tasks={columns[columnId]}/>
                ))}

                <div className="release-board__column-group">
                    {(Object.keys(columns) as ColumnIdType[]).filter(column => ["review_pending", "testing"].includes(column)).map(columnId => (
                        <BoardColumn type={columnId} onTaskAdd={handleAddTask} tasks={columns[columnId]}/>
                    ))}
                </div>

                <BoardColumn type="accepted" onTaskAdd={handleAddTask} tasks={columns["accepted"]}/>

                <DragOverlay>
                    {draggedTask && (
                        <Task id={draggedTask.id} name={draggedTask.name}/>
                    )}
                </DragOverlay>
            </div>
        </DndContext>
    )
}