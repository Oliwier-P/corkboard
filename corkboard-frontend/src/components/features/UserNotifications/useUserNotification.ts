import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/useToast.ts";
import { api } from "@/api";
import { useWorkspaceStore } from "@/store/workspaceStore.ts";
import type { WorkspaceType } from "@/types/WorkspaceType.ts";

type InvitationType = {
    invited_by: string;
    workspace: {
        id: number;
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
        api.get("workspaces/invitation").then((res) => setInvitations(res.data));
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

    const acceptInvitation = (invitationId: number) => {
        api.post(`workspaces/${invitationId}/accept_invitation`).then((response) => {
            setInvitations((prev) => prev.filter((invitation) => invitation.workspace.id !== invitationId));
            toast.success(response.data.message);
            updateWorkspaces(response.data.workspace);
            setWorkspace(response.data.workspace);
        });
    };

    const declineInvitation = (invitationId: number, invitationName: string) => {
        api.delete(`workspaces/${invitationId}/decline_invitation`, { data: { name: invitationName } }).then((response) => {
            setInvitations((prev) => prev.filter((invitation) => invitation.workspace.id !== invitationId));
            toast.success(response.data.message);
        });
    };

    return { showNotifications, setShowNotifications, invitations, triggerRef, menuRef, acceptInvitation, declineInvitation };
};

export default useUserNotification;
