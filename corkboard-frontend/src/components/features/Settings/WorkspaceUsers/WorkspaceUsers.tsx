import './WorkspaceUsers.scss';
import {WorkspaceUser} from './WorkspaceUser.tsx';
import {useEffect, useState} from 'react';
import {Button} from '../../../ui/Button/Button.tsx';
import {api} from "../../../../api/api.ts";
import {InviteUserModal} from "./InviteUserModal.tsx";

type User = {
    name: string;
    role: string;
};

export const WorkspaceUsers = () => {
    const [users] = useState<User[]>([]);
    const [showInviteModal, setShowInviteModal] = useState(false)

    useEffect(() => {
        api.get(`workspaces/${localStorage.getItem("workspace_id")}/collaborators`).then(res => {
            console.log(res.data)
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

                {users && users.map((user, index) => <WorkspaceUser key={index} name={user.name} role={user.role}/>)}
            </div>
            {showInviteModal && <InviteUserModal onClose={() => setShowInviteModal(false)} />}
        </div>
    );
};
