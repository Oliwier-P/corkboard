import type { ReleaseType } from "../types/ReleaseType.ts";
import { create } from "zustand";
import { api } from "../api/api.ts";

interface ReleasesStore {
    releases: ReleaseType[];
    notQueuedReleases: ReleaseType[];
    currentReleaseId: string | null;
    nextReleaseId: string | null;

    fetchReleases: (workspace_id: string, callback: () => void) => void;
    addRelease: (name: string, workspaceId: string, status: string, callback?: (release: ReleaseType) => void) => void;
    updateRelease: (id: string, name: string, callback?: () => void) => void;
    deleteRelease: (id: string, callback?: () => void) => void;

    moveReleaseBetweenColumns: (activeId: string, fromColumnId: string, toColumnId: string, insertAt?: number) => void;

    reorderReleaseInColumn: (columnId: string, activeId: string, insertAt: number) => void;
}

export const useReleasesStore = create<ReleasesStore>((set) => ({
    releases: [],
    notQueuedReleases: [],
    currentReleaseId: null,
    nextReleaseId: null,

    fetchReleases: (workspace_id, callback) => {
        api.get(`/workspaces/${workspace_id}/releases`).then((res) => {
            set({
                releases: res.data.releases.filter((release: ReleaseType) => release.status === "QUEUED"),
                notQueuedReleases: res.data.releases.filter((release: ReleaseType) => release.status === "NOT_QUEUED"),
                currentReleaseId: res.data.current_release_id,
                nextReleaseId: res.data.next_release_id,
            });
            callback();
        });
    },
    addRelease: (name, workspaceId, status, callback) => {
        api.post("/releases", { name, workspace_id: workspaceId, status }).then((res) => {
            set((state) => ({
                notQueuedReleases: [...state.notQueuedReleases, res.data],
            }));
            if (callback) {
                callback(res.data);
            }
        });
    },
    updateRelease: (id, name, callback) => {
        set((state) => ({
            releases: state.releases.map((r) => (r.id === id ? { ...r, name } : r)),
        }));
        api.put(`/releases/${id}`, { name }).then(() => callback && callback());
    },
    deleteRelease: (id, callback) => {
        set((state) => ({
            releases: state.releases.filter((r) => r.id !== id),
            notQueuedReleases: state.notQueuedReleases.filter((r) => r.id !== id),
        }));
        api.delete(`/releases/${id}`).then(() => callback && callback());
    },
    moveReleaseBetweenColumns: (activeId, fromColumnId, toColumnId, insertAt) => {
        set((state) => {
            const releases = toColumnId === "QUEUED" ? state.releases.map((release) => release.id) : state.notQueuedReleases.map((release) => release.id);

            const activeRelease =
                fromColumnId === "QUEUED" ? state.releases.find((r) => r.id === activeId) : state.notQueuedReleases.find((r) => r.id === activeId);

            if (!activeRelease) return state;

            if (toColumnId === "QUEUED") {
                const newReleases = [...state.releases];
                newReleases.splice(typeof insertAt === "number" ? insertAt : releases.length, 0, activeRelease);

                return {
                    releases: newReleases,
                    notQueuedReleases: state.notQueuedReleases.filter((r) => r.id !== activeId),
                };
            } else {
                const newNotQueuedReleases = [...state.notQueuedReleases];
                newNotQueuedReleases.splice(typeof insertAt === "number" ? insertAt : releases.length, 0, activeRelease);
                return {
                    notQueuedReleases: newNotQueuedReleases,
                    releases: state.releases.filter((r) => r.id !== activeId),
                };
            }
        });
        api.put(`/releases/${activeId}`, { order: insertAt, status: toColumnId });
    },

    reorderReleaseInColumn: (columnId, activeId, insertAt) => {
        set((state) => {
            const activeRelease =
                columnId === "QUEUED" ? state.releases.find((r) => r.id === activeId) : state.notQueuedReleases.find((r) => r.id === activeId);

            if (!activeRelease) return state;

            if (columnId === "QUEUED") {
                const newReleases = [...state.releases].filter((release: ReleaseType) => release.id !== activeId);
                newReleases.splice(insertAt, 0, { ...activeRelease });
                return {
                    releases: newReleases,
                };
            } else {
                const newNotQueuedReleases = [...state.notQueuedReleases].filter((release: ReleaseType) => release.id !== activeId);
                newNotQueuedReleases.splice(insertAt, 0, activeRelease);
                return {
                    notQueuedReleases: newNotQueuedReleases,
                };
            }
        });
        api.put(`/releases/${activeId}`, { order: insertAt, status: columnId });
    },
}));
