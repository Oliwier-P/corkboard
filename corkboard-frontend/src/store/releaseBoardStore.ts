import type { Column, TaskType } from "@/types/ReleaseBoardTypes.ts";
import { create } from "zustand";
import { api } from "@/api";

const INITIAL_STATE = {
    id: "",
    tasks: {},
    columns: [
        { id: "backlog", taskIds: [] },
        { id: "adjustments", taskIds: [] },
        { id: "todo", taskIds: [] },
        { id: "in_progress", taskIds: [] },
        { id: "review_pending", taskIds: [] },
        { id: "testing", taskIds: [] },
        { id: "accepted", taskIds: [] },
    ],
};

interface ReleaseBoardStore {
    id: string;
    tasks: Record<string, TaskType>;
    columns: Column[];

    activeTask: TaskType | null;
    overColumnId: string | null;

    setActiveTask: (task: TaskType | null) => void;
    setOverColumnId: (id: string | null) => void;

    moveTaskBetweenColumns: (activeId: string, fromColumnId: string, toColumnId: string, insertAt?: number) => void;
    reorderTaskInColumn: (columnId: string, activeId: string, insertAt: number) => void;
}

export const useReleaseBoardStore = create<ReleaseBoardStore>((set, get) => ({
    ...INITIAL_STATE,
    activeTask: null,
    overColumnId: null,
    setActiveTask: (task) => set({ activeTask: task }),
    setOverColumnId: (id) => set({ overColumnId: id }),
    moveTaskBetweenColumns: (activeId, fromColumnId, toColumnId, insertAt) => {
        set((state) => {
            const toColumn = state.columns.find((col) => col.id === toColumnId);
            if (toColumn?.taskIds.includes(activeId)) return state;

            return {
                columns: state.columns.map((col) => {
                    if (col.id === fromColumnId) {
                        return { ...col, taskIds: col.taskIds.filter((id) => id !== activeId) };
                    }

                    if (col.id === toColumnId) {
                        const newIds = [...col.taskIds];
                        newIds.splice(typeof insertAt === "number" ? insertAt : newIds.length, 0, activeId);
                        return { ...col, taskIds: newIds };
                    }
                    return col;
                }),
            };
        });

        api.put(`/tasks/${activeId}`, { status: toColumnId, order: insertAt, release_id: get().id }).then(() => {});
    },
    reorderTaskInColumn: (columnId, activeId, insertAt) => {
        set((state) => ({
            columns: state.columns.map((col) => {
                if (col.id !== columnId) return col;
                const newIds = col.taskIds.filter((id) => id !== activeId);
                newIds.splice(insertAt, 0, activeId);
                return { ...col, taskIds: newIds };
            }),
        }));

        api.put(`/tasks/${activeId}`, { order: insertAt });
    },
}));
