import "./UserPopover.scss";
import { Button } from "@/ui/Button/Button.tsx";
import { UserAvatar } from "@/ui/UserAvatar/UserAvatar.tsx";
import type { User } from "@/context/auth/types.ts";
import Popover from "@/ui/Popover/Popover.tsx";
import useUserPopover from "./useUserPopover.ts";

interface UserSelectProps {
    taskId: string;
    taskUser: User | null;
    variant?: string;
}

const UserPopover = ({ taskId, taskUser, variant = "task" }: UserSelectProps) => {
    const { users, handleAssignUserToTask } = useUserPopover({ taskId, taskUser });

    return (
        <div className="user-popover" onClick={(e) => e.stopPropagation()}>
            <Popover
                trigger={
                    <div>
                        {taskUser ? (
                            <>
                                <UserAvatar username={taskUser.username} />
                                {variant === "modal" && taskUser.username}
                            </>
                        ) : (
                            <>{variant === "modal" ? <span>Empty</span> : <Button color="outlined" size="small" variant="icon" icon="circleUser" />}</>
                        )}
                    </div>
                }
            >
                {users.map((user) => (
                    <Popover.PopoverItem
                        icon={<UserAvatar username={user.username} />}
                        label={user.username}
                        value={user.id}
                        selected={user.id === taskUser?.id}
                        onSelect={handleAssignUserToTask}
                    />
                ))}
            </Popover>
        </div>
    );
};

export default UserPopover;
