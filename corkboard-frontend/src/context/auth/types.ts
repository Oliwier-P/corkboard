export type User = {
    avatar_url: string | undefined;
    uid: string;
    username: string;
}

export type AuthContextType = {
    user: User | null;
    setUser: (user: User) => void;
    loading: boolean;
}
