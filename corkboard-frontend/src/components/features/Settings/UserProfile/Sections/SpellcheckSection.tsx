import Switch from "@/ui/Switch/Switch.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import { api } from "@/api";

const SpellcheckSection = () => {
    const { user, setUser } = useAuth();

    const handleChangeSpellcheck = (value: boolean) => {
        api.put("user_preferences", { user_preference: { spellcheck: value } }).then((response) => {
            setUser(response.data);
        });
    };

    return <Switch defaultChecked={user?.preferences.spellcheck} onChange={handleChangeSpellcheck} />;
};

export default SpellcheckSection;
