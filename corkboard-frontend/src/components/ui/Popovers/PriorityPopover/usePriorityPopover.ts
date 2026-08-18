import { useReleaseBoardStore } from "../../../../store/releaseBoardStore.ts";

interface usePriorityPopoverProps {
    taskId: string;
    taskPriority: string | null;
}

const usePriorityPopover = ({ taskId, taskPriority }: usePriorityPopoverProps) => {
    const updateTask = useReleaseBoardStore((state) => state.updateTask);

    const handleUpdateTaskStatus = (priority: string) => {
        if (taskPriority === priority) {
            updateTask(taskId, { priority: null });
        } else {
            updateTask(taskId, { priority: priority });
        }
    };

    return { handleUpdateTaskStatus };
};

export default usePriorityPopover;
