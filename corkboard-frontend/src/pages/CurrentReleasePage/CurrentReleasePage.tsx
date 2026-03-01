import {Navbar} from "../../components/features/Navbar/Navbar.tsx";
import "./CurrentReleasePage.scss"
import {Button} from "../../components/ui/Button/Button.tsx";
import {ReleaseBoard} from "../../components/features/ReleaseBoard/ReleaseBoard.tsx";

export const CurrentReleasePage = () => {
    return (
        <div className="current-release">
            <Navbar />
            <div className="current-release__content">
                <div className="current-release__header">
                    <span>
                        <span className="current-release__label">Current Release:</span> No Release
                    </span>

                    <div className="current-release__buttons">
                        <Button color="primary" size="small">Create Release</Button>
                    </div>
                </div>
                <ReleaseBoard />
            </div>
        </div>
    )
}