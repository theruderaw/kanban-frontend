import { api } from "./axios";

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    identifier: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    token: string;
    userId: string;
}

export async function register(
    data: RegisterRequest
): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
        "/auth/register",
        data
    );

    return response.data;
}

export async function login(
    data: LoginRequest
): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
        "/auth/login",
        data
    );

    return response.data;
}