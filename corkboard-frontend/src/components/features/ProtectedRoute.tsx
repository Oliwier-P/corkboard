import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth/useAuth.ts";
import { Navbar } from "./Navbar/Navbar.tsx";
import Loading from "../ui/Loading/Loading.tsx";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { loading } = useAuth();
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    if (loading) return <Loading overlay={true} />;

    return (
        <>
            <Navbar />
            {children}
        </>
    );
};
