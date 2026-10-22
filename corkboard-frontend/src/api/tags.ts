import { api } from "@/api";
import type { TagType } from "@/types/TagType.ts";

const tagsApi = {
    getAll: (
        data: { workspace_id: string } | { task_id: string },
        onSuccess: (response: { tags: TagType[]; task_tags: TagType[] }) => void,
        onError?: (error: unknown) => void,
    ) => {
        api.get(`/tags`, { params: data })
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    create: (data: Partial<TagType> & { workspace_id: string }, onSuccess: (response: TagType) => void, onError?: (error: unknown) => void) => {
        api.post(`/tags`, data)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    update: (tagId: string, data: Partial<TagType>, onSuccess: (response: TagType) => void, onError?: (error: unknown) => void) => {
        api.put(`/tags/${tagId}`, data)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    delete: (tagId: string, onSuccess: () => void, onError?: (error: unknown) => void) => {
        api.delete(`/tags/${tagId}`).then(onSuccess).catch(onError);
    },
    assign: (taskId: string, tagId: string, onSuccess: (response: TagType) => void, onError?: (error: unknown) => void) => {
        api.post(`/tasks/${taskId}/tags/${tagId}/assign`)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    unassign: (taskId: string, tagId: string, onSuccess: (response: TagType) => void, onError?: (error: unknown) => void) => {
        api.delete(`/tasks/${taskId}/tags/${tagId}/unassign`)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
};

export default tagsApi;
