import './Workspace.scss';
import { forwardRef } from 'react';
import { useWorkspaceMenuStore } from "@/store/workspaceMenuStore.ts";

type WorkspaceProps = {
  name: string;
};

export const Workspace = forwardRef<HTMLDivElement, WorkspaceProps>(({ name }, ref) => {
  const isMenuOpen = useWorkspaceMenuStore((state) => state.isOpen);
  const setMenuOpen = useWorkspaceMenuStore((state) => state.setOpen);

  return (
    <div ref={ref} className="workspace-current" onClick={() => setMenuOpen(!isMenuOpen)}>
      <div className="workspace-current__logo">{name[0].toUpperCase()}</div>
      <span className="workspace-current__name">{name}</span>
      <span className="workspace-current__arrow">v</span>
    </div>
  );
});
