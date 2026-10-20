import "./Task.scss";
import { Button } from "@/ui/Button/Button.tsx";
import { EditableText } from "@/ui/EditableText/EditableText.tsx";
import { useReleaseBoardStore } from "@/store/releaseBoardStore.ts";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { ClassNames } from "@/global/utils.ts";
import { type SubmitHandler, useForm } from "react-hook-form";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { ContextMenu, type ContextMenuItem } from "@/ui/ContextMenu/ContextMenu.tsx";
import { useTaskStore } from "@/store/taskStore.ts";
import { Icon } from "@/ui/Icons/Icon.tsx";
import UserPopover from "@/ui/Popovers/UserPopover/UserPopover.tsx";
import Tag from "@/ui/Tag/Tag.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import { useWorkspaceStore } from "@/store/workspaceStore.ts";
import type { TaskType } from "@/types/ReleaseBoardTypes.ts";
import tasksApi from "@/api/tasks.ts";

type TaskProps = {
    task: TaskType;
    onDelete: (task: TaskType) => void;
};

type Inputs = {
    name: string;
};

export const Task = memo(({ task, onDelete }: TaskProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLFormElement>(null);
    const { register, handleSubmit } = useForm<Inputs>();
    const { user } = useAuth();

    const setIsOpen = useTaskStore((state) => state.setIsOpen);
    const setTask = useTaskStore((state) => state.setTask);

    const workspace = useWorkspaceStore((state) => state.workspace);
    const moveTaskBetweenColumns = useReleaseBoardStore((state) => state.moveTaskBetweenColumns);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        tasksApi.update(task.id, { name: data.name }, (response) => {});
        setIsEditing(false);
    };

    useEffect(() => {
        if (!ref.current) return;

        return draggable({
            element: ref.current,
            getInitialData: () => ({ type: "task", task_id: task.id }),
            onDragStart: () => setIsDragging(true),
            onDrop: () => setIsDragging(false),
        });
    }, [task]);

    useEffect(() => {
        if (isDragging) {
            setIsEditing(false);
        }
    }, [isDragging]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
                setIsEditing(false);
            }
        };
        if (isEditing) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isEditing]);

    const contextMenuOptions = useCallback(
        (): ContextMenuItem[] =>
            [
                {
                    type: "button",
                    label: "Rename",
                    icon: "edit",
                    onClick: () => setIsEditing(true),
                },
                {
                    type: "button",
                    label: "Change Priority",
                    icon: "exclamationMark",
                    onClick: () => setIsEditing(true),
                },
                {
                    type: "hr",
                },
                task.status === "backlog" && {
                    type: "button",
                    label: "Move To Current Release",
                    icon: "boxArrowUp",
                    onClick: () => moveTaskBetweenColumns(task.id, "backlog", "todo"),
                },
                {
                    type: "button",
                    label: "Move To Next Release",
                    icon: "boxArrowUp",
                    onClick: () => tasksApi.moveToNextRelease(task.id, () => onDelete(task)),
                },
                task.status !== "backlog" && {
                    type: "button",
                    label: "Move To Backlog",
                    icon: "boxArrowDown",
                    onClick: () => tasksApi.update(task.id, { release_id: null, status: "backlog" }, (response) => {}),
                },
                {
                    type: "hr",
                },
                {
                    type: "button",
                    label: "Delete",
                    color: "red",
                    icon: "trash",
                    onClick: () => tasksApi.delete(task.id, () => onDelete(task)),
                },
            ].filter(Boolean) as ContextMenuItem[],
        [moveTaskBetweenColumns, onDelete, task],
    );

    return (
        <ContextMenu items={contextMenuOptions()}>
            <div
                className={ClassNames("task", { ghost: isDragging })}
                ref={ref}
                onClick={() => {
                    setIsOpen(true);
                    setTask(task);
                }}
            >
                <form className="task__header" ref={headerRef} onClick={(e) => isEditing && e.stopPropagation()} onSubmit={handleSubmit(onSubmit)}>
                    <EditableText
                        isEditable={isEditing}
                        value={task.name}
                        register={register("name", {
                            required: "You have to enter a name!",
                        })}
                    />
                    {isEditing && (
                        <Button type="submit" size="small" color="primary">
                            Save
                        </Button>
                    )}
                </form>
                <div className="tags">
                    <UserPopover taskId={task.id} taskUser={task.user} />

                    {user?.preferences.show_board_tags && (
                        <>
                            {task.tags.slice(0, 3).map((tag) => (
                                <Tag tag={tag} />
                            ))}
                            {task.tags.length > 3 && (
                                <div className="tag">
                                    <span>+{task.tags.length - 3}</span>
                                </div>
                            )}
                        </>
                    )}
                </div>
                {workspace?.code_prefix_enabled && <div className="code-name">{task.code_name}</div>}
                {task.priority && <Icon className={`${task.priority} priority`} icon="priority" />}
            </div>
        </ContextMenu>
    );
});
