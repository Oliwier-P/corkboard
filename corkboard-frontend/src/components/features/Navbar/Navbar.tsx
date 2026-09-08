import "./Navbar.scss";
import { NavbarItem } from "./NavbarItem.tsx";
import { Icon } from "@/ui/Icons/Icon.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import { Workspace } from "../Workspace/Workspace.tsx";
import { WorkspaceMenu } from "../Workspace/WorkspaceMenu.tsx";
import { useEffect, useRef, useState } from "react";
import { api } from "@/api";
import type { WorkspaceType } from "@/types/WorkspaceType.ts";
import { useWorkspaceStore } from "@/store/workspaceStore.ts";
import { useWorkspaceMenuStore } from "@/store/workspaceMenuStore.ts";
import { UserNotifications } from "../UserNotifications/UserNotifications.tsx";
import ProfilePopover from "@/ui/Popovers/ProfilePopover/ProfilePopover.tsx";
import CreateModal from "@/ui/Modals/CreateModal.tsx";

export const Navbar = () => {
    const { user } = useAuth();
    const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([]);
    const [showWorkspaceForm, setShowWorkspaceForm] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const workspaceRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const userModalRef = useRef<HTMLDivElement>(null);
    const workspace = useWorkspaceStore((state) => state.workspace);
    const setWorkspace = useWorkspaceStore((state) => state.setWorkspace);
    const isMenuOpen = useWorkspaceMenuStore((store) => store.isOpen);
    const setMenuOpen = useWorkspaceMenuStore((store) => store.setOpen);
    const isActiveDocumentLink = location.pathname.startsWith(`/workspaces/${workspace?.id}/documents/`);
    const [showUserModal, setShowUserModal] = useState<boolean>(false);

    const handleWorkspaceCreate = () => {
        setMenuOpen(false);
        setShowWorkspaceForm(true);
    };

    const handleCreateWorkspace = (data: { name: string }) => {
        api.post("/workspaces", { name: data.name }).then((response) => {
            workspaces.push(response.data);
            setShowWorkspaceForm(false);
        });
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (menuRef.current && workspaceRef.current && !menuRef.current.contains(target) && !workspaceRef.current.contains(target)) {
                setMenuOpen(false);
            }

            if (profileRef.current && !profileRef.current.contains(target) && (!userModalRef.current || !userModalRef.current.contains(target))) {
                setShowUserModal(false);
            }
        };

        if (isMenuOpen || showUserModal) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen, setMenuOpen, showUserModal]);

    useEffect(() => {
        api.get("/workspaces").then((res) => {
            setWorkspaces(res.data);

            const storageId = localStorage.getItem("workspace_id");

            if (!storageId) {
                localStorage.setItem("workspace_id", res.data[0].id.toString());
                setWorkspace(res.data[0]);
            } else {
                setWorkspace(res.data.find((w: WorkspaceType) => w.id.toString() == storageId) ?? res.data[0]);
            }
        });
    }, [setWorkspace]);

    return (
        <div className="navbar">
            <div className="navbar__app-info">
                <Icon icon="appLogo" className="navbar__logo" />
                <div className="navbar__app-name">Corkboard</div>
            </div>

            {showWorkspaceForm && (
                <CreateModal
                    title="Create new workspace"
                    requiredMessage="You have to enter a workspace name!"
                    onSave={handleCreateWorkspace}
                    onClose={() => setShowWorkspaceForm(false)}
                />
            )}

            {workspace && workspaces.length > 0 && user?.role === "user" && <Workspace ref={workspaceRef} name={workspace.name} />}
            {isMenuOpen && workspaces.length > 0 && (
                <WorkspaceMenu ref={menuRef} workspaces={workspaces.filter((w) => w.id !== workspace?.id)} handleWorkspaceCreate={handleWorkspaceCreate} />
            )}

            {user?.role === "user" && (
                <>
                    <NavbarItem icon="box" label="Current Release" path={`/workspaces/${workspace?.id}/current_release`} />
                    <NavbarItem icon="rows" label="Backlog" path="/backlog" />
                    <NavbarItem icon="bookmarks" label="Releases" path={`/workspaces/${workspace?.id}/releases`} />
                    <NavbarItem icon="document" label="Docs" path={`/workspaces/${workspace?.id}/documents/`} isActive={isActiveDocumentLink} />
                </>
            )}

            {user?.role === "superadmin" && (
                <>
                    <NavbarItem icon="users" label="Users" path="/superadmin/users" />
                </>
            )}

            {user && (
                <>
                    <div className="user">
                        <ProfilePopover />
                        <UserNotifications updateWorkspaces={(workspace: WorkspaceType) => workspaces.push(workspace)} />
                    </div>
                </>
            )}
        </div>
    );
};
