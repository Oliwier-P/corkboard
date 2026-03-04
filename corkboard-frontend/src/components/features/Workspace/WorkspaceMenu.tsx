import "./WorkspaceMenu.scss"
import {WorkspaceMenuItem} from "./WorkspaceMenuItem.tsx";

type WorkspaceType = {
    id: number;
    name: string;
    current: boolean
    logo: string;
}

type WorkspaceMenuProps = {
    workspaces: WorkspaceType[];
    onClickSettings: () => void;
    onClickCreate: () => void;
}

export const WorkspaceMenu = ({workspaces, onClickSettings, onClickCreate}: WorkspaceMenuProps) => {
    const currentWorkspace = workspaces.find(w => w.current)

    return(
    <div className="workspace-menu">
        <div className="workspace-menu__header">
            <div className="workspace-menu__logo">{!currentWorkspace || !currentWorkspace.logo ? currentWorkspace!.name[0].toUpperCase() : "Logo"}</div>

            <div className="workspace-menu__info">
                <span className="workspace-menu__info-name">{currentWorkspace!.name}</span>
                <span className="workspace-menu__info-members">2 members</span>
            </div>
        </div>

        <button className="workspace-menu__settings" onClick={onClickSettings}>Settings</button>

        <div className="workspace-menu__section">
            <div className="workspace-menu__section-title">
                Switch Workspaces
            </div>

            <div className="workspace-menu__workspaces">
                {workspaces && workspaces.filter(w => !w.current).map((workspace) =>
                    <WorkspaceMenuItem key={workspace.id} id={workspace.id} name={workspace.name} />
                )}
            </div>
        </div>

        <button className="workspace-menu__create" onClick={onClickCreate}>+ Create Workspace</button>
    </div>
    )
}