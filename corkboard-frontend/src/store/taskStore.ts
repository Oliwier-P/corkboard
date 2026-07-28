import { create } from "zustand";

interface TaskStore {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    taskId: number | null;
    setTaskId: (value: number) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
    isOpen: false,
    taskId: null,
    setIsOpen: (value: boolean) => {
        set({ isOpen: value });
    },
    setTaskId: (value: number) => {
        set({ taskId: value });
    },
}));
