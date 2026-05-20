import type {Column, TaskType} from "../types/ReleaseBoardTypes.ts";
import {create} from "zustand";
import {api} from "../api/api.ts";

const INITIAL_STATE = {
    id: 0,
    tasks: {},
    columns: [
        {id: "backlog", taskIds: []},
        {id: "adjustments", taskIds: []},
        {id: "todo", taskIds: []},
        {id: "in_progress", taskIds: []},
        {id: "review_pending", taskIds: []},
        {id: "testing", taskIds: []},
        {id: "accepted", taskIds: []},
    ],
};

interface ReleaseBoardStore {
    id: number;
    tasks: Record<number, TaskType>;
    columns: Column[];

    activeTask: TaskType | null;
    overColumnId: string | null;

    setActiveTask: (task: TaskType | null) => void;
    setOverColumnId: (id: string | null) => void;

    moveTaskBetweenColumns: (activeId: number, fromColumnId: string, toColumnId: string, insertAt?: number) => void;
    reorderTaskInColumn: (columnId: string, activeId: number, insertAt: number) => void;

    fetchBoard: (releaseId: number) => void;
    fetchBacklog: (workspaceId: number) => void;

    addTask: (columnId: string, name: string) => void;
    updateTask: (taskId: number, name: string) => void;
    updateTaskUser: (taskId: number, userId: number) => void;
    deleteTask: (taskId: number) => void;
    moveTaskToNextRelease: (taskId: number) => void;

    getColumn: (id: string) => Column | undefined;
    getColumnByTaskId: (taskId: number) => Column | undefined;
}

export const useReleaseBoardStore = create<ReleaseBoardStore>((set, get) => ({
    ...INITIAL_STATE,
    activeTask: null,
    overColumnId: null,
    setActiveTask: (task) => set({activeTask: task}),
    setOverColumnId: (id) => set({overColumnId: id}),

    fetchBoard: (releaseId: number) => {
        api.get(`/releases/${releaseId}/board`).then((res) => {
            set({
                id: releaseId,
                tasks: res.data.tasks,
                columns: res.data.columns,
            });
        });
    },

    fetchBacklog: (workspaceId: number) => {
        api.get(`/backlog/${workspaceId}`).then((res) => {
            set(state => {
                const taskIds = res.data.taskIds;
                return {
                    columns: [...state.columns, {
                        id: 'backlog',
                        taskIds: taskIds,
                    }],
                    tasks: {...state.tasks, ...res.data.tasks}
                }
            })

        })
    },

    moveTaskBetweenColumns: (activeId, fromColumnId, toColumnId, insertAt) => {
        set((state) => {
            const toColumn = state.columns.find((col) => col.id === toColumnId);
            if (toColumn?.taskIds.includes(activeId)) return state;

            return {
                columns: state.columns.map((col) => {
                    if (col.id === fromColumnId) {
                        return {...col, taskIds: col.taskIds.filter((id) => id !== activeId)};
                    }

                    if (col.id === toColumnId) {
                        const newIds = [...col.taskIds];
                        newIds.splice(typeof insertAt === "number" ? insertAt : newIds.length, 0, activeId);
                        return {...col, taskIds: newIds};
                    }
                    return col;
                }),
            };
        });

        api.put(`/tasks/${activeId}`, {task: {status: toColumnId, order: insertAt}});
    },

    reorderTaskInColumn: (columnId, activeId, insertAt) => {
        set((state) => ({
            columns: state.columns.map((col) => {
                if (col.id !== columnId) return col;
                const newIds = col.taskIds.filter((id) => id !== activeId);
                newIds.splice(insertAt, 0, activeId);
                return {...col, taskIds: newIds};
            }),
        }));

        api.put(`/tasks/${activeId}`, {task: {order: insertAt}});
    },
    addTask: (columnId, name) => {
        const temporaryId = Date.now() as number;
        const order = get().columns.find((col) => col.id === columnId)?.taskIds.length ?? 0;
        const newTask: TaskType = {
            id: temporaryId,
            name,
            order,
            description: "",
            release_id: columnId === "backlog" ? null : get().id,
            status: columnId,
            user: null
        };
        set((state) => {
            return {
                tasks: {
                    ...state.tasks,
                    [temporaryId]: newTask,
                },
                columns: state.columns.map((col) => (col.id === columnId ? {
                    ...col,
                    taskIds: [...col.taskIds, temporaryId]
                } : col)),
            };
        });
        api.post("/tasks", {task: newTask}).then((res) => {
            set((state) => {
                const tasks = {...state.tasks};
                const savedTask = res.data;
                delete tasks[temporaryId];
                return {
                    tasks: {...tasks, [savedTask.id]: savedTask},
                    columns: state.columns.map((col) =>
                        col.id === columnId
                            ? {
                                ...col,
                                taskIds: col.taskIds.map((taskId) => (taskId === temporaryId ? savedTask.id : taskId)),
                            }
                            : col,
                    ),
                };
            });
        });
    },
    updateTask: (taskId, name) => {
        set((state) => {
            return {
                tasks: {
                    ...state.tasks,
                    [taskId]: {...state.tasks[taskId], name},
                },
            };
        });
        api.put(`tasks/${taskId}`, {task: {name}});
    },
    updateTaskUser: (taskId, userId) => {
        api.patch(`tasks/${taskId}`, {task: {user_id: userId}}).then((response) => {
            const user = response.data.user ? {id: response.data.user.id, username: response.data.user.username} : null;

            set((state) => {
                return {
                    tasks: {
                        ...state.tasks,
                        [taskId]: {...state.tasks[taskId], user},
                    },
                };
            });
        });
    },
    deleteTask: (taskId: number) => {
        set((state) => {
            const tasks = {...state.tasks};
            delete tasks[taskId];
            return {
                tasks: tasks,
                columns: state.columns.map((col) => ({
                    ...col,
                    taskIds: col.taskIds.filter((id) => id !== taskId),
                })),
            };
        });

        api.delete(`tasks/${taskId}`);
    },
    moveTaskToNextRelease: (taskId: number) => {
        set((state) => {
            const tasks = {...state.tasks};
            delete tasks[taskId];
            return {
                tasks: tasks,
                columns: state.columns.map((col) => ({
                    ...col,
                    taskIds: col.taskIds.filter((id) => id !== taskId),
                })),
            };
        });

        api.put(`tasks/${taskId}/move_to_next_release`);
    },
    getColumn: (id) => {
        return get().columns.find((col) => col.id === id);
    },
    getColumnByTaskId: (taskId) => {
        return get().columns.find((col) => col.taskIds.includes(taskId));
    },
}));
