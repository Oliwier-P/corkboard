import "./ProfilePopover.scss";
import { UserAvatar } from "@/ui/UserAvatar/UserAvatar.tsx";
import { Icon } from "@/ui/Icons/Icon.tsx";
import Popover from "@/ui/Popover/Popover.tsx";
import useProfilePopover from "./useProfilePopover.ts";

const ProfilePopover = () => {
    const { user, handleProfile, handleLogout } = useProfilePopover();
    const items = [
        {
            icon: <Icon icon="circleUser" />,
            label: "Profile",
            onClick: handleProfile,
        },
        {
            icon: <Icon icon="doorOpen" />,
            label: "Logout",
            onClick: handleLogout,
        },
    ];

    if (!user) return null;

    return (
        <div className="task-status-popover">
            <Popover
                trigger={
                    <div>
                        <UserAvatar username={user.username} />
                        <span>{user.username}</span>
                    </div>
                }
                offset={15}
            >
                {items.map((item) => (
                    <Popover.PopoverItem icon={item.icon} label={item.label} value="" onSelect={item.onClick} />
                ))}
            </Popover>
        </div>
    );
};

export default ProfilePopover;
