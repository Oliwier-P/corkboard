import { useReleaseBoardStore } from "@/store/releaseBoardStore.ts";
import tasksApi from "@/api/tasks.ts";

interface usePriorityPopoverProps {
    taskId: string;
    taskPriority: string | null;
}

const usePriorityPopover = ({ taskId, taskPriority }: usePriorityPopoverProps) => {
    const updateTask = useReleaseBoardStore((state) => state.updateTask);

    const handleUpdateTaskStatus = (priority: string) => {
        tasksApi.update(taskId, { priority: taskPriority === priority ? null : priority }, (response) => {
            updateTask(taskId, { priority: response.task.priority });
        });
    };

    return { handleUpdateTaskStatus };
};

export default usePriorityPopover;
