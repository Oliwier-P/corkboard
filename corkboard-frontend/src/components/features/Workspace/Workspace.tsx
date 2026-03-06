import './Workspace.scss';

type WorkspaceProps = {
  name: string | undefined;
  onClick: () => void;
};

export const Workspace = ({ name, onClick }: WorkspaceProps) => {
  return (
    <div className="workspace-current" onClick={onClick}>
      <div className="workspace-current__logo">{name && name[0].toUpperCase()}</div>
      <span className="workspace-current__name">{name}</span>
      <span className="workspace-current__arrow">v</span>
    </div>
  );
};
