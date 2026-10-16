import Switch from "@/ui/Switch/Switch.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import usersApi from "@/api/users.ts";

const SpellcheckSection = () => {
    const { user, setUser } = useAuth();

    const handleChangeSpellcheck = (value: boolean) => {
        usersApi.updatePreferences({ spellcheck: value }, (response) => {
            setUser(response);
        });
    };

    return <Switch defaultChecked={user?.preferences.spellcheck} onChange={handleChangeSpellcheck} />;
};

export default SpellcheckSection;
