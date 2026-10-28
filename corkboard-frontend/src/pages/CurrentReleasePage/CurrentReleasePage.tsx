import "./CurrentReleasePage.scss";
import { Button } from "@/ui/Button/Button.tsx";
import { useEffect, useState } from "react";
import { ReleaseBoard } from "@/features/ReleaseBoard/ReleaseBoard.tsx";
import type { ReleaseType } from "@/types/ReleaseType.ts";
import { useWorkspaceStore } from "@/store/workspaceStore.ts";
import { Page } from "@/layout/Page/Page.tsx";
import { useReleaseSubscription } from "@/store/useReleaseSubscription.ts";
import { useAuth } from "@/context/auth/useAuth.ts";
import Loading from "@/ui/Loading/Loading.tsx";
import CreateModal from "@/ui/Modals/CreateModal.tsx";
import releasesApi from "@/api/releases.ts";
import workspacesApi from "@/api/workspaces.ts";
import CompleteReleaseModal, { type NotAcceptedTasksAction } from "@/pages/CurrentReleasePage/CompleteReleaseModal.tsx";

export const CurrentReleasePage = () => {
    const [release, setRelease] = useState<ReleaseType | null>(null);
    const workspaceId = useWorkspaceStore((state) => state.workspace?.id);
    const [showCreateReleaseModal, setShowCreateReleaseModal] = useState(false);
    const [showCompleteReleaseModal, setShowCompleteReleaseModal] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const { user } = useAuth();

    useReleaseSubscription(release ? release.id : null, user ? user.id : null);

    useEffect(() => {
        if (!workspaceId) return;

        workspacesApi.getCurrentRelease(workspaceId, (response) => {
            setRelease(response);
            setLoading(false);
        });
    }, [workspaceId]);

    const handleCreateRelease = (data: { name: string }) => {
        if (!workspaceId) return;

        releasesApi.create({ name: data.name, workspace_id: workspaceId, status: "QUEUED" }, (response) => {
            setRelease(response);
            setShowCreateReleaseModal(false);
        });
    };

    const handleCompleteRelease = (tasksAction: NotAcceptedTasksAction) => {
        if (!workspaceId || !tasksAction) return;

        workspacesApi.completeRelease(workspaceId, { tasks_action: tasksAction }, (response) => {
            setRelease(response || null);
            setShowCompleteReleaseModal(false);
        });
    };

    const renderOptionsButtons = () => {
        return (
            <>
                {release && (
                    <Button color="primary" size="small" onClick={() => setShowCompleteReleaseModal(true)}>
                        Complete Release
                    </Button>
                )}
            </>
        );
    };

    if (loading) return <Loading overlay={true} />;

    return (
        <Page title="Current Release" subTitle={release?.name} className="current-release" buttons={renderOptionsButtons()}>
            {release && <ReleaseBoard releaseId={release.id} />}
            {!release && (
                <div className="current-release__no-active">
                    <span>There is no active release</span>
                    <Button onClick={() => setShowCreateReleaseModal(true)}>Create Release</Button>
                </div>
            )}

            {showCreateReleaseModal && <CreateModal title="Create new release" onSave={handleCreateRelease} onClose={() => setShowCreateReleaseModal(false)} />}
            {showCompleteReleaseModal && <CompleteReleaseModal onClose={() => setShowCompleteReleaseModal(false)} onSave={handleCompleteRelease} />}
        </Page>
    );
};
