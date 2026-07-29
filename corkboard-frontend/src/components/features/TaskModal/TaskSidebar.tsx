import "./TaskSidebar.scss";
import { useTaskStore } from "../../../store/taskStore.ts";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { UserSelect } from "../../ui/UserSelect/UserSelect.tsx";
import { CollaborativeEditor } from "../CollaborativeEditor/CollaborativeEditor.tsx";
import { useReleaseBoardStore } from "../../../store/releaseBoardStore.ts";
import { useAuth } from "../../../context/auth/useAuth.ts";
import { api } from "../../../api/api.ts";
import { useDelayedUnmount } from "./useTaskDisplay.ts";
import Loading from "../../ui/Loading/Loading.tsx";
import TaskStatusSelect from "../../ui/TaskStatusSelect/TaskStatusSelect.tsx";

interface TaskSidebarProps {
    taskId: number;
}

const TaskSidebar = ({ taskId }: TaskSidebarProps) => {
    const isOpen = useTaskStore((state) => state.isOpen);
    const setIsOpen = useTaskStore((state) => state.setIsOpen);
    const shouldRender = useDelayedUnmount(isOpen);

    if (!shouldRender) return null;

    return (
        <div
            className="task-sidebar-overlay"
            onClick={(e) => {
                if (e.target === e.currentTarget) setIsOpen(false);
            }}
        >
            <TaskSidebarContent key={taskId} taskId={taskId} isClosing={!isOpen} />
        </div>
    );
};

interface TaskSidebarContentProps {
    taskId: number;
    isClosing: boolean;
}

const TaskSidebarContent = ({ taskId, isClosing }: TaskSidebarContentProps) => {
    const task = useReleaseBoardStore((state) => state.tasks[taskId]);
    const updateTask = useReleaseBoardStore((state) => state.updateTask);

    const [taskName, setTaskName] = useState<string>(task.name);
    const { user, token } = useAuth();
    const [documentId, setDocumentId] = useState<number | null>(null);
    const [isDocumentReady, setIsDocumentReady] = useState(false);

    useEffect(() => {
        api.get(`/tasks/${taskId}/document`).then((response) => {
            setDocumentId(response.data.id);
        });
    }, [taskId]);

    const handleUpdateTaskName = (value: string) => {
        if (task.name !== value) {
            api.patch(`tasks/${taskId}`, { name: value }).then(() => {
                updateTask(taskId, { name: value });
            });
        }
    };

    if (!task) return null;

    return (
        <>
            <div className={classNames("task-sidebar", { "task-sidebar-closing": isClosing })}>
                {!isDocumentReady && <Loading />}

                <div className={classNames({ "task-sidebar-hidden": !isDocumentReady })}>
                    <textarea
                        className="task-sidebar__name"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        onBlur={(e) => {
                            const trimmedValue = e.target.value.trim();
                            if (!trimmedValue) {
                                setTaskName(task.name);
                                return;
                            }
                            handleUpdateTaskName(trimmedValue);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();

                                const trimmedValue = taskName.trim();
                                if (!trimmedValue) {
                                    setTaskName(task.name);
                                    return;
                                }

                                handleUpdateTaskName(trimmedValue);

                                e.currentTarget.blur();
                            }
                        }}
                    />

                    <div className="task-sidebar__properties">
                        <div className="owner">
                            <UserSelect taskId={taskId} taskUser={task.user} />
                            <span>{task.user ? task.user.username : "Assign"}</span>
                        </div>

                        <TaskStatusSelect taskId={taskId} taskStatus={task.status} />
                    </div>

                    {user && token && documentId && (
                        <CollaborativeEditor documentId={documentId} user={user} authToken={token} onReadyChange={setIsDocumentReady} />
                    )}
                </div>
            </div>
        </>
    );
};

export default TaskSidebar;
