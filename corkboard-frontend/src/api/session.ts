import { api } from "@/api";
import type { LoginResponse, SignupResponse, LogoutResponse } from "@/types/SessionTypes.ts";

const sessionApi = {
    login: (data: { username: string; password: string }, onSuccess: (response: LoginResponse) => void, onError?: (error: unknown) => void) => {
        api.post<LoginResponse>("/login", { user: data })
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    signup: (
        data: { username: string; password: string; confirmPassword: string },
        onSuccess: (response: SignupResponse) => void,
        onError?: (error: unknown) => void,
    ) => {
        api.post<SignupResponse>(`/signup`, { user: data })
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
    logout: (onSuccess: (response: LogoutResponse) => void, onError?: (error: unknown) => void) => {
        api.delete<LogoutResponse>(`/logout`)
            .then((response) => onSuccess(response.data))
            .catch(onError);
    },
};

export default sessionApi;
