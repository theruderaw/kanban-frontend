import axios from "axios";

const TOKEN_KEY = "auth_token";

let token: string | null = localStorage.getItem(TOKEN_KEY);

export function setToken(jwt: string | null): void {
    token = jwt;

    if (jwt) {
        localStorage.setItem(TOKEN_KEY, jwt);
        // 👈 NEW USER LOGIN: Clear any old org selections so the modal pops up
        localStorage.removeItem("orgSlug"); 
    } else {
        localStorage.removeItem(TOKEN_KEY);
    }
}

export function getToken(): string | null {
    return token;
}
export function clearToken(): void {
    setToken(null);
    localStorage.removeItem("orgSlug"); // 👈 Wipe the org slug on logout
}

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});