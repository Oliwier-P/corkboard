import './WorkspaceUser.scss';
import {Button} from "../../../ui/Button/Button.tsx";
import {UserAvatar} from "../../../ui/UserAvatar/UserAvatar.tsx";
import {ClassNames} from "../../../../global/utils.ts";

type WorkspaceUserProps = {
    username: string;
    role: string;
    isInvited?: boolean
};

export const WorkspaceUser = ({username, role, isInvited}: WorkspaceUserProps) => {
    return (
        <div className={ClassNames("workspace-user", {invited: isInvited})}>
            <UserAvatar username={username}/>
            <div className="workspace-user__name">{username}</div>
            <div className="workspace-user__role">{role}</div>
            {isInvited && (
                <div className="workspace-user__invited-badge">
                    Invited
                </div>
            )}
            <div className="workspace-user__options">
                {!isInvited && (
                    <>
                        <Button icon="trash" variant="icon" size="small" color="outlined"/>
                        <Button icon="edit" variant="icon" size="small" color="outlined"/>
                    </>
                )}
                {isInvited && (
                    <Button color="outlined" size="small">
                        Cancel
                    </Button>
                )}
            </div>
        </div>
    );
};
