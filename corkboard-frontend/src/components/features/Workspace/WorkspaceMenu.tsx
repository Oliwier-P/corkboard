import './WorkspaceMenu.scss';
import { WorkspaceMenuItem } from './WorkspaceMenuItem.tsx';
import type { WorkspaceType } from '../../../types/WorkspaceType.ts';
import { Link } from 'react-router-dom';

type WorkspaceMenuProps = {
  workspaces: WorkspaceType[];
  onClickCreate: () => void;
};

export const WorkspaceMenu = ({ workspaces, onClickCreate }: WorkspaceMenuProps) => {
  const currentWorkspace = workspaces[0];

  return (
    <div className="workspace-menu">
      <div className="workspace-menu__header">
        <div className="workspace-menu__logo">{!currentWorkspace || !currentWorkspace.logo ? currentWorkspace!.name[0].toUpperCase() : 'Logo'}</div>

        <div className="workspace-menu__info">
          <span className="workspace-menu__info-name">{currentWorkspace!.name}</span>
          <span className="workspace-menu__info-members">2 members</span>
        </div>
      </div>

      <Link to="/settings/workspace/general" className="workspace-menu__settings">
        Settings
      </Link>

      <div className="workspace-menu__section">
        <div className="workspace-menu__section-title">Switch Workspaces</div>

        <div className="workspace-menu__workspaces">
          {workspaces.length > 0 && workspaces.map((workspace) => <WorkspaceMenuItem key={workspace.id} id={workspace.id} name={workspace.name} />)}
        </div>
      </div>

      <button className="workspace-menu__create" onClick={onClickCreate}>
        + Create Workspace
      </button>
    </div>
  );
};
