import { useAuth } from "@/context/auth/useAuth.ts";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/useToast.ts";
import sessionApi from "@/api/session.ts";

const useProfilePopover = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const handleProfile = () => {
        navigate("/settings/user/profile");
    };

    const handleLogout = () => {
        sessionApi.logout((response) => {
            localStorage.setItem("token", "");
            navigate("/");
            toast.success(response.message);
        });
    };

    return { user, handleProfile, handleLogout };
};

export default useProfilePopover;
