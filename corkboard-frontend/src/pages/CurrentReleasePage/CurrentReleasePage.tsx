import './CurrentReleasePage.scss';
import {Button} from '../../components/ui/Button/Button.tsx';
import {useEffect, useState} from 'react';
import {api} from '../../api/api.ts';
import {ReleaseBoard} from '../../components/features/ReleaseBoard/ReleaseBoard.tsx';
import type {ReleaseType} from '../../types/ReleaseType.ts';
import {useWorkspaceStore} from '../../store/workspaceStore.ts';
import {CreateReleaseModal} from "../ReleasesPage/CreateReleaseModal.tsx";
import {useReleasesStore} from "../../store/releasesStore.ts";
import {CompleteReleaseModal} from "./CompleteReleaseModal.tsx";

export const CurrentReleasePage = () => {
    const [release, setRelease] = useState<ReleaseType | null>(null);
    const workspaceId = useWorkspaceStore((state) => state.workspace?.id);
    const [showCreateReleaseModal, setShowCreateReleaseModal] = useState(false)
    const [showCompleteReleaseModal, setShowCompleteReleaseModal] = useState(false)
    const addRelease = useReleasesStore(state => state.addRelease)

    useEffect(() => {
        if (workspaceId) {
            api.get(`/workspaces/${workspaceId}/current_release`).then((res) => {
                setRelease(res.data);
            });
        }
    }, [workspaceId]);

    const handleCreateRelease = (name: string) => {
        addRelease(name, workspaceId!, (release: ReleaseType) => setRelease(release))
        setShowCreateReleaseModal(false)
    }

    const handleCompleteRelease = () => {
        api.post(`/workspaces/${workspaceId}/complete_release`).then((res) => {
            setRelease(res.data || null)
        })
    }

    return (
        <div className="current-release">
            <div className="current-release__content">
                <div className="current-release__header">
          <span>
            <span className="current-release__label">Current Release:</span> {release?.name || 'No Release'}
          </span>

                    <div className="current-release__buttons">
                        {!release && (
                            <Button color="primary" size="small">
                                Create Release
                            </Button>
                        )}
                        {release && (
                            <Button color="primary" size="small" onClick={() => setShowCompleteReleaseModal(true)}>
                                Complete Release
                            </Button>
                        )}
                    </div>
                </div>
                {release && <ReleaseBoard releaseId={release.id}/>}
                {!release && (
                    <div className="current-release__no-active">
                        <span>There is no active release</span>
                        <Button onClick={() => setShowCreateReleaseModal(true)}>Create Release</Button>
                    </div>
                )}
            </div>

            {showCreateReleaseModal && <CreateReleaseModal onSave={handleCreateRelease} onClose={() => setShowCreateReleaseModal(false)} />}
            {showCompleteReleaseModal && <CompleteReleaseModal onClose={() => setShowCompleteReleaseModal(false)} />}
        </div>
    );
};
