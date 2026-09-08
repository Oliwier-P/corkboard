import type { Column } from "@/types/ReleaseBoardTypes.ts";

export const insertTaskIntoColumn = (columns: Column[], taskId: string, columnId: string, order?: number) => {
    return columns.map((col) => {
        const withoutTask = col.taskIds.filter((id) => id !== taskId);

        if (col.id !== columnId) {
            return { ...col, taskIds: withoutTask };
        }

        const nextIds = [...withoutTask];
        const insertAt = typeof order === "number" ? Math.max(0, Math.min(order, nextIds.length)) : nextIds.length;

        nextIds.splice(insertAt, 0, taskId);

        return {
            ...col,
            taskIds: nextIds,
        };
    });
};
