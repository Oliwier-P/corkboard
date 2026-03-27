import {Button} from "../../ui/Button/Button.tsx";
import "./UserNotifications.scss"
import {useEffect, useRef, useState} from "react";
import {Icon} from "../../ui/Icons/Icon.tsx";
import {api} from "../../../api/api.ts";

type invitationType = {
    invited_by: string
    workspace: string
}

export const UserNotifications = () => {
    const [showNotifications, setShowNotifications] = useState(false)
    const [invitations, setInvitations] = useState<invitationType[]>([])
    const notificationMenuRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        api.get("workspaces/invitation").then((res) => setInvitations(res.data))
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (buttonRef.current && !buttonRef.current.contains(target) &&
                notificationMenuRef.current && !notificationMenuRef.current.contains(target)) {
                setShowNotifications(false);
            }
        };

        if (showNotifications) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showNotifications, setShowNotifications]);

    return (
        <>
            {showNotifications && (
                <div className="user-notifications__menu" ref={notificationMenuRef}>
                    <div className="user-notifications__header">
                        <Icon icon="bell"/>
                        Notifications
                    </div>
                    {invitations.map(invitation => (
                        <div className="user-notifications__notification">
                            <div className="user-notifications__message">
                                {invitation.invited_by} invited you to {invitation.workspace}
                            </div>
                            <div className='user-notifications__buttons'>
                                <Button color="green" size="small">Accept</Button>
                                <Button color="red" size="small">Decline</Button>
                            </div>
                        </div>
                    ))}

                    {invitations.length === 0 && (
                        <div className="user-notifications__notification">
                            You have no notification
                        </div>
                    )}
                </div>
            )}
            <Button ref={buttonRef} className="user-notifications" variant="icon" color="outlined" size="small"
                    icon="bell"
                    onClick={() => setShowNotifications(prev => !prev)}>
                {invitations.length > 0 && <div className="user-notifications__dot"/>}
            </Button>
        </>
    )
}