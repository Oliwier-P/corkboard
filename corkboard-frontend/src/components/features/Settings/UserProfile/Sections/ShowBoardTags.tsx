import Switch from "@/ui/Switch/Switch.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import { api } from "@/api";

const ShowBoardTags = () => {
    const { user, setUser } = useAuth();
    const handleChangeShowBoardTags = (value: boolean) => {
        api.put("user_preferences", { user_preference: { show_board_tags: value } }).then((response) => {
            setUser(response.data);
        });
    };

    return <Switch defaultChecked={user?.preferences.show_board_tags} onChange={handleChangeShowBoardTags} />;
};

export default ShowBoardTags;
