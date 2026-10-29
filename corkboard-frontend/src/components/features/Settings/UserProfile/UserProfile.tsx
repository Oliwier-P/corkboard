import "./UserProfile.scss";
import ProfileSection from "./Sections/ProfileSection.tsx";
import DangerZoneSection from "@/features/Settings/UserProfile/Sections/DangerZoneSection.tsx";
import TaskDisplaySection from "@/features/Settings/UserProfile/Sections/TaskDisplaySection.tsx";
import SettingsSection from "@/features/Settings/SettingsSection.tsx";
import ShowBoardTags from "@/features/Settings/UserProfile/Sections/ShowBoardTags.tsx";
import SpellcheckSection from "@/features/Settings/UserProfile/Sections/SpellcheckSection.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import Loading from "@/ui/Loading/Loading.tsx";

const UserProfile = () => {
    const { loading } = useAuth();

    if (loading) return <Loading />;

    return (
        <div className="user-profile">
            <span className="title">My settings</span>
            <SettingsSection>
                <SettingsSection.Info title="Profile" description="Your personal information and account security settings." />
                <SettingsSection.Content className="profile" children={<ProfileSection />} />
            </SettingsSection>

            <SettingsSection>
                <SettingsSection.Info title="Preferences" description="Choose how task details should open — as a modal window or a side panel." />
                <SettingsSection.Content className="task-display" children={<TaskDisplaySection />} />

                <SettingsSection.Info description="Show tags on board?" />
                <SettingsSection.Content children={<ShowBoardTags />} />

                <SettingsSection.Info description="Enable documents and inputs spellcheck" />
                <SettingsSection.Content children={<SpellcheckSection />} />
            </SettingsSection>

            <SettingsSection>
                <SettingsSection.Info title="Danger zone" description="Proceed with caution." />
                <SettingsSection.Content children={<DangerZoneSection />} />
            </SettingsSection>
        </div>
    );
};

export default UserProfile;
