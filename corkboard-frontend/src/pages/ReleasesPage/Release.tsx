import "./Release.scss"
import {Icon} from "../../components/ui/Icons/Icon.tsx";
import {Button} from "../../components/ui/Button/Button.tsx";
import {useReleasesStore} from "../../store/releasesStore.ts";
import {ClassNames} from "../../global/utils.ts";
import {Progress} from "../../components/ui/ProgressBar/Progress.tsx";
import type {ReleaseType} from "../../types/ReleaseType.ts";

type ReleasesListItemProps = {
    release: ReleaseType
    onDeleteClick: () => void
    onEditClick: () => void
}

export const Release = ({release, onDeleteClick, onEditClick}: ReleasesListItemProps) => {
    const currentReleaseId = useReleasesStore(state => state.currentReleaseId)
    const nextReleaseId = useReleasesStore(state => state.nextReleaseId)

    return (
        <div className="release">
            <div className="release__name">
                {release.name}
            </div>

            <div className={ClassNames("release__badge", {current: currentReleaseId === release.id, next: nextReleaseId === release.id})}>
                {currentReleaseId === release.id && "Current"}
                {nextReleaseId === release.id && "Next"}
            </div>

            <div className="release__options">
                <Button variant="icon" onClick={onEditClick}>
                    <Icon icon="edit"/>
                </Button>
                <Button variant="icon" onClick={onDeleteClick}>
                    <Icon icon="trash"/>
                </Button>
            </div>

            <Progress maxValue={release.progress.tasks} value={release.progress.accepted_tasks} />
        </div>
    )
}