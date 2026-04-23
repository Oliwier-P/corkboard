import './WorkspaceUsers.scss';
import {WorkspaceUser} from './WorkspaceUser.tsx';
import {useEffect, useState} from 'react';
import {Button} from '../../../ui/Button/Button.tsx';
import {api} from "../../../../api/api.ts";
import {InviteUserModal} from "./InviteUserModal.tsx";
import {useParams} from "react-router-dom";

type User = {
    username: string;
    role: string;
};

export const WorkspaceUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [invitedUsers, setInvitedUsers] = useState<User[]>([]);
    const [showInviteModal, setShowInviteModal] = useState(false)
    const {workspaceId} = useParams()

    useEffect(() => {
        api.get(`workspaces/${localStorage.getItem("workspace_id")}/collaborators`).then(res => {
            setUsers(res.data.collaborators)
            setInvitedUsers(res.data.invited_users)
        })
    }, []);

    return (
        <div className="workspace-users">
            <span className="workspace-users__title">Manage people</span>

            <div className="workspace-users__list">
                <div className="workspace-users__list-header">
                    <div>Name</div>
                    <div>Role</div>
                    <div>Options</div>
                </div>

                <Button variant="icon" className="workspace-users__invite-btn" onClick={() => setShowInviteModal(true)}>
                    <div className="workspace-users__invite-icon">+</div>
                    <div className="workspace-users__invite-text">Invite User</div>
                </Button>

                {invitedUsers && invitedUsers.map((user, index) => (
                    <WorkspaceUser key={index} username={user.username} role={user.role} isInvited/>
                ))}
                {users && users.map((user, index) => <WorkspaceUser key={index} username={user.username}
                                                                    role={user.role}/>)}
            </div>
            {showInviteModal && workspaceId &&
                <InviteUserModal onClose={() => setShowInviteModal(false)} workspaceId={parseInt(workspaceId)}/>}
        </div>
    );
};
