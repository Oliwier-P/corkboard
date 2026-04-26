import './Navbar.scss';
import {NavbarItem} from './NavbarItem.tsx';
import {Icon} from '../../ui/Icons/Icon.tsx';
import {useAuth} from '../../../context/auth/useAuth.ts';
import {Workspace} from '../Workspace/Workspace.tsx';
import {WorkspaceMenu} from '../Workspace/WorkspaceMenu.tsx';
import {useEffect, useRef, useState} from 'react';
import {api} from '../../../api/api.ts';
import type {WorkspaceType} from '../../../types/WorkspaceType.ts';
import {useWorkspaceStore} from '../../../store/workspaceStore.ts';
import {CreateWorkspaceModal} from './CreateWorkspaceModal.tsx';
import {useWorkspaceMenuStore} from '../../../store/workspaceMenuStore.ts';
import {UserAvatar} from '../../ui/UserAvatar/UserAvatar.tsx';
import {UserNotifications} from "../UserNotifications/UserNotifications.tsx";

export const Navbar = () => {
    const {user} = useAuth();
    const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([]);
    const [showWorkspaceForm, setShowWorkspaceForm] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const workspaceRef = useRef<HTMLDivElement>(null);
    const workspace = useWorkspaceStore((state) => state.workspace);
    const setWorkspace = useWorkspaceStore((state) => state.setWorkspace);
    const isMenuOpen = useWorkspaceMenuStore((store) => store.isOpen);
    const setMenuOpen = useWorkspaceMenuStore((store) => store.setOpen);

    const handleWorkspaceCreate = () => {
        setMenuOpen(false);
        setShowWorkspaceForm(true);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (menuRef.current && workspaceRef.current && !menuRef.current.contains(target) && !workspaceRef.current.contains(target)) {
                setMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen, setMenuOpen]);

    useEffect(() => {
        api.get('/workspaces').then((res) => {
            setWorkspaces(res.data);

            const storageId = localStorage.getItem('workspace_id');

            if (!storageId) {
                localStorage.setItem('workspace_id', res.data[0].id.toString());
                setWorkspace(res.data[0]);
            } else {
                setWorkspace(res.data.find((w: WorkspaceType) => w.id.toString() == storageId) ?? res.data[0]);
            }
        });
    }, [setWorkspace]);

    return (
        <div className="navbar">
            <div className="navbar__app-info">
                <Icon icon="appLogo" className="navbar__logo"/>
                <div className="navbar__app-name">Corkboard</div>
            </div>

            {showWorkspaceForm && <CreateWorkspaceModal onClose={() => setShowWorkspaceForm(false)}/>}

            {workspace && workspaces.length > 0 && <Workspace ref={workspaceRef} name={workspace.name}/>}
            {isMenuOpen && workspaces.length > 0 && (
                <WorkspaceMenu ref={menuRef} workspaces={workspaces.filter((w) => w.id !== workspace?.id)}
                               handleWorkspaceCreate={handleWorkspaceCreate}/>
            )}

            <NavbarItem icon="box" label="Current Release" path={`/workspaces/${workspace?.id}/current_release`}/>
            <NavbarItem icon="rows" label="Backlog" path="/backlog"/>
            <NavbarItem icon="bookmarks" label="Releases" path={`/workspaces/${workspace?.id}/releases`}/>

            {user && (
                <div className="navbar__user">
                    <UserAvatar username={user.username}/>
                    <span>{user.username}</span>
                    <UserNotifications/>
                </div>
            )}
        </div>
    );
};
