import './WorkspaceGeneral.scss';
import { Input } from '../../../ui/Input/Input.tsx';

export const WorkspaceGeneral = () => {
  return (
    <div className="workspace-general">
      <h2 className="workspace-general__title">Workspace settings</h2>
      <h3 className="workspace-general__section-title">General</h3>

      <div className="workspace-general__section">
        <div className="workspace-general__setting">
          <span className="workspace-general__label">Avatar</span>
          <div className="workspace-general__logo">L</div>
        </div>

        <div className="workspace-general__setting">
          <span className="workspace-general__label">Name</span>
          <Input />
        </div>
      </div>
    </div>
  );
};
