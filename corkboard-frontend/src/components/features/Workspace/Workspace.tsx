import './Workspace.scss';

type WorkspaceProps = {
  onClick: () => void;
};

export const Workspace = ({ onClick }: WorkspaceProps) => {
  return (
    <div className="workspace-current" onClick={onClick}>
      <div className="workspace-current__logo">P</div>
      <span className="workspace-current__name">Part Games</span>
      <span className="workspace-current__arrow">v</span>
    </div>
  );
};
