import "./ReleasesList.scss";
import {useEffect, useState} from "react";
import {api} from "../../../api/api.ts";

type releaseType = {
    id: number;
    name: string;
}

export const ReleasesList = () => {
    const [releases, setReleases] = useState<releaseType[] | null>(null)

    useEffect(() => {
        api.get("/releases").then((res) => {
            setReleases(res.data)
        })
    }, []);

    const addNewRelease = () => {
    }

    return <div className="releases-list">
        {releases && releases.map(release => <div key={release.id} className="releases-list--item">{release.name}</div>)}
        <div className="releases-list--button" onClick={addNewRelease}>+ New Release</div>
    </div>
}