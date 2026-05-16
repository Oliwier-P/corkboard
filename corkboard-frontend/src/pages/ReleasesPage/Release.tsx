import "./Release.scss"
import {Button} from "../../components/ui/Button/Button.tsx";
import {useReleasesStore} from "../../store/releasesStore.ts";
import {ClassNames} from "../../global/utils.ts";
import {Progress} from "../../components/ui/ProgressBar/Progress.tsx";
import type {ReleaseType} from "../../types/ReleaseType.ts";
import {useEffect, useRef, useState} from "react";
import {draggable} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

type ReleasesListItemProps = {
    release: ReleaseType
    onDeleteClick: () => void
    onEditClick: () => void
}

export const Release = ({release, onDeleteClick, onEditClick}: ReleasesListItemProps) => {
    const [isDragging, setIsDragging] = useState(false)

    const currentReleaseId = useReleasesStore(state => state.currentReleaseId)
    const nextReleaseId = useReleasesStore(state => state.nextReleaseId)

    const ref = useRef<HTMLDivElement>(null);

    const releaseId = release.id

    useEffect(() => {
        if (!ref.current) return

        return draggable({
            element: ref.current,
            getInitialData: () => ({type: "release", releaseId}),
            onDragStart: () => setIsDragging(true),
            onDrop: () => setIsDragging(false)
        })
    }, [releaseId])

    return (
        <div className={ClassNames("release", {ghost: isDragging})} ref={ref}>
            <div className="release__name">
                <div className="release__number">1</div>
                {release.name}
                <div className={ClassNames("release__badge", {
                    current: currentReleaseId === release.id,
                    next: nextReleaseId === release.id
                })}>
                    {currentReleaseId === release.id && "Current"}
                    {nextReleaseId === release.id && "Next"}
                </div>
            </div>



            <div className="release__options">
                <Button variant="icon" icon="edit" size="small" onClick={onEditClick}/>
                <Button variant="icon" icon="trash" size="small" onClick={onDeleteClick}/>
            </div>

            <Progress className="release__progress" maxValue={release.progress?.tasks} value={release.progress?.accepted_tasks}/>
        </div>
    )
}