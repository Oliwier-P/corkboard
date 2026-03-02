import "./WorkspaceMenu.scss"
import {WorkspaceMenuItem} from "./WorkspaceMenuItem.tsx";

export const WorkspaceMenu = () => {
    return(
    <div className="workspace-menu">
        <div className="workspace-menu__header">
            <div className="workspace-menu__logo">P</div>

            <div className="workspace-menu__info">
                <span className="workspace-menu__info-name">Part Games</span>
                <span className="workspace-menu__info-members">2 members</span>
            </div>
        </div>

        <div className="workspace-menu__section">
            <div className="workspace-menu__section-title">
                Switch Workspaces
            </div>

            <div className="workspace-menu__workspaces">
                <WorkspaceMenuItem id={1} name={"Studio Gier Gangplank"} />
            </div>
        </div>

        <button className="workspace-menu__create">+ Create Workspace</button>
    </div>
    )
}