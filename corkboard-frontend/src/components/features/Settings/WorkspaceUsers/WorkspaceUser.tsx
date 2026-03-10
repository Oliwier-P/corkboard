import './WorkspaceUser.scss';
import {Button} from "../../../ui/Button/Button.tsx";

type WorkspaceUserProps = {
  name: string;
  role: string;
};

export const WorkspaceUser = ({ name, role }: WorkspaceUserProps) => {
  return (
    <div className="workspace-user">
      <div className="workspace-user__name">{name}</div>
      <div className="workspace-user__role">{role}</div>
      <div className="workspace-user__options">
          <Button icon="trash" variant="icon" size="small" color="outlined" />
          <Button icon="edit" variant="icon" size="small" color="outlined" />
      </div>
    </div>
  );
};
