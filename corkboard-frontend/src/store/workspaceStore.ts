import { create } from "zustand";
import type { WorkspaceType } from "@/types/WorkspaceType.ts";

interface WorkspaceStore {
    workspace: WorkspaceType | null;
    setWorkspace: (workspace: WorkspaceType) => void;
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
    workspace: null,
    setWorkspace: (workspace) => set({ workspace }),
}));
