import {BoardColumn} from "./BoardColumn.tsx";
import "./ReleaseBoard.scss"

export const ReleaseBoard = () => {

    return (
        <div className="release-board">
            <BoardColumn type="adjustments"/>
            <BoardColumn type="todo"/>
            <BoardColumn type="in_progress"/>
            <BoardColumn type="review_pending"/>
            <BoardColumn type="testing"/>
            <BoardColumn type="accepted"/>
        </div>
    )
}