import type { TaskType } from "@/types/ReleaseBoardTypes.ts";
import { useEffect } from "react";
import { cable } from "@/lib/cable.ts";
import { useReleaseBoardStore } from "@/store/releaseBoardStore.ts";

type ReleaseEvent =
    | {
          type: "task_created";
          actor_id: string;
          task: TaskType;
      }
    | {
          type: "task_updated";
          actor_id: string;
          task: TaskType;
      }
    | {
          type: "task_destroyed";
          actor_id: string;
          task: TaskType;
      };

export const useReleaseSubscription = (releaseId: string | null, userId: string | null) => {
    const applyTaskCreated = useReleaseBoardStore((state) => state.applyTaskCreated);
    const applyTaskDestroyed = useReleaseBoardStore((state) => state.applyTaskDestroyed);
    const applyTaskUpdated = useReleaseBoardStore((state) => state.applyTaskUpdated);

    useEffect(() => {
        if (!releaseId) return;

        const subscription = cable.subscriptions.create(
            {
                channel: "ReleaseChannel",
                release_id: releaseId,
            },
            {
                connected() {
                    console.log("Connected to Release", releaseId);
                },
                disconnected: () => {
                    console.log("Disconnected from Release", releaseId);
                },
                received: (event: ReleaseEvent) => {
                    if (event.actor_id !== userId) {
                        switch (event.type) {
                            case "task_created":
                                applyTaskCreated(event.task);
                                break;
                            case "task_destroyed":
                                applyTaskDestroyed(event.task.id);
                                break;
                            case "task_updated":
                                applyTaskUpdated(event.task);
                                break;
                            default:
                                console.error(event);
                        }
                    }
                },
            },
        );

        return () => {
            subscription.unsubscribe();
        };
    }, [applyTaskCreated, applyTaskDestroyed, applyTaskUpdated, releaseId, userId]);
};
