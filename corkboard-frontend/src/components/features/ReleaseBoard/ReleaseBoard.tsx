import {useReleaseBoardStore} from "../../../store/releaseBoardStore.ts";
import {BoardColumn} from "../BoardColumn/BoardColumn.tsx";

import "./ReleaseBoard.scss"
import {useEffect} from "react";
import {useShallow} from "zustand/react/shallow";
import {DraggedTaskOverlay} from "./DraggedTaskOverlay.tsx";

type ReleaseBoardProps = {
    releaseId: number
}
export const ReleaseBoard = ({releaseId}: ReleaseBoardProps) => {
    const columnIds = useReleaseBoardStore(useShallow(state => state.columns.map(col => col.id)))
    const {fetchBoard} = useReleaseBoardStore.getState()


    useEffect(() => {
        if (releaseId) {
            fetchBoard(releaseId)
        }
    }, [releaseId]);

    return (
        <div className="release-board">
            {columnIds.filter(col => !["review_pending", "testing", "accepted"].includes(col as string)).map(col =>
                <BoardColumn columnId={col} key={col}/>)}

            <div className="release-board__column-group">
                {columnIds.filter(col => ["review_pending", "testing"].includes(col as string)).map(col => (
                    <BoardColumn columnId={col} key={col}/>
                ))}
            </div>
            <BoardColumn columnId={columnIds[columnIds.length - 1]} key="accepted"/>
            <DraggedTaskOverlay/>
        </div>
    )
}