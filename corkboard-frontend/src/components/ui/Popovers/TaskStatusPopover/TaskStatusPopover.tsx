import "./TaskStatusPopover.scss";
import classNames from "classnames";
import { upperCase } from "lodash";
import Popover from "../../Popover/Popover.tsx";
import useTaskStatusPopover from "./useTaskStatusPopover.ts";

interface TaskStatusPopoverProps {
    taskId: string;
    taskStatus: string;
}

const statuses = [
    { name: "ADJUSTMENTS", value: "adjustments" },
    { name: "TODO", value: "todo" },
    { name: "IN PROGRESS", value: "in_progress" },
    { name: "REVIEW PENDING", value: "review_pending" },
    { name: "TESTING", value: "testing" },
    { name: "ACCEPTED", value: "accepted" },
];

const TaskStatusPopover = ({ taskId, taskStatus }: TaskStatusPopoverProps) => {
    const { handleUpdateTaskStatus } = useTaskStatusPopover({ taskId, taskStatus });

    return (
        <div className="task-status-popover">
            <Popover
                trigger={
                    <div className={classNames(taskStatus)}>
                        <div className="dot"></div>
                        <span>{upperCase(taskStatus)}</span>
                    </div>
                }
            >
                {statuses.map((status) => (
                    <Popover.PopoverItem
                        icon={<div className={classNames("dot", status.value)}></div>}
                        label={status.name}
                        value={status.value}
                        selected={status.value === taskStatus}
                        onSelect={handleUpdateTaskStatus}
                    />
                ))}
            </Popover>
        </div>
    );
};

export default TaskStatusPopover;
