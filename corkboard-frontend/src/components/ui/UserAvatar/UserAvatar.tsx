import "./UserAvatar.scss"

type UserAvatarProps = {
    username: string
}
export const UserAvatar = ({username}: UserAvatarProps) => {
    const usernameFirstLetter = username[0].toUpperCase()

    return (
        <div className="user-avatar">
            {usernameFirstLetter}
        </div>
    )
}