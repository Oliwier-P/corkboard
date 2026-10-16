import { api } from "@/api";
import type { ReleaseType } from "@/types/ReleaseType.ts";

const releasesApi = {
    getAll: (workspaceId: string, onSuccess: (response: ReleaseType[]) => void, onError?: (error: unknown) => void) => {
        api.get<ReleaseType[]>(`/releases`, { params: { workspace_id: workspaceId } })
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    create: (data: Partial<ReleaseType> & { workspace_id: string }, onSuccess: (response: ReleaseType) => void, onError?: (error: unknown) => void) => {
        api.post<ReleaseType>(`/releases`, data)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    update: (releaseId: string, data: Partial<ReleaseType>, onSuccess: (response: ReleaseType) => void, onError?: (error: unknown) => void) => {
        api.put<ReleaseType>(`/releases/${releaseId}`, data)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    delete: (releaseId: string, onSuccess: () => void, onError?: (error: unknown) => void) => {
        api.delete(`/releases/${releaseId}`).then(onSuccess).catch(onError);
    },
    move: (releaseId: string, data: any, onSuccess: (response: ReleaseType[]) => void, onError?: (error: unknown) => void) => {
        api.put<ReleaseType[]>(`/releases/${releaseId}/move`, data)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
};

export default releasesApi;
