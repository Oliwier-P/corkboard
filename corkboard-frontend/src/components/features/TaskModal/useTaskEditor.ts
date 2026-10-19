import { useEffect, useState } from "react";
import { useReleaseBoardStore } from "@/store/releaseBoardStore.ts";
import { api } from "@/api";
import tasksApi from "@/api/tasks.ts";

export const useTaskEditor = (taskId: string) => {
    const task = useReleaseBoardStore((state) => state.tasks[taskId]);

    const [taskName, setTaskName] = useState<string>(task?.name ?? "");
    const [documentId, setDocumentId] = useState<string | null>(null);
    const [isDocumentReady, setIsDocumentReady] = useState(false);

    useEffect(() => {
        api.get(`/tasks/${taskId}/document`).then((response) => {
            setDocumentId(response.data.id);
        });
    }, [taskId]);

    const handleUpdateTaskName = (value: string) => {
        if (task.name !== value) {
            tasksApi.update(taskId, { name: value }, (response) => {});
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
