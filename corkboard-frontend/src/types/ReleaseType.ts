export type ReleaseType = {
    id: number,
    name: string
    order: number
    progress: {
        tasks: number
        accepted_tasks: number
    }
}