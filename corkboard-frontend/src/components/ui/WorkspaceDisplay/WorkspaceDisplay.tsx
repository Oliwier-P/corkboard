import "./WorkspaceDisplay.scss";
import type { WorkspaceType } from "@/types/WorkspaceType.ts";
import { WorkspaceAvatar } from "@/ui/WorkspaceAvatar/WorkspaceAvatar.tsx";

type UserDisplayProps = {
    workspace: WorkspaceType;
};
export const WorkspaceDisplay = ({ workspace }: UserDisplayProps) => {
    return (
        <div className="workspace-display">
            <WorkspaceAvatar name={workspace.name} />
            <span>{workspace.name}</span>
        </div>
    );
};
