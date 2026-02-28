export type User = {
    id: string;
    username: string;
}

export type AuthContextType = {
    user: User | null;
    setUser: (user: User) => void;
    loading: boolean;
}
