import {ClassNames} from "../../../global/utils.ts";
import "./BoardColumn.scss"
import {Button} from "../../ui/Button/Button.tsx";
import * as _ from 'lodash'

type BoardColumnProps = {
    type: "adjustments" | "todo" | "in_progress" | "review_pending" | "testing" | "accepted"
}
export const BoardColumn = ({type}: BoardColumnProps) => {
    return (
        <div className={ClassNames("board-column", [type])}>
            <div className="board-column__header">
                <div className="board-column__dot" />
                {_.upperCase(type)}
            </div>
            <div className="board-column__tasks">

            </div>
            <Button className="board-column__add-task" variant="text">+ Add Task</Button>
        </div>
    )
}