import "./TaskModal.scss";
import { useTaskStore } from "../../../store/taskStore.ts";
import { UserSelect } from "../../ui/UserSelect/UserSelect.tsx";
import classNames from "classnames";
import { CollaborativeEditor } from "../CollaborativeEditor/CollaborativeEditor.tsx";
import { useReleaseBoardStore } from "../../../store/releaseBoardStore.ts";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth/useAuth.ts";
import { api } from "../../../api/api.ts";
import Modal from "../../ui/Modal/Modal.tsx";
import Loading from "../../ui/Loading/Loading.tsx";
import TaskStatusSelect from "../../ui/TaskStatusSelect/TaskStatusSelect.tsx";

interface TaskModalProps {
    taskId: number;
}

const TaskModal = ({ taskId }: TaskModalProps) => {
    const task = useReleaseBoardStore((state) => state.tasks[taskId]);
    const updateTask = useReleaseBoardStore((state) => state.updateTask);
    const setIsOpen = useTaskStore((state) => state.setIsOpen);

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
            <Modal className="task-modal" onClose={() => setIsOpen(false)}>
                <Modal.Body>
                    {user && documentId && token ? (
                        <>
                            {!isDocumentReady && <Loading />}

                            <div className={classNames("task-modal-content", { "task-modal-hidden": !isDocumentReady })}>
                                <textarea
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
                                <div className="task-modal__properties">
                                    <div className="owner">
                                        <UserSelect taskId={taskId} taskUser={task.user} />
                                        <span>{task.user ? task.user.username : "Assign"}</span>
                                    </div>

                                    <TaskStatusSelect taskId={taskId} taskStatus={task.status} />
                                </div>
                                <CollaborativeEditor documentId={documentId} user={user} authToken={token} onReadyChange={setIsDocumentReady} />
                            </div>
                        </>
                    ) : (
                        <Loading />
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default TaskModal;
