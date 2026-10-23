import type { User } from "@/context/auth/types.ts";
import { useWorkspaceStore } from "@/store/workspaceStore.ts";
import { useReleaseBoardStore } from "@/store/releaseBoardStore.ts";
import { useCollaborators } from "@/hooks/useCollaborators.ts";

interface useUserPopoverProps {
    taskId: string;
    taskUser: User | null;
}

const useUserPopover = ({ taskId, taskUser }: useUserPopoverProps) => {
    const workspace = useWorkspaceStore((state) => state.workspace);
    const updateTaskUser = useReleaseBoardStore((state) => state.updateTaskUser);
    const { data: users = [] } = useCollaborators(workspace?.id);

    const handleAssignUserToTask = (userId: string) => {
        if (userId === taskUser?.id) {
            updateTaskUser(taskId, "");
        } else {
            updateTaskUser(taskId, userId);
        }
    };

    return { users, handleAssignUserToTask };
};

export default useUserPopover;
