export type ReleaseType = {
    id: string;
    name: string;
    order: number;
    status: "NOT_QUEUED" | "QUEUED";
    progress: {
        tasks: number;
        accepted_tasks: number;
    };
};
