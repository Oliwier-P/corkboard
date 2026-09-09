export type User = {
    id: string;
    username: string;
};

export type UserSettings = {
    id: string;
    username: string;
    preferences: UserPreferences;
    role: "user" | "superadmin";
};

export type UserPreferences = {
    task_display: "modal" | "sidebar";
    show_board_tags: boolean;
};

export type AuthContextType = {
    user: UserSettings | null;
    setUser: (user: UserSettings) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    token: string | null;
    setToken: (token: string) => void;
};
