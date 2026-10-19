import { create } from "zustand";
import type { WorkspaceType } from "@/types/WorkspaceType.ts";
import type { ReleaseType } from "@/types/ReleaseType.ts";

interface WorkspaceStore {
    workspace: WorkspaceType | null;
    currentRelease: ReleaseType | null;
    setWorkspace: (workspace: WorkspaceType) => void;
    setCurrentRelease: (currentRelease: ReleaseType) => void;
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
    workspace: null,
    currentRelease: null,
    setWorkspace: (workspace) => set({ workspace }),
    setCurrentRelease: (currentRelease) => set({ currentRelease }),
}));
