import "./TaskModal.scss";
import { useTaskStore } from "../../../store/taskStore.ts";
import { UserSelect } from "../../ui/UserSelect/UserSelect.tsx";
import classNames from "classnames";
import { upperCase } from "lodash";
import { CollaborativeEditor } from "../CollaborativeEditor/CollaborativeEditor.tsx";
import { useReleaseBoardStore } from "../../../store/releaseBoardStore.ts";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../context/auth/useAuth.ts";
import { api } from "../../../api/api.ts";

const TaskModal = () => {
    const isOpen = useTaskStore((state) => state.isOpen);
    const taskId = useTaskStore((state) => state.taskId);
    const setIsOpen = useTaskStore((state) => state.setIsOpen);

    const shouldRender = useDelayedUnmount(isOpen);

    if (!shouldRender || !taskId) return null;

    return (
        <div
            className="task-modal-overlay"
            onClick={(e) => {
                if (e.target === e.currentTarget) setIsOpen(false);
            }}
        >
            <TaskModalContent key={taskId} taskId={taskId} isClosing={!isOpen} />
        </div>
    );
};

interface TaskModalContentProps {
    taskId: number;
    isClosing: boolean;
}

const TaskModalContent = ({ taskId, isClosing }: TaskModalContentProps) => {
    const task = useReleaseBoardStore((state) => state.tasks[taskId]);
    const updateTask = useReleaseBoardStore((state) => state.updateTask);

    const [taskName, setTaskName] = useState<string>(task.name);
    const { user, token } = useAuth();
    const [documentId, setDocumentId] = useState<number | null>(null);
    const textareaRef = useAutoResizeTextarea(taskName);

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
        <div className={classNames("task-modal", { "task-modal--closing": isClosing })}>
            <textarea
                ref={textareaRef}
                className="task-modal__name"
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
            />

            <div className="task-modal__properties">
                <div className="owner">
                    <UserSelect taskId={taskId} taskUser={task.user} />
                    <span>{task.user ? task.user.username : "Assign"}</span>
                </div>

                <div className={classNames("status", task.status)}>
                    <div className="dot"></div>
                    <span>{upperCase(task.status)}</span>
                </div>
            </div>

            {user && token && documentId && <CollaborativeEditor documentId={documentId} user={user} authToken={token} />}
        </div>
    );
};

const useDelayedUnmount = (isOpen: boolean) => {
    const [shouldRender, setShouldRender] = useState(isOpen);

    if (isOpen && !shouldRender) {
        setShouldRender(true);
    }

    useEffect(() => {
        if (isOpen) return;

        const timeoutId = setTimeout(() => setShouldRender(false), 200);
        return () => clearTimeout(timeoutId);
    }, [isOpen]);

    return shouldRender;
};

const useAutoResizeTextarea = (value: string) => {
    const ref = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = ref.current;
        if (!textarea) return;

        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    }, [value]);

    return ref;
};

export default TaskModal;
