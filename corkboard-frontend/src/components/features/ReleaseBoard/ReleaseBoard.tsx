import { useReleaseBoardStore } from "@/store/releaseBoardStore.ts";
import { BoardColumn } from "../BoardColumn/BoardColumn.tsx";

import "./ReleaseBoard.scss";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import releasesApi from "@/api/releases.ts";

type ReleaseBoardProps = {
    releaseId: string;
};

export const ReleaseBoard = ({ releaseId }: ReleaseBoardProps) => {
    const columnIds = useReleaseBoardStore(useShallow((state) => state.columns.map((col) => col.id)));
    const setBoard = useReleaseBoardStore((state) => state.setBoard);
    const [isCreateTaskOpen, setIsCreateTaskOpen] = useState<boolean>(false);

    useEffect(() => {
        if (!releaseId) return;
        releasesApi.getBoard(releaseId, (response) => {
            setBoard(releaseId, response);
        });
    }, [releaseId, setBoard]);

    return (
        <div className="release-board">
            {columnIds
                .filter((col) => !["backlog", "review_pending", "testing", "accepted"].includes(col as string))
                .map((col) => (
                    <BoardColumn columnId={col} key={col} releaseId={releaseId} isCreateTaskOpen={isCreateTaskOpen} setIsCreateTaskOpen={setIsCreateTaskOpen} />
                ))}

            <div className="release-board__column-group">
                {columnIds
                    .filter((col) => ["review_pending", "testing"].includes(col as string))
                    .map((col) => (
                        <BoardColumn
                            columnId={col}
                            key={col}
                            releaseId={releaseId}
                            isCreateTaskOpen={isCreateTaskOpen}
                            setIsCreateTaskOpen={setIsCreateTaskOpen}
                        />
                    ))}
            </div>
            <BoardColumn
                columnId={columnIds[columnIds.length - 1]}
                key="accepted"
                releaseId={releaseId}
                isCreateTaskOpen={isCreateTaskOpen}
                setIsCreateTaskOpen={setIsCreateTaskOpen}
            />
        </div>
    );
};
