import {Navbar} from "../../components/features/Navbar/Navbar.tsx";
import "./CurrentReleasePage.scss"
import {Button} from "../../components/ui/Button/Button.tsx";
import {useEffect, useState} from "react";
import {api} from "../../api/api.ts";
import {ReleaseBoard} from "../../components/features/ReleaseBoard/ReleaseBoard.tsx";
import type {releaseType} from "../../types/ReleaseType.ts";

export const CurrentReleasePage = () => {
    const [release, setRelease] = useState<releaseType | null>(null)

    useEffect(() => {
        api.get("/releases/current").then((res) => {
            setRelease({
                ...res.data
            })
        })
    }, [])

    return (
        <div className="current-release">
            <Navbar/>
            <div className="current-release__content">
                <div className="current-release__header">
                    <span>
                        <span className="current-release__label">Current Release:</span> {release?.name || "No Release"}
                    </span>

                    <div className="current-release__buttons">
                        {!release && <Button color="primary" size="small">Create Release</Button>}
                        {release && <Button color="primary" size="small">Complete Release</Button>}
                    </div>
                </div>
                {release && <ReleaseBoard release={release}/>}
            </div>
        </div>
    )
}