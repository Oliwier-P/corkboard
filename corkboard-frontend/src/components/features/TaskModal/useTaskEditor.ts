import { useEffect, useState } from "react";
import { useReleaseBoardStore } from "@/store/releaseBoardStore.ts";
import tasksApi from "@/api/tasks.ts";

export const useTaskEditor = (taskId: string) => {
    const task = useReleaseBoardStore((state) => state.tasks[taskId]);
    const updateTask = useReleaseBoardStore((state) => state.updateTask);

    const [taskName, setTaskName] = useState<string>(task?.name ?? "");
    const [documentId, setDocumentId] = useState<string | null>(null);
    const [isDocumentReady, setIsDocumentReady] = useState(false);

    useEffect(() => {
        tasksApi.getDocument(taskId, (response) => {
            setDocumentId(response.id);
        });
    }, [taskId]);

    const handleUpdateTaskName = (value: string) => {
        const trimmedValue = value.trim();

        if (task.name !== trimmedValue) {
            tasksApi.update(taskId, { name: trimmedValue }, (response) => {
                updateTask(taskId, { name: response.task.name });
            });
        }
    };

    const handleNameBlur = (value: string) => {
        const trimmed = value.trim();
        if (!trimmed) {
            setTaskName(task.name);
            return;
        }
        handleUpdateTaskName(trimmed);
    };

    return {
        task,
        taskName,
        setTaskName,
        documentId,
        isDocumentReady,
        setIsDocumentReady,
        handleNameBlur,
    };
};
