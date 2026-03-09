import "./Release.scss"
import {Icon} from "../../components/ui/Icons/Icon.tsx";
import {Button} from "../../components/ui/Button/Button.tsx";
import {useReleasesStore} from "../../store/releasesStore.ts";
import {ClassNames} from "../../global/utils.ts";

type ReleasesListItemProps = {
    id: number;
    name: string;
    onDeleteClick: () => void
    onEditClick: () => void
}

export const Release = ({id, name, onDeleteClick, onEditClick}: ReleasesListItemProps) => {
    const currentReleaseId = useReleasesStore(state => state.currentReleaseId)
    const nextReleaseId = useReleasesStore(state => state.nextReleaseId)

    return (
        <div className="release">
            <div className="release__name">
                {name}
                <div className={ClassNames("release__badge", {current: currentReleaseId === id, next: nextReleaseId === id})}>
                    {currentReleaseId === id && "Current"}
                    {nextReleaseId === id && "Next"}
                </div>
                <div className="release__menu">
                    <Button variant="icon" onClick={onEditClick}>
                        <Icon icon="edit"/>
                    </Button>
                    <Button variant="icon" onClick={onDeleteClick}>
                        <Icon icon="trash"/>
                    </Button>
                </div>
            </div>

            <div className="release__progress">
                <div className="bar"></div>
                <span>0/0</span>
            </div>
        </div>
    )
}