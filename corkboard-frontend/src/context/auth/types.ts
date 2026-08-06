export type User = {
    id: number;
    username: string;
};

export type UserSettings = {
    id: number;
    username: string;
    preferences: UserPreferences;
    role: "user" | "superadmin";
};

export type UserPreferences = {
    task_display: "modal" | "sidebar";
};

export type AuthContextType = {
    user: UserSettings | null;
    setUser: (user: UserSettings) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    token: string | null;
    setToken: (token: string) => void;
};
