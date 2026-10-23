import Switch from "@/ui/Switch/Switch.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import usersApi from "@/api/users.ts";

const ShowBoardTags = () => {
    const { user, setUser } = useAuth();
    const handleChangeShowBoardTags = (value: boolean) => {
        usersApi.updatePreferences({ show_board_tags: value }, (response) => {
            setUser(response);
        });
    };

    return <Switch defaultChecked={user?.preferences.show_board_tags} onChange={handleChangeShowBoardTags} />;
};

export default ShowBoardTags;
