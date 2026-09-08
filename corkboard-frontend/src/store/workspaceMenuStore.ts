import { create } from "zustand";

interface WorkspaceMenuStore {
    isOpen: boolean;
    setOpen: (value: boolean) => void;
}

export const useWorkspaceMenuStore = create<WorkspaceMenuStore>((set) => ({
    isOpen: false,
    setOpen: (value) => set({ isOpen: value }),
}));
