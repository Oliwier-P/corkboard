import './WorkspaceUsers.scss';
import { WorkspaceUser } from './WorkspaceUser.tsx';
import { useState } from 'react';
import { Button } from '../../../ui/Button/Button.tsx';

type User = {
  name: string;
  role: string;
};

export const WorkspaceUsers = () => {
  const [users] = useState<User[]>([]);

  return (
    <div className="workspace-users">
      <span className="workspace-users__title">Manage people</span>

      <div className="workspace-users__list">
        <div className="workspace-users__list-header">
          <div>Name</div>
          <div>Role</div>
          <div>Options</div>
        </div>

        <Button variant="icon" className="workspace-users__invite-btn">
          <div className="workspace-users__invite-icon">+</div>
          <div className="workspace-users__invite-text">Invite User</div>
        </Button>

        {users && users.map((user, index) => <WorkspaceUser key={index} name={user.name} role={user.role} />)}
      </div>
    </div>
  );
};
