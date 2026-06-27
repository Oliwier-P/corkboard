import "./UserProfile.scss";
import { Button } from "../../../ui/Button/Button.tsx";
import { LabeledInput } from "../../../ui/LabeledInput/LabeledInput.tsx";
import { api } from "../../../../api/api.ts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/auth/useAuth.ts";
import { useState } from "react";

export const UserProfile = () => {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const [username, setUsername] = useState<string>(user ? user.username : "");

    const handleLogout = () => {
        api.delete("/logout");
        localStorage.setItem("token", "");
        navigate("/");
    };

    const handleChangeUsername = (value: string) => {
        if (!user || user.username === value) return;

        api.put(`users/${user.id}`, {user: {username: value}}).then((response) => {
            setUser(response.data)
        })
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
                    <LabeledInput label="Full Name" value={username} onChange={(e) => setUsername(e.target.value)} onBlur={(e) => handleChangeUsername(e.target.value)} />
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
