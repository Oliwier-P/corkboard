import "./BacklogPage.scss";
import { Page } from "@/layout/Page/Page.tsx";
import { BacklogColumn } from "@/pages/BacklogPage/BacklogColumn/BacklogColumn.tsx";
import { useCallback, useEffect, useState } from "react";
import { useWorkspaceStore } from "@/store/workspaceStore.ts";
import { BoardColumn } from "@/features/BoardColumn/BoardColumn.tsx";
import Loading from "@/ui/Loading/Loading.tsx";
import type { ReleaseTasks, TaskType } from "@/types/ReleaseBoardTypes.ts";
import workspacesApi from "@/api/workspaces.ts";
import { BOARD_COLUMNS } from "@/global/utils.ts";

const EMPTY_RELEASE_TASKS = Object.fromEntries(BOARD_COLUMNS.map((s) => [s, []])) as unknown as ReleaseTasks;

export const BacklogPage = () => {
    const workspaceId = useWorkspaceStore((state) => state.workspace?.id);
    const [backlogTasks, setBacklogTasks] = useState<TaskType[]>([]);
    const [releaseTasks, setReleaseTasks] = useState<ReleaseTasks>(EMPTY_RELEASE_TASKS);
    const [releaseName, setReleaseName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [isCreateTaskOpen, setIsCreateTaskOpen] = useState<boolean>(false);

    const handleTaskCreate = useCallback((task: TaskType) => {
        setReleaseTasks((prev) => {
            const list = prev[task.status] ?? [];
            if (list.some((t) => t.id === task.id)) return prev;
            return { ...prev, [task.status]: [...list, task] };
        });
    }, []);

    const handleTaskDelete = useCallback((task: TaskType) => {
        setReleaseTasks((prev) => {
            const list = prev[task.status] ?? [];
            if (!list.some((t) => t.id === task.id)) return prev;
            return { ...prev, [task.status]: list.filter((t) => t.id !== task.id) };
        });
    }, []);

    useEffect(() => {
        if (!workspaceId) return;

        workspacesApi.getBacklog(workspaceId, (response) => {
            setBacklogTasks(response.backlog_tasks);
            setReleaseTasks(response.release_tasks);
            setReleaseName(response.release_name);
            setLoading(false);
        });
    }, [workspaceId]);

    if (loading) return <Loading overlay={true} />;

    return (
        <Page title="Backlog" subTitle={releaseName} className="backlog-page">
            <BacklogColumn title="Backlog" icon="rows">
                <BoardColumn
                    columnId="backlog"
                    key="backlog"
                    tasks={backlogTasks}
                    onTaskCreate={(response) => setBacklogTasks((prev) => [...prev, response])}
                    onTaskDelete={(task) => setBacklogTasks((prev) => prev.filter((t) => t.id !== task.id))}
                    isCreateTaskOpen={isCreateTaskOpen}
                    setIsCreateTaskOpen={setIsCreateTaskOpen}
                />
            </BacklogColumn>

            <BacklogColumn title="Tasks" icon="box">
                {BOARD_COLUMNS.map((status) => (
                    <BoardColumn
                        columnId={status}
                        key={status}
                        tasks={releaseTasks[status]}
                        onTaskCreate={handleTaskCreate}
                        onTaskDelete={handleTaskDelete}
                        isCreateTaskOpen={isCreateTaskOpen}
                        setIsCreateTaskOpen={setIsCreateTaskOpen}
                    />
                ))}
            </BacklogColumn>
        </Page>
    );
};
