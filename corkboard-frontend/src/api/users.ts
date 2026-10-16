import { api } from "@/api";
import type { UserPreferences, UserSettings } from "@/context/auth/types.ts";

const usersApi = {
    getAll: (onSuccess: (response: UserSettings[]) => void, onError?: (error: unknown) => void) => {
        api.get<UserSettings[]>(`/users`)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    get: (userId: string, onSuccess: (response: UserSettings) => void, onError?: (error: unknown) => void) => {
        api.get<UserSettings>(`/users/${userId}`)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    update: (
        userId: string,
        data: { username?: string; password?: string; password_confirmation?: string },
        onSuccess: (response: UserSettings) => void,
        onError?: (error: unknown) => void,
    ) => {
        api.put<UserSettings>(`/users/${userId}`, data)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    delete: (userId: string, onSuccess: () => void, onError?: (error: unknown) => void) => {
        api.delete(`/users/${userId}`).then(onSuccess).catch(onError);
    },
    me: (onSuccess: (response: UserSettings) => void, onError?: (error: unknown) => void) => {
        api.get<UserSettings>(`/users/me`)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    updatePreferences: (data: Partial<UserPreferences>, onSuccess: (response: UserSettings) => void, onError?: (error: unknown) => void) => {
        api.put<UserSettings>(`/user_preferences`, data)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
};

export default usersApi;
