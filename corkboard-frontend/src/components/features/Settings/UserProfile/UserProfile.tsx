import "./UserProfile.scss";
import { Button } from "../../../ui/Button/Button.tsx";
import { LabeledInput } from "../../../ui/LabeledInput/LabeledInput.tsx";
import { api } from "../../../../api/api.ts";
import { useNavigate } from "react-router-dom";

export const UserProfile = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        api.delete("/logout");
        localStorage.setItem("token", "");
        navigate("/");
    };

    return (
        <div className="user-profile">
            <span className="user-profile__title">My settings</span>

            <div className="user-profile__section">
                <div className="user-profile__section-info">
                    <div className="title">Profile</div>
                    <div className="description">Your personal information and account security settings.</div>
                </div>
                <div className="user-profile__section-content">
                    <div className="avatar-text">Avatar</div>
                    <div className="avatar">A</div>
                    <LabeledInput label="Full Name" />
                </div>
            </div>

            <div className="user-profile__section">
                <div className="user-profile__section-info">
                    <div className="title">Danger zone</div>
                    <div className="description">Proceed with caution.</div>
                </div>
                <div className="user-profile__section-content">
                    <Button color="secondary" onClick={handleLogout}>
                        Log out
                    </Button>
                    <Button color="red">Delete account</Button>
                </div>
            </div>
        </div>
    );
};
