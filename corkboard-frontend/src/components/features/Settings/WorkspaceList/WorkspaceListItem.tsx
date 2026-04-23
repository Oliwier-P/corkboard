import './WorkspaceListItem.scss';
import {Button} from '../../../ui/Button/Button.tsx';
import {useNavigate} from 'react-router-dom';
import {useAuth} from "../../../../context/auth/useAuth.ts";

interface WorkspaceListItemProps {
    id: number;
    name: string;
    owner_id: number;
}

export const WorkspaceListItem = ({id, name, owner_id}: WorkspaceListItemProps) => {
    const {user} = useAuth();
    const isWorkspaceOwner = owner_id === user?.id;
    const navigate = useNavigate();

    const handleWorkspaceSettings = () => {
        navigate(`/settings/workspace/${id}/general`);
    };

    return (
        <div className="workspace-item">
            <div className="workspace-item__info">
                <div className="workspace-item__avatar">{name[0].toUpperCase()}</div>
                <div className="workspace-item__name">{name}</div>
            </div>

            <div className="workspace-item__actions">
                <Button color="secondary" onClick={handleWorkspaceSettings}>
                    Settings
                </Button>
                {!isWorkspaceOwner && <Button color="red">Leave</Button>}
            </div>
        </div>
    );
};
