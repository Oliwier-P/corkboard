import { api } from "@/api";
import type { DocumentType } from "@/types/DocumentType.ts";

export const documentsApi = {
    getAll: (workspaceId: string, onSuccess: (response: DocumentType[]) => void, onError?: (error: unknown) => void) => {
        api.get<DocumentType[]>("/documents", { params: { workspace_id: workspaceId } })
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    create: (workspaceId: string, onSuccess: (response: DocumentType) => void, onError?: (error: unknown) => void) => {
        api.post<DocumentType>(`/documents`, { workspace_id: workspaceId })
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    update: (documentId: string, data: Partial<DocumentType>, onSuccess: (response: DocumentType) => void, onError?: (error: unknown) => void) => {
        api.put<DocumentType>(`/documents/${documentId}`, data)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    delete: (documentId: string, onSuccess: () => void, onError?: (error: unknown) => void) => {
        api.delete(`/documents/${documentId}`).then(onSuccess).catch(onError);
    },
};
