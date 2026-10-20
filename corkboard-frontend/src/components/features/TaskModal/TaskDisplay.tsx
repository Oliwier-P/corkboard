import { useTaskStore } from "@/store/taskStore.ts";
import TaskSidebar from "./TaskSidebar.tsx";
import TaskModal from "./TaskModal.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";

const TaskDisplay = () => {
    const isOpen = useTaskStore((state) => state.isOpen);
    const task = useTaskStore((state) => state.task);
    const { user } = useAuth();

    if (!isOpen || !task || !user) return null;

    return <div className="task-display">{user.preferences.task_display === "sidebar" ? <TaskSidebar task={task} /> : <TaskModal task={task} />}</div>;
};

export default TaskDisplay;
