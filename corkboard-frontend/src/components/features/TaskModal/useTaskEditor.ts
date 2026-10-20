import { useEffect, useState } from "react";
import { api } from "@/api";
import tasksApi from "@/api/tasks.ts";
import type { TaskType } from "@/types/ReleaseBoardTypes.ts";

export const useTaskEditor = (task: TaskType) => {
    const [taskName, setTaskName] = useState<string>(task?.name ?? "");
    const [documentId, setDocumentId] = useState<string | null>(null);
    const [isDocumentReady, setIsDocumentReady] = useState(false);

    useEffect(() => {
        api.get(`/tasks/${task.id}/document`).then((response) => {
            setDocumentId(response.data.id);
        });
    }, [task.id]);

    const handleUpdateTaskName = (value: string) => {
        if (task.name !== value) {
            tasksApi.update(task.id, { name: value }, (response) => {});
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
