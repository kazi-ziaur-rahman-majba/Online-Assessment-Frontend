import { z } from "zod";

export const LoginFormSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Invalid email"),

    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters")
});