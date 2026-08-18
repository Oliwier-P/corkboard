import { useReleaseBoardStore } from "../../../../store/releaseBoardStore.ts";

interface useTaskStatusPopoverProps {
    taskId: string;
    taskStatus: string;
}

const useTaskStatusPopover = ({ taskId, taskStatus }: useTaskStatusPopoverProps) => {
    const moveTaskBetweenColumns = useReleaseBoardStore((state) => state.moveTaskBetweenColumns);

    const handleUpdateTaskStatus = (value: string) => {
        if (taskStatus === value) {
            return;
        }

        moveTaskBetweenColumns(taskId, taskStatus, value);
    };

    return { handleUpdateTaskStatus };
};

export default useTaskStatusPopover;
