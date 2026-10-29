import { create } from "zustand";
import type { WorkspaceType } from "@/types/WorkspaceType.ts";
import type { ReleaseType } from "@/types/ReleaseType.ts";

const initialState = {
    workspace: null,
    currentRelease: null,
    nextRelease: null,
};

interface WorkspaceStore {
    workspace: WorkspaceType | null;
    currentRelease: ReleaseType | null;
    nextRelease: ReleaseType | null;
    setWorkspace: (workspace: WorkspaceType) => void;
    setCurrentRelease: (currentRelease: ReleaseType | null) => void;
    setNextRelease: (nextRelease: ReleaseType | null) => void;
    reset: () => void;
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
    ...initialState,
    workspace: null,
    currentRelease: null,
    nextRelease: null,
    setWorkspace: (workspace) => set({ workspace }),
    setCurrentRelease: (currentRelease) => set({ currentRelease }),
    setNextRelease: (nextRelease) => set({ nextRelease }),
    reset: () => set(initialState),
}));
