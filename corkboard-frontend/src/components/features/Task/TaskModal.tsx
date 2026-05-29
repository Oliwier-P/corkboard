import "./TaskModal.scss";
import Modal from "../../ui/Modal/Modal.tsx";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useReleaseBoardStore } from "../../../store/releaseBoardStore.ts";
import { UserAvatar } from "../../ui/UserAvatar/UserAvatar.tsx";
import { CollaborativeEditor } from "../CollaborativeEditor/CollaborativeEditor.tsx";
import { useAuth } from "../../../context/auth/useAuth.ts";
import { api } from "../../../api/api.ts";

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

                <div className="task-modal__owner">
                    <UserAvatar username={"Admin"} />
                    <span>{"Admin"}</span>
                </div>

                {user && token && documentId && <CollaborativeEditor documentId={documentId} user={user} authToken={token} />}
            </Modal.Body>
        </Modal>
    );
};

export default TaskModal;
