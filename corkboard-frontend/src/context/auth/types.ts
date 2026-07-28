export type User = {
    id: number;
    username: string;
};

export type AuthContextType = {
    user: User | null;
    setUser: (user: User) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    token: string | null;
    setToken: (token: string) => void;
};
