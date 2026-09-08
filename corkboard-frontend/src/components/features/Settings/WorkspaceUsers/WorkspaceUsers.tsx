import "./WorkspaceUsers.scss";
import { WorkspaceUser } from "./WorkspaceUser.tsx";
import { useEffect, useState } from "react";
import { Button } from "@/ui/Button/Button.tsx";
import { api } from "@/api";
import { useParams } from "react-router-dom";
import { Table } from "@/ui/Table/Table.tsx";
import { UserDisplay } from "@/ui/UserDisplay/UserDisplay.tsx";
import Loading from "@/ui/Loading/Loading.tsx";
import type { User } from "@/context/auth/types.ts";
import { useWorkspaceStore } from "@/store/workspaceStore.ts";
import { useAuth } from "@/context/auth/useAuth.ts";
import { useToast } from "@/hooks/useToast.ts";
import CreateModal from "@/ui/Modals/CreateModal.tsx";
import ConfirmationModal from "@/ui/Modals/ConfirmationModal.tsx";

const WorkspaceUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [invitedUsers, setInvitedUsers] = useState<User[]>([]);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const { workspaceId } = useParams();
    const { user } = useAuth();
    const workspace = useWorkspaceStore((state) => state.workspace);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const toast = useToast();

    const handleDeleteWorkspaceUser = () => {
        if (!userToDelete) return;

        api.delete(`/workspaces/${workspaceId}/delete_user`, { data: { user_id: userToDelete.id, username: userToDelete.username } }).then((response) => {
            toast.success(response.data.message);
            setUserToDelete(null);
            setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
        });
    };

    const handleInviteUser = (data: { name: string }) => {
        api.post(`workspaces/${workspaceId}/invite_user`, { username: data.name.toLowerCase() }).then((response) => {
            if (response.data.status === "success") {
                toast.success(response.data.message);
                invitedUsers.push(response.data.user);
                setShowInviteModal(false);
            } else {
                toast.warning(response.data.message);
                setShowInviteModal(false);
            }
        });
    };

    useEffect(() => {
        api.get(`workspaces/${workspaceId}/collaborators`).then((response) => {
            setUsers(response.data.collaborators);
            setInvitedUsers(response.data.invited_users);
            setLoading(false);
        });
    }, [workspaceId]);

    if (loading) return <Loading overlay={true} />;

    return (
        <div className="workspace-users">
            <span className="workspace-users__title">Manage people</span>

            <div className="workspace-users__list">
                {invitedUsers &&
                    invitedUsers.map((user, index) => (
                        <WorkspaceUser key={index} user={user} onCancel={() => setInvitedUsers((prev) => prev.filter((u) => u.id !== user.id))} isInvited />
                    ))}

                <Table
                    data={users}
                    columns={[
                        {
                            key: "username",
                            header: "Username",
                            render: (_, row) => <UserDisplay user={row} />,
                        },
                        {
                            key: "id",
                            header: "Options",
                            render: (_, row) => (
                                <>
                                    {workspace?.owner.id === user?.id && user?.id !== row.id && (
                                        <>
                                            <Button icon="edit" variant="icon" size="small" color="outlined" />
                                            <Button icon="trash" variant="icon" size="small" color="outlined" onClick={() => setUserToDelete(row)} />
                                        </>
                                    )}
                                </>
                            ),
                        },
                    ]}
                >
                    <Button variant="icon" className="workspace-users__invite-btn" onClick={() => setShowInviteModal(true)}>
                        <div className="workspace-users__invite-icon">+</div>
                        <div className="workspace-users__invite-text">Invite User</div>
                    </Button>
                </Table>
            </div>
            {showInviteModal && workspaceId && (
                <CreateModal
                    title="Invite user"
                    inputLabel="Username"
                    buttonLabel="Invite"
                    onSave={handleInviteUser}
                    onClose={() => setShowInviteModal(false)}
                />
            )}
            {userToDelete && (
                <ConfirmationModal
                    title="Delete workspace user:"
                    subtitle={`${userToDelete.username}`}
                    message={`Are you sure you want to delete ${userToDelete.username} from this workspace?`}
                    onDelete={handleDeleteWorkspaceUser}
                    onClose={() => setUserToDelete(null)}
                />
            )}
        </div>
    );
};

export default WorkspaceUsers;
