import './WorkspaceMenu.scss';
import { WorkspaceMenuItem } from './WorkspaceMenuItem.tsx';
import type { WorkspaceType } from '../../../types/WorkspaceType.ts';
import { useNavigate } from 'react-router-dom';
import { useWorkspaceStore } from '../../../store/workspaceStore.ts';
import { Button } from '../../ui/Button/Button.tsx';
import { forwardRef } from 'react';
import { useWorkspaceMenuStore } from '../../../store/workspaceMenuStore.ts';

type WorkspaceMenuProps = {
  workspaces: WorkspaceType[];
  handleWorkspaceCreate: () => void;
};

export const WorkspaceMenu = forwardRef<HTMLDivElement, WorkspaceMenuProps>(({ workspaces, handleWorkspaceCreate }, ref) => {
  const workspace = useWorkspaceStore((state) => state.workspace);
  const setMenuOpen = useWorkspaceMenuStore((state) => state.setOpen);
  const navigate = useNavigate();

  const handleSettings = () => {
    setMenuOpen(false);
    navigate(`/settings/workspace/${workspace?.id}/general`);
  };

  const handleUsers = () => {
    setMenuOpen(false);
    navigate(`/settings/workspace/${workspace?.id}/users`);
  };

  return (
    <div className="workspace-menu" ref={ref}>
      <div className="workspace-menu__header">
        <div className="workspace-menu__logo">{workspace && (!workspace || !workspace.logo) ? workspace!.name[0].toUpperCase() : 'Logo'}</div>

        <div className="workspace-menu__info">
          <span className="workspace-menu__info-name">{workspace && workspace.name}</span>
          <span className="workspace-menu__info-members">2 members</span>
        </div>
      </div>

      <div className="workspace-menu__buttons">
        <Button color="outlined" size="medium" icon="gear" onClick={handleSettings}>
          Settings
        </Button>
        <Button color="outlined" size="medium" icon="users" onClick={handleUsers}>
          People
        </Button>
      </div>

      <div className="workspace-menu__section">
        {workspaces.length > 0 && (
          <>
            <div className="workspace-menu__section-title">Switch Workspaces</div>

            <div className="workspace-menu__workspaces">
              {workspaces.map((workspace) => (
                <WorkspaceMenuItem key={workspace.id} id={workspace.id} name={workspace.name} />
              ))}
            </div>
          </>
        )}
      </div>

      <Button color="outlined" size="large" onClick={handleWorkspaceCreate}>
        + Create Workspace
      </Button>
    </div>
  );
});
