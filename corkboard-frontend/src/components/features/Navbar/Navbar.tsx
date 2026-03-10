import './Navbar.scss';
import { NavbarItem } from './NavbarItem.tsx';
import { Icon } from '../../ui/Icons/Icon.tsx';
import { useAuth } from '../../../context/auth/useAuth.ts';
import { Workspace } from '../Workspace/Workspace.tsx';
import { WorkspaceMenu } from '../Workspace/WorkspaceMenu.tsx';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../../ui/Button/Button.tsx';
import { api } from '../../../api/api.ts';
import Modal from '../../ui/Modal/Modal.tsx';
import type { WorkspaceType } from '../../../types/WorkspaceType.ts';
import { useWorkspaceStore } from '../../../store/workspaceStore.ts';

export const Navbar = () => {
  const { user } = useAuth();
  const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([]);
  const [workspaceName, setWorkspaceName] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showWorkspaceForm, setShowWorkspaceForm] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const workspace = useWorkspaceStore((state) => state.workspace);
  const setWorkspace = useWorkspaceStore((state) => state.setWorkspace);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const addNewWorkspace = () => {
    if (!workspaceName.trim()) return;

    try {
      api.post('/workspaces', { name: workspaceName });
      setShowWorkspaceForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    api.get('/workspaces').then((res) => {
      setWorkspaces(res.data);

      const storageId = localStorage.getItem('workspace_id');

      if (!storageId) {
        localStorage.setItem('workspace_id', workspaces[0].id.toString());
        setWorkspace(res.data[0]);
      } else {
        setWorkspace(res.data.find((w: WorkspaceType) => w.id.toString() == storageId) ?? workspaces[0]);
      }
    });
  }, []);

  return (
    <div className="navbar">
      <div className="navbar__app-info">
        <Icon icon="appLogo" className="navbar__logo" />
        <div className="navbar__app-name">Corkboard</div>
      </div>

      {showWorkspaceForm && (
        <Modal className="modal-workspace" onClose={() => setShowWorkspaceForm(false)}>
          <div className="modal-workspace__title">Create new workspace</div>
          <input placeholder="Name" onChange={(e) => setWorkspaceName(e.target.value)} />
          <Button color={'primary'} onClick={addNewWorkspace}>
            Create
          </Button>
        </Modal>
      )}

      {workspace && workspaces.length > 0 && <Workspace name={workspace.name} onClick={toggleMenu} />}
      {isMenuOpen && workspaces.length > 0 && (
        <div ref={menuRef}>
          <WorkspaceMenu workspaces={workspaces} onClickCreate={() => setShowWorkspaceForm(true)} />
        </div>
      )}

      <NavbarItem icon="box" label="Current Release" path="/home" />
      <NavbarItem icon="rows" label="Backlog" path="/backlog" />
      <NavbarItem icon="bookmarks" label="Releases" path="/releases" />

      {user && (
        <div className="navbar__user">
          <span>{user.username}</span>
        </div>
      )}
    </div>
  );
};
