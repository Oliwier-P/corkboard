import { ClassNames } from "@/global/utils.ts";
import "./BoardColumn.scss";
import { Button } from "@/components/ui/Button/Button.tsx";
import * as _ from "lodash";
import { type Dispatch, Fragment, memo, type SetStateAction, useEffect, useRef, useState } from "react";
import { TaskForm } from "../TaskForm/TaskForm.tsx";
import { useReleaseBoardStore } from "@/store/releaseBoardStore.ts";
import { Task } from "../Task/Task.tsx";
import { useShallow } from "zustand/react/shallow";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import tasksApi from "@/api/tasks.ts";
import { useWorkspaceStore } from "@/store/workspaceStore.ts";
import type { TaskStatus } from "@/types/ReleaseBoardTypes.ts";

type BoardColumnProps = {
    columnId: string;
    releaseId: string;
    isCreateTaskOpen: boolean;
    setIsCreateTaskOpen: Dispatch<SetStateAction<boolean>>;
};

export const BoardColumn = memo(({ columnId, releaseId, isCreateTaskOpen, setIsCreateTaskOpen }: BoardColumnProps) => {
    const [showCreateTask, setShowCreateTask] = useState(false);
    const newTaskRef = useRef<HTMLDivElement>(null);
    const ref = useRef<HTMLDivElement>(null);
    const tasksContainerRef = useRef<HTMLDivElement>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const taskIds = useReleaseBoardStore(useShallow((state) => state.columns.find((col) => col.id === columnId)?.taskIds ?? []));
    const addTask = useReleaseBoardStore((state) => state.addTask);
    const workspaceId = useWorkspaceStore((state) => state.workspace?.id);

    const handleTaskAdd = (name: string) => {
        const trimmedName = name.trim();

        if (trimmedName || workspaceId) {
            tasksApi.create({ name: trimmedName, workspace_id: workspaceId, release_id: releaseId, status: columnId as TaskStatus }, (response) => {
                addTask(columnId, response);
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
                let index = taskIds.length;

                taskElements.forEach((element, i) => {
                    const rect = element.getBoundingClientRect();
                    const middle = rect.top + rect.height / 2;
                    if (y < middle && index === taskIds.length) {
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
                let index = taskIds.length;

                taskElements?.forEach((element, i) => {
                    const rect = element.getBoundingClientRect();
                    const middle = rect.top + rect.height / 2;
                    if (y < middle && index === taskIds.length) {
                        index = i;
                    }
                });

                const diffColumn = fromColumn.id !== columnId;
                const payload = diffColumn ? { status: columnId as TaskStatus, position: index, release_id: releaseId } : { position: index };

                tasksApi.update(taskId, payload, () => {
                    if (diffColumn) {
                        moveTaskBetweenColumns(taskId, fromColumn.id, columnId, index);
                    } else {
                        reorderTaskInColumn(columnId, taskId, index);
                    }
                });
            },
        });
    }, [columnId, releaseId, taskIds]);

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
                {taskIds.map((taskId, index) => (
                    <Fragment key={taskId}>
                        {dragOverIndex === index && <div className="board-column__placeholder" />}
                        <Task taskId={taskId} />
                    </Fragment>
                ))}
                {dragOverIndex === taskIds.length && <div className="board-column__placeholder" />}
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
