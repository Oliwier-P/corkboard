import { useEffect, useState } from "react";
import type { UserSettings } from "./types.ts";
import { AuthContext } from "./AuthContext.ts";
import usersApi from "@/api/users.ts";

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<UserSettings | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const localStorageToken = localStorage.getItem("token");
        if (localStorageToken) {
            usersApi.me(
                (response) => {
                    setUser(response);
                    setToken(localStorageToken);
                    setLoading(false);
                },
                () => {
                    localStorage.removeItem("token");
                    setLoading(false);
                },
            );
        }
    }, [token]);

    return <AuthContext.Provider value={{ user, setUser, loading, setLoading, token, setToken }}>{children}</AuthContext.Provider>;
};
