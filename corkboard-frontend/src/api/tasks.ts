import { api } from "@/api";
import type { TaskType } from "@/types/ReleaseBoardTypes.ts";

const tasksApi = {
    getAll: (onSuccess: (response: TaskType[]) => void, onError?: (error: unknown) => void) => {
        api.get<TaskType[]>(`/tasks`)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    create: (data: Partial<TaskType>, onSuccess: (response: TaskType) => void, onError?: (error: unknown) => void) => {
        api.post<TaskType>(`/tasks`, data)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    update: (taskId: string, data: Partial<TaskType & { user_id: string }>, onSuccess: (response: TaskType) => void, onError?: (error: unknown) => void) => {
        api.put(`/tasks/${taskId}`, data)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    delete: (taskId: string, onSuccess: (response: TaskType) => void, onError?: (error: unknown) => void) => {
        api.delete(`/tasks/${taskId}`)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    moveToNextRelease: (taskId: string, onSuccess: () => void, onError?: (error: unknown) => void) => {
        api.put(`/tasks/${taskId}/move_to_next_release`).then(onSuccess).catch(onError);
    },
};

export default tasksApi;
