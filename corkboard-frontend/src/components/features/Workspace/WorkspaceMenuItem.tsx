import './WorkspaceMenuItem.scss';
import { useWorkspaceStore } from '../../../store/workspaceStore.ts';
import { useNavigate } from 'react-router-dom';
import { useWorkspaceMenuStore } from '../../../store/workspaceMenuStore.ts';

type WorkspaceMenuItemProps = {
  id: number;
  name: string;
};

export const WorkspaceMenuItem = ({ id, name }: WorkspaceMenuItemProps) => {
  const setWorkspace = useWorkspaceStore((state) => state.setWorkspace);
  const setMenuOpen = useWorkspaceMenuStore((state) => state.setOpen);
  const navigate = useNavigate();

  const handleSwitchWorkspace = () => {
    localStorage.setItem('workspace_id', id.toString());
    setWorkspace({ id, name, logo: '', owner_id: 1 });
    setMenuOpen(false);
    navigate(`/workspaces/${id}/current_release`);
  };

  return (
    <button key={id} className="workspace-menu__workspace" onClick={handleSwitchWorkspace}>
      <div className="workspace-menu__workspace-logo">{name[0].toUpperCase()}</div>
      <div className="workspace-menu__workspace-name">{name}</div>
    </button>
  );
};
