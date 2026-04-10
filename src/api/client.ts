import { showToast } from "@/utils/toast-utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface ApiResponse<T> {
    status: string;
    statusCode: number;
    message: string;
    data: T;
}

type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

interface RequestConfig<TBody = unknown> {
    url: string;
    method?: HttpMethod;
    body?: TBody;
    isBlob?: boolean;
    headers?: HeadersInit;
}

function isFormData(value: unknown): value is FormData {
    return typeof FormData !== "undefined" && value instanceof FormData;
}

export async function apiClient<TResponse, TBody = unknown>({
    url,
    method = "GET",
    body,
    isBlob = false,
    headers
}: RequestConfig<TBody>): Promise<ApiResponse<TResponse>> {
    const isBodyFormData = isFormData(body);
    const response = await fetch(`${API_BASE_URL}${url}`, {
        method,
        credentials: "include", // HTTP-only cookie auth
        headers: {
            ...(isBodyFormData ? {} : { "Content-Type": "application/json" }),
            ...headers
        },
        body: body
            ? isBodyFormData
                ? (body as BodyInit)
                : JSON.stringify(body)
            : undefined
    });

    if (response.status === 401) {
        showToast("error", "Session expired. Please login again.");
        window.location.href = "/login";
        throw new Error("Unauthorized");
    }

    if (!response.ok) {
        let message = "Something went wrong";
        try {
            const errorData = await response.json();
            message = errorData?.message || message;
        } catch { }
        showToast("error", message);
        throw new Error(message);
    }

    if (isBlob) {
        const blob = await response.blob();
        return {
            status: "success",
            statusCode: response.status,
            message: "File downloaded",
            data: blob as unknown as TResponse
        };
    }

    return response.json();
}