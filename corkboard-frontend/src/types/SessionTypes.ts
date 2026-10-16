import type { UserSettings } from "@/context/auth/types.ts";

export type LoginResponse = {
    message: string;
    token: string;
    user: UserSettings;
    workspace_id: string;
};

export type SignupResponse = {
    message: string;
    token: string;
};

export type LogoutResponse = {
    message: string;
};
