export interface User {
    id: string | number;
    name: string;
    email: string;
    role: "employer" | "candidate";
    [key: string]: any;
}

export const getToken = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("access_token");
};

export const setToken = (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem("access_token", token);
};

export const getUser = (): User | null => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    try {
        return JSON.parse(userStr);
    } catch {
        return null;
    }
};

export const setUser = (user: User): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem("user", JSON.stringify(user));
};

export const clearAuth = (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
};

export const getRole = (): string | null => {
    const user = getUser();
    return user ? user.role : null;
};
