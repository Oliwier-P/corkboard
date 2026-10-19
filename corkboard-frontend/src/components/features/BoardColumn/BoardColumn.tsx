import { ClassNames } from "@/global/utils.ts";
import "./BoardColumn.scss";
import { Button } from "@/components/ui/Button/Button.tsx";
import * as _ from "lodash";
import { type Dispatch, memo, type SetStateAction, useEffect, useRef, useState } from "react";
import { TaskForm } from "../TaskForm/TaskForm.tsx";
import { useReleaseBoardStore } from "@/store/releaseBoardStore.ts";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import type { TaskStatus, TaskType } from "@/types/ReleaseBoardTypes.ts";
import { Task } from "@/features/Task/Task.tsx";
import tasksApi from "@/api/tasks.ts";
import { useWorkspaceStore } from "@/store/workspaceStore.ts";

type BoardColumnProps = {
    columnId: TaskStatus | "backlog";
    tasks: TaskType[];
    onTaskCreate: (response: TaskType) => void;
    onTaskDelete: (task: TaskType) => void;
    isCreateTaskOpen: boolean;
    setIsCreateTaskOpen: Dispatch<SetStateAction<boolean>>;
};

export const BoardColumn = memo(({ columnId, tasks, onTaskCreate, onTaskDelete, isCreateTaskOpen, setIsCreateTaskOpen }: BoardColumnProps) => {
    const [showCreateTask, setShowCreateTask] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const newTaskRef = useRef<HTMLDivElement>(null);
    const ref = useRef<HTMLDivElement>(null);
    const tasksContainerRef = useRef<HTMLDivElement>(null);
    const workspace = useWorkspaceStore((state) => state.workspace);
    const releaseId = useWorkspaceStore((state) => state.currentRelease?.id);

    const handleTaskAdd = (name: string) => {
        const trimmedName = name.trim();

        if (trimmedName && workspace) {
            tasksApi.create({ name: trimmedName, status: columnId, workspace_id: workspace.id, release_id: releaseId }, (response) => {
                onTaskCreate(response);
            });
        }

        setIsCreateTaskOpen(false);
        setShowCreateTask(false);
    };

    const handleShowCreateTask = () => {
        if (isCreateTaskOpen) return;

        setIsCreateTaskOpen(true);
        setShowCreateTask(true);
    };

    useEffect(() => {
        if (!ref.current) return;

        return dropTargetForElements({
            element: ref.current,
            canDrop: ({ source }) => source.data.type === "task",
            onDragEnter: () => setIsDragOver(true),
            onDragLeave: () => {
                setIsDragOver(false);
                setDragOverIndex(null);
            },
            onDrag: ({ location }) => {
                const taskElements = ref.current?.querySelectorAll(".task:not(.dragging)");
                if (!taskElements) return;

                const y = location.current.input.clientY;
                let index = tasks.length;

                taskElements.forEach((element, i) => {
                    const rect = element.getBoundingClientRect();
                    const middle = rect.top + rect.height / 2;
                    if (y < middle && index === tasks.length) {
                        index = i;
                    }
                });

                setDragOverIndex(index);
            },
            onDrop: ({ source, location }) => {
                setIsDragOver(false);
                setDragOverIndex(null);

                const taskId = source.data.taskId as string;
                if (!taskId) return;

                const { columns, moveTaskBetweenColumns, reorderTaskInColumn } = useReleaseBoardStore.getState();
                const fromColumn = columns.find((col) => col.taskIds.includes(taskId));
                if (!fromColumn) return;

                const taskElements = ref.current?.querySelectorAll(".task:not(.dragging)");

                const y = location.current.input.clientY;
                let index = tasks.length;

                taskElements?.forEach((element, i) => {
                    const rect = element.getBoundingClientRect();
                    const middle = rect.top + rect.height / 2;
                    if (y < middle && index === tasks.length) {
                        index = i;
                    }
                });

                if (fromColumn.id !== columnId) {
                    moveTaskBetweenColumns(taskId, fromColumn.id, columnId, index);
                } else {
                    reorderTaskInColumn(columnId, taskId, index);
                }
            },
        });
    }, [columnId, tasks]);

    useEffect(() => {
        if (!isCreateTaskOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (newTaskRef.current && !newTaskRef.current.contains(e.target as Node)) {
                setIsCreateTaskOpen(false);
                setShowCreateTask(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isCreateTaskOpen, setIsCreateTaskOpen]);

    useEffect(() => {
        if (tasksContainerRef.current && showCreateTask) {
            tasksContainerRef.current.scrollTo({
                top: tasksContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [showCreateTask]);

    return (
        <div ref={ref} className={ClassNames("board-column", [columnId.toString()], { over: isDragOver })}>
            <div className="board-column__header">
                <div className="board-column__dot" />
                {_.upperCase(columnId as string)}
            </div>
            <div ref={tasksContainerRef} className="board-column__tasks">
                {tasks.map((task, index) => (
                    <>
                        {dragOverIndex === index && <div className="board-column__placeholder" />}
                        <Task key={task.id} task={task} onDelete={onTaskDelete} />
                    </>
                ))}
                {dragOverIndex === tasks.length && <div className="board-column__placeholder" />}
                {showCreateTask && <TaskForm onSave={handleTaskAdd} ref={newTaskRef} />}
            </div>
            <div className="board-column__footer">
                <Button className="board-column__add-task" variant="text" onClick={handleShowCreateTask}>
                    + Add Task
                </Button>
            </div>
        </div>
    );
});
