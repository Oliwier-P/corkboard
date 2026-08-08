import "./UserSelect.scss";
import { Button } from "../Button/Button.tsx";
import { useEffect, useRef, useState } from "react";
import { UserAvatar } from "../UserAvatar/UserAvatar.tsx";
import { api } from "../../../api/api.ts";
import { useWorkspaceStore } from "../../../store/workspaceStore.ts";
import type { User } from "../../../context/auth/types.ts";
import { useReleaseBoardStore } from "../../../store/releaseBoardStore.ts";

interface UserSelectProps {
    taskId: number;
    taskUser: User | null;
    variant?: string;
}

export const UserSelect = ({ taskId, taskUser, variant = "task" }: UserSelectProps) => {
    const [showUserSelection, setShowUserSelection] = useState<boolean>(false);
    const userSelectModalRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const [users, setUsers] = useState<{ id: number; username: string }[]>([]);
    const workspace = useWorkspaceStore((state) => state.workspace);
    const updateTaskUser = useReleaseBoardStore((state) => state.updateTaskUser);

    const updatePosition = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + 8,
                left: rect.left,
            });
        }
    };

    const handleOpenUserSelection = () => {
        updatePosition();
        setShowUserSelection(true);
    };

    const handleAssignUserToTask = (userId: number) => {
        updateTaskUser(taskId, userId);
        setShowUserSelection(false);
    };

    useEffect(() => {
        if (!showUserSelection) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (
                userSelectModalRef.current &&
                !userSelectModalRef.current.contains(e.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target as Node)
            ) {
                setShowUserSelection(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showUserSelection]);

    useEffect(() => {
        if (!showUserSelection) return;

        const handleScroll = () => {
            updatePosition();
        };

        window.addEventListener("scroll", handleScroll, true);

        return () => window.removeEventListener("scroll", handleScroll, true);
    }, [showUserSelection]);

    useEffect(() => {
        if (!showUserSelection) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
        };

        document.addEventListener("wheel", handleWheel, { passive: false });
        document.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            document.removeEventListener("wheel", handleWheel);
            document.removeEventListener("touchmove", handleTouchMove);
        };
    }, [showUserSelection]);

    useEffect(() => {
        if (!showUserSelection) return;

        api.get(`/workspaces/${workspace?.id}/collaborators`).then((response) => {
            setUsers(response.data.collaborators);
        });
    }, [showUserSelection, setUsers, workspace?.id]);

    return (
        <div className="user-select" onClick={(e) => e.stopPropagation()}>
            <div ref={buttonRef}>
                {taskUser ? (
                    <div className="user" onClick={handleOpenUserSelection}>
                        <UserAvatar username={taskUser.username} />
                        {variant === "modal" && taskUser.username}
                    </div>
                ) : (
                    <>
                        {variant === "modal" ? (
                            <div onClick={handleOpenUserSelection}>Empty</div>
                        ) : (
                            <Button color="outlined" size="small" variant="icon" icon="circleUser" onClick={handleOpenUserSelection} />
                        )}
                    </>
                )}
            </div>

            {showUserSelection && (
                <div className="user-select__modal" ref={userSelectModalRef} style={{ top: `${position.top}px`, left: `${position.left}px` }}>
                    {users.map((user) => (
                        <div key={user.id} className="item" onClick={() => handleAssignUserToTask(user.id)}>
                            <UserAvatar username={user.username} />
                            <span>{user.username}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
