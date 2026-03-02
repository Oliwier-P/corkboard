import {BoardColumn} from "./BoardColumn.tsx";
import "./ReleaseBoard.scss"
import type {releaseType} from "../../../types/ReleaseType.ts";
import {api} from "../../../api/api.ts";
import {useEffect, useState} from "react";
import type {TaskType} from "../../../types/TaskType.ts";

type ReleaseBoardProps = {
    release: releaseType
}
export const ReleaseBoard = ({release}: ReleaseBoardProps) => {
    const [tasks, setTasks] = useState<TaskType[]>([])

    const handleAddTask = (name: string, status: string) => {
        const task = {
            name,
            release_id: release.id,
            status
        }
        api.post("/tasks", task)
    }

    useEffect(() => {
        api.get("/tasks", {params: {release_id: release.id}}).then((res) => {
            setTasks(res.data)
        })
    }, [release.id])

    return (
        <div className="release-board">
            <BoardColumn type="adjustments" onTaskAdd={handleAddTask} tasks={tasks}/>
            <BoardColumn type="todo" onTaskAdd={handleAddTask} tasks={tasks}/>
            <BoardColumn type="in_progress" onTaskAdd={handleAddTask} tasks={tasks}/>
            <div className="release-board__column-group">
                <BoardColumn type="review_pending" onTaskAdd={handleAddTask} tasks={tasks}/>
                <BoardColumn type="testing" onTaskAdd={handleAddTask} tasks={tasks}/>
            </div>
            <BoardColumn type="accepted" onTaskAdd={handleAddTask} tasks={tasks}/>
        </div>
    )
}