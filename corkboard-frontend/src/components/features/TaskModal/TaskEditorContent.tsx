import classNames from "classnames";
import "./TaskEditorContent.scss";
import { useAuth } from "../../../context/auth/useAuth.ts";
import { useTaskEditor } from "./useTaskEditor.ts";
import { UserSelect } from "../../ui/UserSelect/UserSelect.tsx";
import { CollaborativeEditor } from "../CollaborativeEditor/CollaborativeEditor.tsx";
import Loading from "../../ui/Loading/Loading.tsx";
import TaskStatusSelect from "../../ui/TaskStatusSelect/TaskStatusSelect.tsx";
import TaskPrioritySelect from "../../ui/TaskPrioritySelect/TaskPrioritySelect.tsx";

interface TaskEditorContentProps {
    taskId: number;
    className?: string;
}

export const TaskEditorContent = ({ taskId, className }: TaskEditorContentProps) => {
    const { user, token } = useAuth();
    const { task, taskName, setTaskName, documentId, isDocumentReady, setIsDocumentReady, handleNameBlur } = useTaskEditor(taskId);

    if (!task) return null;

    if (!(user && token && documentId)) {
        return <Loading />;
    }

    return (
        <>
            {!isDocumentReady && <Loading />}

            <div className={classNames("task-editor", className, { hidden: !isDocumentReady })}>
                <textarea
                    className="name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    onBlur={(e) => handleNameBlur(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleNameBlur(taskName);
                            e.currentTarget.blur();
                        }
                    }}
                />

                <div className="properties">
                    <div className="owner">
                        <UserSelect taskId={taskId} taskUser={task.user} />
                        <span>{task.user ? task.user.username : "Assign"}</span>
                    </div>

                    <TaskStatusSelect taskId={taskId} taskStatus={task.status} />
                    <TaskPrioritySelect taskId={taskId} taskPriority={task.priority} />
                </div>

                <CollaborativeEditor documentId={documentId} user={user} authToken={token} onReadyChange={setIsDocumentReady} />
            </div>
        </>
    );
};
