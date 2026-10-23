import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/useToast.ts";
import { useWorkspaceStore } from "@/store/workspaceStore.ts";
import type { WorkspaceType } from "@/types/WorkspaceType.ts";
import workspacesApi from "@/api/workspaces.ts";

type InvitationType = {
    invited_by: string;
    workspace: {
        id: string;
        name: string;
    };
};

interface UseUserNotificationProps {
    updateWorkspaces: (workspace: WorkspaceType) => void;
}

const useUserNotification = ({ updateWorkspaces }: UseUserNotificationProps) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [invitations, setInvitations] = useState<InvitationType[]>([]);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const toast = useToast();
    const setWorkspace = useWorkspaceStore((state) => state.setWorkspace);

    useEffect(() => {
        workspacesApi.getInvitation((response) => {
            setInvitations(response);
        });
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (triggerRef.current && !triggerRef.current.contains(target) && menuRef.current && !menuRef.current.contains(target)) {
                setShowNotifications(false);
            }
        };

        if (showNotifications) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showNotifications, setShowNotifications]);

    const acceptInvitation = (workspaceId: string) => {
        workspacesApi.acceptInvitation(workspaceId, (response) => {
            setInvitations((prev) => prev.filter((i) => i.workspace.id !== workspaceId));
            toast.success(response.message);
            updateWorkspaces(response.workspace);
            setWorkspace(response.workspace);
        });
    };

    const declineInvitation = (workspaceId: string, invitationName: string) => {
        workspacesApi.declineInvitation(workspaceId, { name: invitationName }, (response) => {
            setInvitations((prev) => prev.filter((i) => i.workspace.id !== workspaceId));
            toast.success(response.data.message);
        });
    };

    return { showNotifications, setShowNotifications, invitations, triggerRef, menuRef, acceptInvitation, declineInvitation };
};

export default useUserNotification;
