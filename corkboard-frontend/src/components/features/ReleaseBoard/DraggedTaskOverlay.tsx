import {Task} from "../Task/Task.tsx";
import {useReleaseBoardStore} from "../../../store/releaseBoardStore.ts";
import {useEffect, useState} from "react";
import {monitorForElements} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import "./DraggedTaskOver.scss"

export const DraggedTaskOverlay = () => {
    const [position, setPosition] = useState<{ x: number, y: number } | null>(null)
    const activeTask = useReleaseBoardStore(state => state.activeTask)

    useEffect(() => {
        return monitorForElements({
            onDrag: ({location}) => {
                setPosition({
                    x: location.current.input.clientX,
                    y: location.current.input.clientY,
                })
            },
            onDrop: () => setPosition(null)
        })
    }, []);

    if (!activeTask || !position) return null

    return (
        <div className="dragged-task-over" style={{
            left: position.x,
            top: position.y
        }}>
            <Task taskId={activeTask.id}/>
        </div>
    )
}