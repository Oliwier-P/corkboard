import './WorkspaceGeneral.scss';
import { Input } from '../../../ui/Input/Input.tsx';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../../../api/api.ts';
import type { WorkspaceType } from '../../../../types/WorkspaceType.ts';

export const WorkspaceGeneral = () => {
  const { workspaceId } = useParams();
  const [workspace, setWorkspace] = useState<WorkspaceType | null>(null);

  useEffect(() => {
    api.get(`/workspaces/${workspaceId}`).then((res) => setWorkspace(res.data));
  }, []);

  return (
    <div className="workspace-general">
      <div className="workspace-general__title">Workspace settings</div>

      <div className="workspace-general__section-title">General</div>
      <div className="workspace-general__section">
        <div className="workspace-general__setting">
          <span className="workspace-general__label">Avatar</span>
          <div className="workspace-general__logo">{workspace && workspace.name[0].toUpperCase()}</div>
        </div>

        <div className="workspace-general__setting">
          <span className="workspace-general__label">Name</span>
          <Input defaultValue={workspace ? workspace.name : ''} />
        </div>
      </div>
    </div>
  );
};
