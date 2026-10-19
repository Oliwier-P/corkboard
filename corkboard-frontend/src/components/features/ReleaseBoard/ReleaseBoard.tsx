import "./ReleaseBoard.scss";
import { useCallback, useEffect, useState } from "react";
import { BoardColumn } from "../BoardColumn/BoardColumn.tsx";
import releasesApi from "@/api/releases.ts";
import type { ReleaseTasks, TaskStatus, TaskType } from "@/types/ReleaseBoardTypes.ts";

type ReleaseBoardProps = {
    releaseId: string;
};

const MAIN_COLUMNS: TaskStatus[] = ["todo", "in_progress", "adjustments"];
const GROUPED_COLUMNS: TaskStatus[] = ["review_pending", "testing"];

const EMPTY_RELEASE_TASKS: ReleaseTasks = {
    backlog: [],
    todo: [],
    in_progress: [],
    review_pending: [],
    testing: [],
    adjustments: [],
    accepted: [],
};

export const ReleaseBoard = ({ releaseId }: ReleaseBoardProps) => {
    const [creatingIn, setCreatingIn] = useState<TaskStatus | null>(null);
    const [tasks, setTasks] = useState<ReleaseTasks>(EMPTY_RELEASE_TASKS);

    useEffect(() => {
        releasesApi.getBoard(releaseId, (response) => {
            setTasks({ ...EMPTY_RELEASE_TASKS, ...response });
        });
    }, [releaseId]);

    const handleTaskCreate = useCallback((task: TaskType) => {
        setTasks((prev) => {
            const list = prev[task.status] ?? [];
            if (list.some((t) => t.id === task.id)) return prev;
            return { ...prev, [task.status]: [...list, task] };
        });
    }, []);

    const handleTaskDelete = useCallback((task: TaskType) => {
        setTasks((prev) => {
            const list = prev[task.status] ?? [];
            if (!list.some((t) => t.id === task.id)) return prev;
            return { ...prev, [task.status]: list.filter((t) => t.id !== task.id) };
        });
    }, []);

    useEffect(() => {
        console.log(tasks);
    }, [tasks]);

    const renderColumn = (status: TaskStatus) => (
        <BoardColumn
            key={status}
            columnId={status}
            tasks={tasks[status]}
            onTaskCreate={handleTaskCreate}
            onTaskDelete={handleTaskDelete}
            isCreateTaskOpen={creatingIn === status}
            setIsCreateTaskOpen={(open) => setCreatingIn(open ? status : null)}
        />
    );

    return (
        <div className="release-board">
            {MAIN_COLUMNS.map(renderColumn)}

            <div className="release-board__column-group">{GROUPED_COLUMNS.map(renderColumn)}</div>

            {renderColumn("accepted")}
        </div>
    );
};
