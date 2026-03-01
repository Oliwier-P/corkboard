import "./EmptyTask.scss"
import {Input} from "../../ui/Input/Input.tsx";
import {Button} from "../../ui/Button/Button.tsx";

export const EmptyTask = () => {
    return (
        <div className="empty-task">
            <div className="empty-task__header">
                <Input placeholder="Task Name..." variant="no-border"/>
                <Button color="primary" size="small">Save</Button>
            </div>
        </div>
    )
}