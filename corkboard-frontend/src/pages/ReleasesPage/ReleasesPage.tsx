import "./ReleasesPage.scss"
import {useEffect, useState} from "react";
import {CreateReleaseModal} from "./CreateReleaseModal.tsx";
import {useReleasesStore} from "../../store/releasesStore.ts";
import {Release} from "./Release.tsx";
import {Button} from "../../components/ui/Button/Button.tsx";
import type {ReleaseType} from "../../types/ReleaseType.ts";
import {DeleteReleaseModal} from "./DeleteReleaseModal.tsx";
import {EditReleaseModal} from "./EditReleaseModal.tsx";
import {useWorkspaceStore} from "../../store/workspaceStore.ts";
import {Row} from "../../components/layout/Row/Row.tsx";
import {Page} from "../../components/layout/Page/Page.tsx";

export const ReleasesPage = () => {
    const [showCreateReleaseModal, setShowCreateReleaseModal] = useState<boolean>(false)
    const [releaseToDelete, setReleaseToDelete] = useState<ReleaseType | null>(null)
    const [releaseToEdit, setReleaseToEdit] = useState<ReleaseType | null>(null)
    const releases = useReleasesStore(state => state.releases)
    const addRelease = useReleasesStore(state => state.addRelease)
    const deleteRelease = useReleasesStore(state => state.deleteRelease)
    const updateRelease = useReleasesStore(state => state.updateRelease)
    const fetchReleases = useReleasesStore(state => state.fetchReleases)
    const workspaceId = useWorkspaceStore(state => state.workspace?.id);

    const handleSave = (name: string) => {
        addRelease(name, workspaceId!)
        setShowCreateReleaseModal(false)
    }

    const handleDelete = (releaseId: number) => {
        deleteRelease(releaseId)
        setReleaseToDelete(null)
    }

    const handleEdit = (releaseId: number, name: string) => {
        updateRelease(releaseId, name)
        setReleaseToDelete(null)
    }

    useEffect(() => {
        if (!workspaceId) return;

        fetchReleases(workspaceId);
    }, [fetchReleases, workspaceId]);

    return (
        <Page title="Releases" className="releases">
            <div className="releases__content">
                <div className="releases__list">
                    <Row>
                        Releases
                        <Button variant="square" color="outlined" size="large"
                                onClick={() => setShowCreateReleaseModal(true)}>Create a new Release</Button>

                        <div className="releases__tabs">
                            <Button variant="square" color="outlined" size="large">
                                Not Queued
                            </Button>

                            <Button variant="square" color="outlined" size="large">
                                Completed
                            </Button>

                        </div>
                    </Row>

                    {releases && releases.map(release => (
                        <Release key={release.id} release={release}
                                 onEditClick={() => setReleaseToEdit(release)}
                                 onDeleteClick={() => setReleaseToDelete(release)}/>
                    ))}
                    <div className="releases__dropzone">
                        Drop Release Here to remove it from queue
                    </div>
                </div>

                <div className="releases__list">
                    Queue
                    {releases && releases.map(release => (
                        <Release key={release.id} release={release}
                                 onEditClick={() => setReleaseToEdit(release)}
                                 onDeleteClick={() => setReleaseToDelete(release)}/>
                    ))}
                    <div className="releases__dropzone">
                        Drop Release Here to add it to queue
                    </div>
                </div>
            </div>
            {showCreateReleaseModal &&

                <CreateReleaseModal onSave={handleSave} onClose={() => setShowCreateReleaseModal(false)}/>}
            {releaseToDelete && (
                <DeleteReleaseModal onClose={() => setReleaseToDelete(null)} releaseName={releaseToDelete.name}
                                    onDelete={() => handleDelete(releaseToDelete.id)}/>
            )}

            {releaseToEdit && (
                <EditReleaseModal onClose={() => setReleaseToEdit(null)} releaseName={releaseToEdit.name}
                                  onSave={(name: string) => handleEdit(releaseToEdit.id, name)}/>
            )}
        </Page>
    )
}