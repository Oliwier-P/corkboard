import { create } from "zustand";
import type { TaskType } from "@/types/ReleaseBoardTypes.ts";

interface TaskStore {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    task: TaskType | null;
    setTask: (value: TaskType | null) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
    isOpen: false,
    task: null,
    setIsOpen: (value) => {
        set({ isOpen: value });
    },
    setTask: (value) => {
        set({ task: value });
    },
}));
