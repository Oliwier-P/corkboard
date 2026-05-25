export type User = {
    id: number;
    username: string;
}

export type AuthContextType = {
    user: User | null;
    setUser: (user: User) => void;
    loading: boolean;
    token: string | null;
}
