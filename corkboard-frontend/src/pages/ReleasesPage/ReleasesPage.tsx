import "./ReleasesPage.scss"
import { Navbar } from "../../components/features/Navbar/Navbar.tsx";
import {ReleasesList} from "../../components/features/ReleasesList/ReleasesList.tsx";

export const ReleasesPage = () => {
    return <div className="releases">
        <Navbar/>
        <div className="releases__content">
            <ReleasesList />
        </div>
    </div>
}