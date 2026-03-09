export type ReleaseType = {
    id: number,
    name: string
    progress: {
        tasks: number
        accepted_tasks: number
    }
}