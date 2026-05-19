export type ReleaseType = {
    id: number,
    name: string
    order: number
    status: "NOT_QUEUED" | "QUEUED"
    progress: {
        tasks: number
        accepted_tasks: number
    }
}