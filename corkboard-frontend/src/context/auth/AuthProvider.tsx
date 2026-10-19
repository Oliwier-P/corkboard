import { useEffect, useState } from "react";
import type { UserSettings } from "./types.ts";
import { AuthContext } from "./AuthContext.ts";
import usersApi from "@/api/users.ts";
import { useWorkspaceStore } from "@/store/workspaceStore.ts";

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<UserSettings | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [token, setToken] = useState<string | null>(null);
    const setWorkspace = useWorkspaceStore((state) => state.setWorkspace);
    const setCurrentRelease = useWorkspaceStore((state) => state.setCurrentRelease);

    useEffect(() => {
        const localStorageToken = localStorage.getItem("token");
        if (localStorageToken) {
            usersApi.me(
                (response) => {
                    setUser(response.user);
                    setWorkspace(response.workspace);
                    setCurrentRelease(response.release);
                    setToken(localStorageToken);
                    setLoading(false);
                },
                () => {
                    localStorage.removeItem("token");
                    setLoading(false);
                },
            );
        }
    }, [setCurrentRelease, setWorkspace, token]);

    return <AuthContext.Provider value={{ user, setUser, loading, setLoading, token, setToken }}>{children}</AuthContext.Provider>;
};
