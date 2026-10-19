import type { User } from "../context/auth/types.ts";
import type { TagType } from "./TagType.ts";

export type Priority = "low" | "medium" | "high" | "urgent";

export type TaskType = {
    id: string;
    name: string;
    release_id: string | null;
    workspace_id: string | null;
    status: TaskStatus;
    order: number;
    priority: string | null;
    code_name: string;
    user: User | null;
    actor_id?: string;
    tags: TagType[];
};

export type Column = {
    id: string;
    taskIds: string[];
};

export type TaskStatus = "backlog" | "todo" | "in_progress" | "review_pending" | "testing" | "adjustments" | "accepted";

export type ReleaseTasks = Record<TaskStatus, TaskType[]>;
