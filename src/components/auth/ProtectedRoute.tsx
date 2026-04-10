"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, getRole } from "@/lib/auth";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: string[];
    loginPath: string;
}

export default function ProtectedRoute({ children, allowedRoles, loginPath }: ProtectedRouteProps) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const token = getToken();
        const role = getRole();

        if (!token) {
            router.replace(loginPath);
        } else if (role && !allowedRoles.includes(role)) {
            // Role doesn't match the allowed roles for this page. 
            // Redirect them to their own dashboard or login.
            if (role === "employer") {
                router.replace("/employer/dashboard");
            } else if (role === "candidate") {
                router.replace("/candidate/dashboard");
            } else {
                router.replace(loginPath);
            }
        } else {
            setIsAuthorized(true);
        }
    }, [router, allowedRoles, loginPath]);

    if (!isAuthorized) {
        return <div className="h-screen w-full flex items-center justify-center text-gray-500">Loading...</div>;
    }

    return <>{children}</>;
}
