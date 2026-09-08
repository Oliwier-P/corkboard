import "./ProfileSection.scss";
import { LabeledInput } from "@/ui/LabeledInput/LabeledInput.tsx";
import { api } from "@/api";
import { useState } from "react";
import { useAuth } from "@/context/auth/useAuth.ts";

const ProfileSection = () => {
    const { user, setUser } = useAuth();
    const [username, setUsername] = useState<string>(user ? user.username : "");

    const handleChangeUsername = (value: string) => {
        if (!user || user.username === value) return;

        api.put(`/users/${user.id}`, { user: { username: value } }).then((response) => {
            setUser(response.data);
        });
    };

    return (
        <>
            <div className="avatar-text">Avatar</div>
            <div className="avatar">A</div>
            <LabeledInput
                label="Full Name"
                value={username}
                autoFocus={false}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={(e) => handleChangeUsername(e.target.value)}
            />
        </>
    );
};

export default ProfileSection;
