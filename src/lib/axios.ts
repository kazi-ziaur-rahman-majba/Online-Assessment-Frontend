import axios from "axios";
import { getToken, clearAuth, getRole } from "./auth";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 15000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            const role = getRole();
            clearAuth();
            if (typeof window !== "undefined") {
                if (role === "employer") {
                    window.location.href = "/employer/login";
                } else if (role === "candidate") {
                    window.location.href = "/candidate/login";
                } else {
                    window.location.href = "/employer/login"; // Fallback
                }
            }
        }
        return Promise.reject(error);
    }
);
