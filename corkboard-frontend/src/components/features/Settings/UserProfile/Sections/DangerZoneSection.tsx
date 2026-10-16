import { Button } from "@/ui/Button/Button.tsx";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/useToast.ts";
import sessionApi from "@/api/session.ts";

const DangerZoneSection = () => {
    const navigate = useNavigate();
    const toast = useToast();

    const handleLogout = () => {
        sessionApi.logout((response) => {
            localStorage.setItem("token", "");
            navigate("/");
            toast.success(response.message);
        });
    };

    return (
        <>
            <Button color="secondary" onClick={handleLogout}>
                Log out
            </Button>
            <Button color="red">Delete account</Button>
        </>
    );
};

export default DangerZoneSection;
