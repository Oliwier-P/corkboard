import "./WorkspaceAvatar.scss"

type UserAvatarProps = {
    name: string
}
export const WorkspaceAvatar = ({name}: UserAvatarProps) => {
    const usernameFirstLetter = name[0].toUpperCase()

    return (
        <div className="workspace-avatar">
            {usernameFirstLetter}
        </div>
    )
}