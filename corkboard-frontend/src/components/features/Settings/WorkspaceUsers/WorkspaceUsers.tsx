import './WorkspaceUsers.scss';
import { WorkspaceUser } from './WorkspaceUser.tsx';
import { useState } from 'react';

export const WorkspaceUsers = () => {
  const [users, setUsers] = useState([]);

  return (
    <div className="workspace-users">
      <h2 className="workspace-users__title">Manage people</h2>

      <div className="workspace-users__list-wrapper">
        <div className="workspace-users__list">
          <div className="workspace-users__list-header row">
            <div>Name</div>
            <div>Email</div>
            <div>Role</div>
          </div>

          <div className="workspace-users__list-invite">
            <div className="workspace-users__list-invite-icon">+</div>
            <div className="workspace-users__list-invite-text">Invite people</div>
          </div>

          {users && users.map((user, index) => <WorkspaceUser key={index} name={user.name} email={user.email} role={user.role} />)}
        </div>
      </div>
    </div>
  );
};
