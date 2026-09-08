import { Button } from "@/ui/Button/Button.tsx";
import { api } from "@/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/useToast.ts";

const DangerZoneSection = () => {
    const navigate = useNavigate();
    const toast = useToast();

    const handleLogout = () => {
        api.delete("/logout").then((response) => {
            localStorage.setItem("token", "");
            navigate("/");
            toast.success(response.data.message);
        });
        localStorage.setItem("token", "");
        navigate("/");
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
