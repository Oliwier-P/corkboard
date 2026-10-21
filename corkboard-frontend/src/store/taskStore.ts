import { create } from "zustand";

interface TaskStore {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    taskId: string | null;
    setTaskId: (value: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
    isOpen: false,
    taskId: null,
    setIsOpen: (value) => {
        set({ isOpen: value });
    },
    setTaskId: (value) => {
        set({ taskId: value });
    },
}));
