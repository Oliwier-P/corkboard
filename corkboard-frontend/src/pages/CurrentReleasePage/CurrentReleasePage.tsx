import './CurrentReleasePage.scss';
import {Button} from '../../components/ui/Button/Button.tsx';
import {useEffect, useState} from 'react';
import {api} from '../../api/api.ts';
import {ReleaseBoard} from '../../components/features/ReleaseBoard/ReleaseBoard.tsx';
import type {ReleaseType} from '../../types/ReleaseType.ts';
import {useWorkspaceStore} from '../../store/workspaceStore.ts';

export const CurrentReleasePage = () => {
    const [release, setRelease] = useState<ReleaseType | null>(null);
    const workspaceId = useWorkspaceStore((state) => state.workspace?.id);

    useEffect(() => {
        if (workspaceId) {
            api.get(`/workspaces/${workspaceId}/current_release`).then((res) => {
                setRelease({
                    ...res.data,
                });
            });
        }
    }, [workspaceId]);

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
                            <Button color="primary" size="small">
                                Complete Release
                            </Button>
                        )}
                    </div>
                </div>
                {release && <ReleaseBoard releaseId={release.id}/>}
            </div>
        </div>
    );
};
