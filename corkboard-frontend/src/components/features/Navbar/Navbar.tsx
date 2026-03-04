import "./Navbar.scss"
import {NavbarItem} from "./NavbarItem.tsx";
import {Icon} from "../../ui/Icons/Icon.tsx";
import {useAuth} from "../../../context/auth/useAuth.ts";
import {Workspace} from "../Workspace/Workspace.tsx";
import {WorkspaceMenu} from "../Workspace/WorkspaceMenu.tsx";
import {useEffect, useRef, useState} from "react";
import {Button} from "../../ui/Button/Button.tsx";
import {api} from "../../../api/api.ts";
import  Modal  from "../../ui/Modal/Modal.tsx";

type WorkspaceType = {
    id: number;
    name: string;
    current: boolean;
    logo: string;
}

export const Navbar = () => {
    const {user} = useAuth()
    const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([]);
    const [workspaceName, setWorkspaceName] = useState<string>("");
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [showWorkspaceForm, setShowWorkspaceForm] = useState<boolean>(false);
    const [showWorkspaceSettings, setShowWorkspacSettings] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    }

    const addNewWorkspace = async () => {
        if (!workspaceName.trim()) return;

        try {
            await api.post("/workspaces",  { name: workspaceName })
            console.log("Added")
            setShowWorkspaceForm(false);
        } catch (error) {
            console.error(error)
        }
    }

    const handleRenameWorkspace = () => {

    }

    const handleDeleteWorkspace = () => {

    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    useEffect(() => {
        api.get("/workspaces").then((res) => {
            setWorkspaces(res.data);
        })
    }, []);

    return (
        <div className="navbar">
            <div className="navbar__app-info">
                <Icon icon="AppLogo" className="navbar__logo" />
                <div className="navbar__app-name">Corkboard</div>
            </div>

            {showWorkspaceSettings && <Modal className="modal-settings" onClose={() => setShowWorkspacSettings(false)}>
                <div className="modal-settings__title">Settings</div>
                <div className="modal-settings__rename">
                    <input placeholder="Name" onChange={(e) => setWorkspaceName(e.target.value)} />
                    <Button color={"secondary"} onClick={handleRenameWorkspace}>Save</Button>
                </div>
                <Button color={"delete"} onClick={handleDeleteWorkspace}>Delete</Button>
            </Modal>}

            {showWorkspaceForm && <Modal className="modal-workspace" onClose={() => setShowWorkspaceForm(false)}>
                <div className="modal-workspace__title">Create new workspace</div>
                <input placeholder="Name" onChange={(e) => setWorkspaceName(e.target.value)} />
                <Button color={"primary"} onClick={addNewWorkspace}>Create</Button>
            </Modal>}

            <Workspace name={workspaces.find(w => w.current)?.name} onClick={toggleMenu}/>
            {isMenuOpen && <div ref={menuRef}><WorkspaceMenu workspaces={workspaces} onClickSettings={() => setShowWorkspacSettings(true)} onClickCreate={() => setShowWorkspaceForm(true)}/></div>}

            <NavbarItem icon="Box" label="Current Release" path="/home" />
            <NavbarItem icon="Rows" label="Backlog" path="/backlog" />
            <NavbarItem icon="Bookmarks" label="Releases" path="/releases" />

            {user && (
                <div className="navbar__user">
                    <span>{user.username}</span>
                </div>
            )}
        </div>
    )
}