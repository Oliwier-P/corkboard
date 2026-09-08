import "./PriorityPopover.scss";
import classNames from "classnames";
import { Icon } from "@/ui/Icons/Icon.tsx";
import Popover from "@/ui/Popover/Popover.tsx";
import usePriorityPopover from "./usePriorityPopover.ts";

interface PriorityPopoverProps {
    taskId: string;
    taskPriority: string | null;
}

const priorities = ["medium", "high", "urgent"];

const PriorityPopover = ({ taskId, taskPriority }: PriorityPopoverProps) => {
    const { handleUpdateTaskStatus } = usePriorityPopover({ taskId, taskPriority });

    return (
        <div className="priority-popover">
            <Popover
                trigger={
                    <div className={classNames(taskPriority)}>
                        {taskPriority && <Icon icon="priority" />}
                        <span>{taskPriority ? taskPriority : "Empty"}</span>
                    </div>
                }
            >
                {priorities.map((priority) => (
                    <Popover.PopoverItem
                        className={priority}
                        icon={<Icon icon="priority" />}
                        label={priority}
                        value={priority}
                        selected={priority === taskPriority}
                        onSelect={handleUpdateTaskStatus}
                    />
                ))}
            </Popover>
        </div>
    );
};

export default PriorityPopover;
