import {ClassNames} from "../../../global/utils.ts";
import "./BoardColumn.scss"
import {Button} from "../../ui/Button/Button.tsx";

type BoardColumnProps = {
    type: "adjustments" | "todo" | "in_progress" | "review_pending" | "testing" | "accepted"
}
export const BoardColumn = ({type}: BoardColumnProps) => {
    return (
        <div className={ClassNames("board-column", [type])}>
            <div className="board-column__header">
                <div className="board-column__dot" />
                {type}
            </div>
            <div className="board-column__tasks">

            </div>
            <Button className="board-column__add-task" variant="text">+ Add Task</Button>
        </div>
    )
}