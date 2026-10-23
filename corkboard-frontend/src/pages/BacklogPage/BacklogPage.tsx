import "./BacklogPage.scss";
import { Page } from "@/layout/Page/Page.tsx";
import { BacklogColumn } from "@/pages/BacklogPage/BacklogColumn/BacklogColumn.tsx";
import { useEffect, useState } from "react";
import { useWorkspaceStore } from "@/store/workspaceStore.ts";
import { useReleaseBoardStore } from "@/store/releaseBoardStore.ts";
import { BoardColumn } from "@/features/BoardColumn/BoardColumn.tsx";
import { useShallow } from "zustand/react/shallow";
import type { ReleaseType } from "@/types/ReleaseType.ts";
import Loading from "@/ui/Loading/Loading.tsx";
import workspacesApi from "@/api/workspaces.ts";

export const BacklogPage = () => {
    const workspaceId = useWorkspaceStore((state) => state.workspace?.id);

    const fetchBoard = useReleaseBoardStore((state) => state.fetchBoard);
    const fetchBacklog = useReleaseBoardStore((state) => state.fetchBacklog);

    const columnIds = useReleaseBoardStore(useShallow((state) => state.columns.map((col) => col.id)));
    const [isCreateTaskOpen, setIsCreateTaskOpen] = useState<boolean>(false);

    const [release, setRelease] = useState<ReleaseType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (workspaceId) {
            workspacesApi.getCurrentRelease(workspaceId, (response) => {
                setLoading(false);
                setRelease(response);
                fetchBoard(response.id, () => fetchBacklog(workspaceId));
            });
        }
    }, [workspaceId, fetchBoard, fetchBacklog]);

    useEffect(() => {
        console.log(loading);
    }, [loading]);

    if (loading) return <Loading overlay={true} />;

    return (
        <Page title="Backlog" subTitle={release?.name} className="backlog-page">
            <BacklogColumn title="Backlog" icon="rows">
                <BoardColumn columnId="backlog" key="backlog" isCreateTaskOpen={isCreateTaskOpen} setIsCreateTaskOpen={setIsCreateTaskOpen} />
            </BacklogColumn>

            <BacklogColumn title="Tasks" icon="box">
                {release ? (
                    columnIds
                        .filter((col) => !["backlog"].includes(col as string))
                        .map((col) => <BoardColumn columnId={col} key={col} isCreateTaskOpen={isCreateTaskOpen} setIsCreateTaskOpen={setIsCreateTaskOpen} />)
                ) : (
                    <div className="releases-empty-message">You don't have any active releases yet.</div>
                )}
            </BacklogColumn>
        </Page>
    );
};
