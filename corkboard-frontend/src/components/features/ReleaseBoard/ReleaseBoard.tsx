import {BoardColumn} from "./BoardColumn.tsx";
import "./ReleaseBoard.scss"
import type {releaseType} from "../../../types/ReleaseType.ts";
import {api} from "../../../api/api.ts";
import {useEffect, useState} from "react";
import type {TaskType} from "../../../types/TaskType.ts";
import {DndContext, type DragEndEvent, type DragOverEvent, DragOverlay, pointerWithin} from "@dnd-kit/core";
import {Task} from "../../ui/Task/Task.tsx";
import type {PlaceHolderType} from "../../../types/PlaceholderType.ts";
import type {ColumnIdType} from "../../../types/ColumnIdType.ts";
import {arrayMove} from "@dnd-kit/sortable";

type ReleaseBoardProps = {
    release: releaseType
}


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
    const [placeholder, setPlaceholder] = useState<PlaceHolderType | null>(null)

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
        const {active, over} = event;
        if (!over) return;

        const activeId = active.id as number;

        const fromColumn = findColumnByTaskId(activeId);

        const toColumn =
            typeof over.id === "number"
                ? findColumnByTaskId(over.id as number)
                : (over.id as ColumnIdType);

        if (!fromColumn || !toColumn) return;

        setColumns(prev => {
            const fromTasks = [...prev[fromColumn]];
            const toTasks = [...prev[toColumn]];

            const activeIndex = fromTasks.findIndex(t => t.id === activeId);

            if (fromColumn === toColumn) {
                const overIndex = toTasks.findIndex(t => t.id === over.id);
                api.put(`tasks/${activeId}`, {
                    task: {status: toColumn, order: overIndex}
                });
                return {
                    ...prev,
                    [fromColumn]: arrayMove(fromTasks, activeIndex, overIndex)
                };
            } else {
                const [movedTask] = fromTasks.splice(activeIndex, 1);

                const newIndex =
                    over.data.current?.sortable?.index ?? toTasks.length;

                toTasks.splice(newIndex, 0, {
                    ...movedTask,
                    status: toColumn
                });

                api.put(`tasks/${activeId}`, {
                    task: {status: toColumn, order: newIndex}
                });

                return {
                    ...prev,
                    [fromColumn]: fromTasks,
                    [toColumn]: toTasks
                };
            }
        });
        setPlaceholder(null);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const {active, over} = event;
        if (!over) return;

        const fromColumn = findColumnByTaskId(active.id as number);
        const toColumn =
            typeof over.id === "number"
                ? findColumnByTaskId(over.id as number)
                : (over.id as ColumnIdType);

        if (!toColumn) return;
        if (fromColumn === toColumn) return;

        const index =
            over.data.current?.sortable?.index ??
            columns[toColumn].length;

        setPlaceholder({column: toColumn, index, height: over.rect.height});
    };

    return (
        <DndContext collisionDetection={pointerWithin}
                    onDragStart={event => {
                        const task = findTaskByID(parseInt(event.active.id as string))
                        if (!task) return
                        setDraggedTask(task)
                    }}
                    onDragOver={handleDragOver}
                    onDragCancel={() => {
                        setDraggedTask(null)
                        setPlaceholder(null)
                    }}
                    onDragEnd={handleDragEnd}
        >
            <div className="release-board">
                {(Object.keys(columns) as ColumnIdType[])
                    .filter(column => !["review_pending", "testing", "accepted"].includes(column)).map(columnId => (
                        <BoardColumn type={columnId} onTaskAdd={handleAddTask} tasks={columns[columnId]}
                                     placeholder={placeholder}/>
                    ))}

                <div className="release-board__column-group">
                    {(Object.keys(columns) as ColumnIdType[])
                        .filter(column => ["review_pending", "testing"].includes(column)).map(columnId => (
                            <BoardColumn type={columnId} onTaskAdd={handleAddTask} tasks={columns[columnId]}
                                         placeholder={placeholder}/>
                        ))}
                </div>

                <BoardColumn type="accepted" onTaskAdd={handleAddTask} tasks={columns["accepted"]}
                             placeholder={placeholder}/>

                <DragOverlay>
                    {draggedTask && (
                        <Task id={draggedTask.id} name={draggedTask.name}/>
                    )}
                </DragOverlay>
            </div>
        </DndContext>
    )
}