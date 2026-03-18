import './WorkspaceMenuItem.scss';
import { useWorkspaceStore } from '../../../store/workspaceStore.ts';

type WorkspaceMenuItemProps = {
  id: number;
  name: string;
};

export const WorkspaceMenuItem = ({ id, name }: WorkspaceMenuItemProps) => {
  const setWorkspace = useWorkspaceStore((state) => state.setWorkspace);

  const handleSwitchWorkspace = () => {
    localStorage.setItem('workspace_id', id.toString());
    setWorkspace({ id, name, logo: '', owner_id: 1 });
  };

  return (
    <button key={id} className="workspace-menu__workspace" onClick={handleSwitchWorkspace}>
      <div className="workspace-menu__workspace-logo">{name[0].toUpperCase()}</div>
      <div className="workspace-menu__workspace-name">{name}</div>
    </button>
  );
};
