import "./TaskModal.scss";
import Modal from "../../ui/Modal/Modal.tsx";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useReleaseBoardStore } from "../../../store/releaseBoardStore.ts";
import { CollaborativeEditor } from "../CollaborativeEditor/CollaborativeEditor.tsx";
import { useAuth } from "../../../context/auth/useAuth.ts";
import { api } from "../../../api/api.ts";
import { UserSelect } from "../../ui/UserSelect/UserSelect.tsx";
import { upperCase } from "lodash";
import classNames from "classnames";

interface TaskModalProps {
    taskId: number;
    setShowTaskModal: Dispatch<SetStateAction<boolean>>;
}

const TaskModal = ({ taskId, setShowTaskModal }: TaskModalProps) => {
    const task = useReleaseBoardStore((state) => state.tasks[taskId]);
    const updateTask = useReleaseBoardStore((state) => state.updateTask);
    const [taskName, setTaskName] = useState<string>(task.name);
    const { user, token } = useAuth();
    const [documentId, setDocumentId] = useState<number | null>(null);

    useEffect(() => {
        api.get(`/tasks/${taskId}/document`).then((response) => {
            setDocumentId(response.data.id);
        });
    }, []);

    const handleUpdateTaskName = (value: string) => {
        if (task.name !== value) {
            api.patch(`tasks/${taskId}`, { name: value }).then(() => {
                updateTask(taskId, { name: value });
            });
        }
    };

    return (
        <Modal className="task-modal" onClose={() => setShowTaskModal(false)}>
            <Modal.Body>
                <textarea
                    className="task-modal__name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    onBlur={(e) => handleUpdateTaskName(e.target.value)}
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
            </Modal.Body>
        </Modal>
    );
};

export default TaskModal;
