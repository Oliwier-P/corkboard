import { useTaskStore } from "../../../store/taskStore.ts";
import TaskSidebar from "./TaskSidebar.tsx";
import TaskModal from "./TaskModal.tsx";
import { useAuth } from "../../../context/auth/useAuth.ts";

const TaskDisplay = () => {
    const isOpen = useTaskStore((state) => state.isOpen);
    const taskId = useTaskStore((state) => state.taskId);
    const { user } = useAuth();

    if (!isOpen || !taskId || !user) return null;

    return <>{user.preferences.task_display === "SIDEBAR" ? <TaskSidebar taskId={taskId} /> : <TaskModal taskId={taskId} />}</>;
};

export default TaskDisplay;
