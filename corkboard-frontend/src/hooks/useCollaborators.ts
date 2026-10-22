import { useCallback, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import type { User } from "@/context/auth/types.ts";

export type CollaboratorsResponse = {
    collaborators: User[];
    invited_users: User[];
};

export const workspaceKeys = {
    collaborators: (workspaceId?: string) => ["workspaces", workspaceId, "collaborators"] as const,
};

function useCollaboratorsQuery<T>(workspaceId: string | undefined, select: (data: CollaboratorsResponse) => T) {
    return useQuery({
        queryKey: workspaceKeys.collaborators(workspaceId),
        queryFn: async () => {
            const { data } = await api.get<CollaboratorsResponse>(`/workspaces/${workspaceId}/collaborators`);
            return data;
        },
        enabled: !!workspaceId,
        staleTime: 5 * 60 * 1000,
        select,
    });
}

export function useCollaborators(workspaceId?: string) {
    return useCollaboratorsQuery(workspaceId, (d) => d.collaborators);
}

export function useInvitedUsers(workspaceId?: string) {
    return useCollaboratorsQuery(workspaceId, (d) => d.invited_users);
}

export function useCollaboratorsData(workspaceId?: string) {
    return useCollaboratorsQuery(workspaceId, (d) => d);
}

export function useCollaboratorsCache(workspaceId?: string) {
    const queryClient = useQueryClient();
    const key = workspaceKeys.collaborators(workspaceId);

    const update = useCallback(
        (fn: (old: CollaboratorsResponse) => CollaboratorsResponse) => {
            queryClient.setQueryData<CollaboratorsResponse>(key, (old) => (old ? fn(old) : old));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [queryClient, workspaceId],
    );

    return useMemo(
        () => ({
            addCollaborator: (user: User) =>
                update((old) => ({
                    ...old,
                    collaborators: old.collaborators.some((u) => u.id === user.id) ? old.collaborators : [...old.collaborators, user],
                })),
            removeCollaborator: (userId: string) =>
                update((old) => ({
                    ...old,
                    collaborators: old.collaborators.filter((u) => u.id !== userId),
                })),
            updateCollaborator: (userId: string, changes: Partial<User>) =>
                update((old) => ({
                    ...old,
                    collaborators: old.collaborators.map((u) => (u.id === userId ? { ...u, ...changes } : u)),
                })),
            addInvitedUser: (user: User) =>
                update((old) => ({
                    ...old,
                    invited_users: old.invited_users.some((u) => u.id === user.id) ? old.invited_users : [...old.invited_users, user],
                })),
            removeInvitedUser: (userId: string) =>
                update((old) => ({
                    ...old,
                    invited_users: old.invited_users.filter((u) => u.id !== userId),
                })),
            setAll: (data: CollaboratorsResponse) => queryClient.setQueryData<CollaboratorsResponse>(key, data),
            refetch: () => queryClient.invalidateQueries({ queryKey: key }),
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [update, queryClient, workspaceId],
    );
}
