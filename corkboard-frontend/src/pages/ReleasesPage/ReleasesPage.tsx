import "./ReleasesPage.scss"
import { Navbar } from "../../components/features/Navbar/Navbar.tsx";
import { ReleasesList } from "../../components/features/ReleasesList/ReleasesList.tsx";
import {useState} from "react";
import {Button} from "../../components/ui/Button/Button.tsx";
import {api} from "../../api/api.ts";

export const ReleasesPage = () => {
    const [showReleaseForm, setShowReleaseForm] = useState<boolean>(false)
    const [releaseName, setReleaseName] = useState<string>('')

    const addNewRelease = async () => {
        if (releaseName === '') return;

        try {
            await api.post("/releases",  { name: releaseName })
            console.log("Added")
            setShowReleaseForm(false);
        } catch (error) {
            console.error(error)
        }
    }

    return <div className="releases">
        {showReleaseForm && <div className="overlay-wrapper">
            <div className="overlay-content">
                <div className="overlay-content__close" onClick={() => setShowReleaseForm(false)}>X</div>
                <span className="overlay-content__title">Create new release</span>
                <input placeholder="Name" onChange={(e) => setReleaseName(e.target.value)} />
                <Button color={"primary"} onClick={addNewRelease}>Create</Button>
            </div>
        </div>}

        <Navbar/>
        <div className="releases__content">
            <ReleasesList onClick={() => setShowReleaseForm(true)}/>
        </div>
    </div>
}