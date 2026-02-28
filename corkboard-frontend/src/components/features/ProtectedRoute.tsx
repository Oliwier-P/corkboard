import {Navigate} from "react-router-dom";
import {useAuth} from "../../context/auth/useAuth.ts";

type ProtectedRouteProps = {
    children: React.ReactNode;
}

export const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const {loading} = useAuth();
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace/>
    }

    if (loading) return null

    return (
        <>
            {children}
        </>
    )
}
