import { api } from "@/api";
import type { ReleaseType } from "@/types/ReleaseType.ts";
import type { ReleaseTasks } from "@/types/ReleaseBoardTypes.ts";

const releasesApi = {
    getAll: (workspaceId: string, onSuccess: (response: ReleaseType[]) => void, onError?: (error: unknown) => void) => {
        api.get(`/releases`, { params: { workspace_id: workspaceId } })
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    create: (data: Partial<ReleaseType> & { workspace_id: string }, onSuccess: (response: ReleaseType) => void, onError?: (error: unknown) => void) => {
        api.post(`/releases`, data)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    update: (releaseId: string, data: Partial<ReleaseType>, onSuccess: (response: ReleaseType) => void, onError?: (error: unknown) => void) => {
        api.put(`/releases/${releaseId}`, data)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    delete: (releaseId: string, onSuccess: () => void, onError?: (error: unknown) => void) => {
        api.delete(`/releases/${releaseId}`).then(onSuccess).catch(onError);
    },
    getBoard: (releaseId: string, onSuccess: (response: ReleaseTasks) => void, onError?: (error: unknown) => void) => {
        api.get(`/releases/${releaseId}/board`)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    move: (releaseId: string, data: any, onSuccess: (response: ReleaseType[]) => void, onError?: (error: unknown) => void) => {
        api.put(`/releases/${releaseId}/move`, data)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
};

export default releasesApi;
