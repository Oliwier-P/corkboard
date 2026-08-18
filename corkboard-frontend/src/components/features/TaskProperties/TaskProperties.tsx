import "./TaskProperties.scss";
import type { TaskType } from "../../../types/ReleaseBoardTypes.ts";
import { Icon, type IconNames } from "../../ui/Icons/Icon.tsx";
import PriorityPopover from "../../ui/Popovers/PriorityPopover/PriorityPopover.tsx";
import TaskStatusPopover from "../../ui/Popovers/TaskStatusPopover/TaskStatusPopover.tsx";
import UserPopover from "../../ui/Popovers/UserPopover/UserPopover.tsx";

interface TaskPropertiesProps {
    task: TaskType;
}

type ColumnType = {
    id: string;
    name: string;
    icon: IconNames;
    component: React.JSX.Element;
};

const TaskProperties = ({ task }: TaskPropertiesProps) => {
    const columns: ColumnType[] = [
        {
            id: "assign",
            name: "Assign",
            icon: "circleUser",
            component: <UserPopover taskId={task.id} taskUser={task.user} variant="modal" />,
        },
        {
            id: "status",
            name: "Status",
            icon: "circleStatus",
            component: <TaskStatusPopover taskId={task.id} taskStatus={task.status} />,
        },
        {
            id: "priority",
            name: "Priority",
            icon: "priority",
            component: <PriorityPopover taskId={task.id} taskPriority={task.priority} />,
        },
    ];

    return (
        <div className="task-properties">
            {columns.map((property) => (
                <div className="row">
                    <div className="title">
                        <Icon icon={property.icon} />
                        {property.name}
                    </div>
                    <div className="value">{property.component}</div>
                </div>
            ))}
        </div>
    );
};

export default TaskProperties;
