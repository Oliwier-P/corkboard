import tasksApi from "@/api/tasks.ts";

interface usePriorityPopoverProps {
    taskId: string;
    taskPriority: string | null;
}

const usePriorityPopover = ({ taskId, taskPriority }: usePriorityPopoverProps) => {
    const handleUpdateTaskStatus = (priority: string) => {
        const newPriority = taskPriority === priority ? null : priority;

        tasksApi.update(taskId, { priority: newPriority }, (response) => {});
    };

    return { handleUpdateTaskStatus };
};

export default usePriorityPopover;
