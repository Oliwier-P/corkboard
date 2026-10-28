import { api } from "@/api";
import type { WorkspaceType } from "@/types/WorkspaceType.ts";
import type { ReleaseType } from "@/types/ReleaseType.ts";
import type { NotAcceptedTasksAction } from "@/pages/CurrentReleasePage/CompleteReleaseModal.tsx";

type DeleteResponse = {
    workspace?: WorkspaceType;
    message: string;
};

const workspacesApi = {
    getAll: (onSuccess: (response: WorkspaceType[]) => void, onError?: (error: unknown) => void) => {
        api.get(`/workspaces`)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    create: (data: Partial<WorkspaceType>, onSuccess: (response: WorkspaceType) => void, onError?: (error: unknown) => void) => {
        api.post(`/workspaces`, data)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    get: (workspaceId: string, onSuccess: (response: WorkspaceType) => void, onError?: (error: unknown) => void) => {
        api.get(`/workspaces/${workspaceId}`)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    update: (workspaceId: string, data: Partial<WorkspaceType>, onSuccess: (response: WorkspaceType) => void, onError?: (error: unknown) => void) => {
        api.put(`/workspaces/${workspaceId}`, data)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    delete: (workspaceId: string, onSuccess: (response: DeleteResponse) => void, onError?: (error: any) => void) => {
        api.delete(`/workspaces/${workspaceId}`)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    getCollaborators: (workspaceId: string, onSuccess: (response: any) => void, onError?: (error: unknown) => void) => {
        api.get(`/workspaces/${workspaceId}/collaborators`)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    inviteUser: (workspaceId: string, data: { username: string }, onSuccess: (response: any) => void, onError?: (error: unknown) => void) => {
        api.post(`/workspaces/${workspaceId}/invite_user`, data)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    getInvitation: (onSuccess: (response: any) => void, onError?: (error: unknown) => void) => {
        api.get(`/workspaces/invitation`)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    getBacklog: (workspaceId: string, onSuccess: (response: any) => void, onError?: (error: unknown) => void) => {
        api.get(`/workspaces/${workspaceId}/backlog`, { data: { workspace_id: workspaceId } })
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    acceptInvitation: (workspaceId: string, onSuccess: (response: any) => void, onError?: (error: unknown) => void) => {
        api.post(`/workspaces/${workspaceId}/accept_invitation`)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    declineInvitation: (workspaceId: string, data: { name: string }, onSuccess: (response: any) => void, onError?: (error: unknown) => void) => {
        api.delete(`/workspaces/${workspaceId}/decline_invitation`, { data })
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    cancelInvitation: (workspaceId: string, data: { invited_user_id: string }, onSuccess: (response: any) => void, onError?: (error: unknown) => void) => {
        api.delete(`/workspaces/${workspaceId}/cancel_invitation`, { data })
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    deleteUser: (workspaceId: string, data: { user_id: string; username: string }, onSuccess: (response: any) => void, onError?: (error: unknown) => void) => {
        api.delete(`/workspaces/${workspaceId}/delete_user`, { data })
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    leaveWorkspace: (workspaceId: string, onSuccess: (response: any) => void, onError?: (error: unknown) => void) => {
        api.delete(`/workspaces/${workspaceId}/leave_workspace`)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    getCurrentRelease: (workspaceId: string, onSuccess: (response: ReleaseType | null) => void, onError?: (error: unknown) => void) => {
        api.get(`/workspaces/${workspaceId}/current_release`)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    completeRelease: (
        workspaceId: string,
        data: { tasks_action: NotAcceptedTasksAction },
        onSuccess: (response: any) => void,
        onError?: (error: unknown) => void,
    ) => {
        api.post(`/workspaces/${workspaceId}/complete_release`, { data })
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
};

export default workspacesApi;
