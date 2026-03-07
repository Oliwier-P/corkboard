import './WorkspaceUser.scss';

type WorkspaceUserProps = {
  name: string;
  role: string;
};

export const WorkspaceUser = ({ name, role }: WorkspaceUserProps) => {
  return (
    <div className="workspace-users__list-user row">
      <div className="name">{name}</div>
      <div className="role">{role}</div>
      <div className="edit">...</div>
    </div>
  );
};
