import "./ReleasesList.scss";
import {useEffect, useState} from "react";
import {api} from "../../../api/api.ts";
import {ReleasesListItem} from "./ReleasesListItem.tsx";

type releaseType = {
    id: number;
    name: string;
}

type ReleaseListProps = {
    onClick: () => void;
}

export const ReleasesList = ({ onClick}: ReleaseListProps) => {
    const [releases, setReleases] = useState<releaseType[] | null>(null)

    useEffect(() => {
        api.get("/releases").then((res) => {
            console.log("Releases - ", res.data);
            setReleases(res.data)
        })
    }, []);

    const handleEdit = (id: number, newName: string) => {
        setReleases((prev) =>
            prev!.map((r) => (r.id === id ? { ...r, name: newName } : r))
        );
    }

    const handleDelete = (id: number) => {
        setReleases((prev) => prev!.filter((r) => r.id !== id));
    };

    return <div className="releases-list">
        <div className="releases-list__header">
            <div>Name</div>
            <div>Progress</div>
            <div>Start</div>
            <div>End</div>
        </div>
        {releases && releases.map(release => <ReleasesListItem key={release.id} id={release.id} name={release.name} onEdit={handleEdit} onDelete={handleDelete}/>)}
        <div className="releases-list--button" onClick={onClick}>+ New Release</div>
    </div>
}