import './WorkspaceGeneral.scss';
import { Input } from '../../../ui/Input/Input.tsx';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../../api/api.ts';
import type { WorkspaceType } from '../../../../types/WorkspaceType.ts';
import { Button } from '../../../ui/Button/Button.tsx';

export const WorkspaceGeneral = () => {
  const { workspaceId } = useParams();
  const [workspace, setWorkspace] = useState<WorkspaceType | null>(null);
  const workspaceOwner = workspace?.owner_id === 1;
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/workspaces/${workspaceId}`).then((res) => setWorkspace(res.data));
  }, [location.pathname]);

  const handleDeleteWorkspace = () => {
    api.delete(`/workspaces/${workspace?.id}`);
    navigate(`/workspaces/${workspace?.id}/current_release`);
  };

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

      {workspaceOwner && (
        <>
          <div className="workspace-general__section-title">Danger zone</div>
          <div className="workspace-general__section">
            <div className="workspace-general__setting">
              <span className="workspace-general__label">Delete this Workspace forever</span>
              <Button color="red" onClick={handleDeleteWorkspace}>
                Delete
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
