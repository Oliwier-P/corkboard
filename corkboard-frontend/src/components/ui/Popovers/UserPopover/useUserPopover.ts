import { useEffect, useState } from "react";
import type { User } from "@/context/auth/types.ts";
import { useWorkspaceStore } from "@/store/workspaceStore.ts";
import tasksApi from "@/api/tasks.ts";

interface useUserPopoverProps {
    taskId: string;
    taskUser: User | null;
}

const useUserPopover = ({ taskId, taskUser }: useUserPopoverProps) => {
    const [users, setUsers] = useState<User[]>([]);
    const workspace = useWorkspaceStore((state) => state.workspace);

    const handleAssignUserToTask = (userId: string) => {
        const assignId = userId === taskUser?.id ? "" : userId;

        tasksApi.update(taskId, { user_id: assignId }, (response) => {});
    };

    // useEffect(() => {
    //     if (!workspace?.id) return;
    //
    //     api.get(`/workspaces/${workspace?.id}/collaborators`).then((response) => {
    //         setUsers(response.data.collaborators);
    //     });
    // }, [workspace?.id]);

    return { users, handleAssignUserToTask };
};

export default useUserPopover;
