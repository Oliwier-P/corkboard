import "./TaskModal.scss";
import Modal from "@/ui/Modal/Modal.tsx";
import { useTaskStore } from "@/store/taskStore.ts";
import { TaskEditorContent } from "./TaskEditorContent.tsx";
import type { TaskType } from "@/types/ReleaseBoardTypes.ts";

interface TaskModalProps {
    task: TaskType;
}

const TaskModal = ({ task }: TaskModalProps) => {
    const setIsOpen = useTaskStore((state) => state.setIsOpen);

    return (
        <Modal className="task-modal" onClose={() => setIsOpen(false)}>
            <Modal.Body>
                <TaskEditorContent key={task.id} task={task} />
            </Modal.Body>
        </Modal>
    );
};

export default TaskModal;
