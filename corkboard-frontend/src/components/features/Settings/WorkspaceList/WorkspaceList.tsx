import './WorkspaceList.scss';
import {useEffect, useState} from 'react';
import type {WorkspaceType} from '../../../../types/WorkspaceType.ts';
import {api} from '../../../../api/api.ts';
import {Table} from "../../../ui/Table/Table.tsx";
import {Button} from "../../../ui/Button/Button.tsx";
import {useAuth} from "../../../../context/auth/useAuth.ts";
import {WorkspaceDisplay} from "../../../ui/WorkspaceDisplay/WorkspaceDisplay.tsx";

export const WorkspaceList = () => {
    const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([]);
    const {user} = useAuth();

    useEffect(() => {
        api.get('/workspaces').then((res) => {
            setWorkspaces(res.data);
        });
    }, []);

    return (
        <div className="workspace-list">
            <div className="workspace-list__title">My workspaces</div>
            <Table data={workspaces} columns={[
                {
                    key: "name",
                    header: "Name",
                    render: (_, row) => (
                        <WorkspaceDisplay workspace={row}/>
                    )
                },
                {
                    key: "owner",
                    header: "Owner",
                    render: (_, row) => row.owner.username
                },
                {
                    key: "id",
                    header: "Options",
                    render: (_, row) => (
                        <>
                            <Button icon="gear" variant="icon" color="outlined" size="small"/>
                            <Button icon="doorOpen" variant="icon" color="outlined" size="small"
                                    disabled={row.owner.id !== user?.id}/>
                        </>
                    )
                }
            ]}/>
        </div>
    );
};
