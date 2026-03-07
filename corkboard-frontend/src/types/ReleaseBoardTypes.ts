export type Priority = "low" | "medium" | "high" | "urgent"

export type Task = {
    id: number
    name: string
    description: string
    release_id: number
    status: string,
    order: number
}

export type Column = {
    id: string
    taskIds: number[]
}

export type BoardState = {
    id: number
    tasks: Record<number, Task>
    columns: Column[]
}