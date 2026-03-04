import "./Task.scss"
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {UserSelect} from "../UserSelect/UserSelect.tsx";
import {Button} from "../Button/Button.tsx";
import {Icon} from "../Icons/Icon.tsx";

type TaskProps = {
    id: number
    name: string
}
export const Task = ({id, name}: TaskProps) => {
    const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({id: id})

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1
    }


    return (
        <div className="task" ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div className="task__options">
                <Button variant="icon">
                    <Icon icon="Edit"/>
                </Button>
                <Button variant="icon">
                    <Icon icon="Trash"/>
                </Button>
                <Button variant="icon">
                    <Icon icon="Dots"/>
                </Button>
            </div>
            <div className="task__header">
                {name}
            </div>
            <UserSelect/>
        </div>
    )
}