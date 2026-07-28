import { type SetStateAction, useEffect, useState } from "react";
import type { User } from "./types.ts";
import { api } from "../../api/api.ts";
import { AuthContext } from "./AuthContext.ts";

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const localStorageToken = localStorage.getItem("token");
        if (localStorageToken) {
            api.get("/users/me")
                .then((res: { data: SetStateAction<User | null> }) => {
                    setUser(res.data);
                    setToken(localStorageToken);
                })
                .catch(() => localStorage.removeItem("token"))
                .finally(() => setLoading(false));
        }
    }, [token]);

    return <AuthContext.Provider value={{ user, setUser, loading, setLoading, token, setToken }}>{children}</AuthContext.Provider>;
};
