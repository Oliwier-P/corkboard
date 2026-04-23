import './WorkspaceList.scss';
import { useEffect, useState } from 'react';
import type { WorkspaceType } from '../../../../types/WorkspaceType.ts';
import { api } from '../../../../api/api.ts';
import { WorkspaceListItem } from './WorkspaceListItem.tsx';

export const WorkspaceList = () => {
  const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([]);

  useEffect(() => {
    api.get('/workspaces').then((res) => {
      setWorkspaces(res.data);
    });
  }, []);

  return (
    <div className="workspace-list">
      <div className="workspace-list__title">My workspaces</div>

      <div className="workspace-list__section">
        {workspaces.map((workspace) => (
          <WorkspaceListItem key={workspace.id} id={workspace.id} name={workspace.name} owner_id={workspace.owner_id} />
        ))}
      </div>
    </div>
  );
};
