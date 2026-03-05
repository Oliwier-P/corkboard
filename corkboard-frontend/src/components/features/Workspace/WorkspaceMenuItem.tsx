import "./WorkspaceMenuItem.scss"
import {api} from "../../../api/api.ts";

type WorkspaceMenuItemProps = {
    id: number;
    name: string
}

export const WorkspaceMenuItem = ({id, name}: WorkspaceMenuItemProps) => {
    const handleSwitchWorkspace = () => {
        api.post('/workspaces/switch', { id: id })
    }

    return <button key={id} className="workspace-menu__workspace" onClick={handleSwitchWorkspace}>
        <div className="workspace-menu__workspace-logo">{name[0].toUpperCase()}</div>
        <div className="workspace-menu__workspace-name">{name}</div>
    </button>
}