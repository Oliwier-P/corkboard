export type ReleaseType = {
    id: string;
    name: string;
    position: number;
    current: boolean;
    next?: boolean;
    status: "NOT_QUEUED" | "QUEUED";
    progress: {
        tasks: number;
        accepted_tasks: number;
    };
};
