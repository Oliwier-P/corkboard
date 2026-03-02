import "./WorkspaceMenuItem.scss"

type WorkspaceMenuItemProps = {
    id: number;
    name: string
}

export const WorkspaceMenuItem = ({id, name}: WorkspaceMenuItemProps) => {
    return <button className="workspace-menu__workspace">
        <div className="workspace-menu__workspace-logo">{id}</div>
        <div className="workspace-menu__workspace-name">{name}</div>
    </button>
}