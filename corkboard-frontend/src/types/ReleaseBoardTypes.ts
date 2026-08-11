import type { User } from "../context/auth/types.ts";

export type Priority = "low" | "medium" | "high" | "urgent";

export type TaskType = {
    id: string;
    name: string;
    description: string;
    release_id: string | null;
    workspace_id: string | null;
    status: string;
    order: number;
    priority: string | null;
    user: User | null;
    actor_id?: string;
};

export type Column = {
    id: string;
    taskIds: string[];
};
