import { useAuth } from "../../../../context/auth/useAuth.ts";
import { api } from "../../../../api/api.ts";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../../hooks/useToast.ts";

const useProfilePopover = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const handleProfile = () => {
        navigate("/settings/user/profile");
    };

    const handleLogout = () => {
        api.delete("/logout").then((response) => {
            localStorage.setItem("token", "");
            navigate("/");
            toast.success(response.data.message);
        });
    };

    return { user, handleProfile, handleLogout };
};

export default useProfilePopover;
