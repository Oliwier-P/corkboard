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
        addRelease(name)
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
        <div className="releases">
            <div className="releases__top-bar">Releases</div>
            <div className="releases__content">
                <div className="releases__list">
                    <div className="releases__header">
                        <div>Name</div>
                        <div>Progress</div>
                    </div>
                    {releases && releases.map(release => (
                        <Release key={release.id} release={release}
                                 onEditClick={() => setReleaseToEdit(release)}
                                 onDeleteClick={() => setReleaseToDelete(release)}/>
                    ))}
                    <Button variant="text" className="releases__new-release-btn"
                            onClick={() => setShowCreateReleaseModal(true)}>+ New Release</Button>
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
        </div>
    )
}