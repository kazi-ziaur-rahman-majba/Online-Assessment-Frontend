"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { getUser, clearAuth, User } from '@/lib/auth';

export default function Navbar() {
    const router = useRouter();
    const [user, setUserState] = useState<User | null>(null);

    useEffect(() => {
        setUserState(getUser());
    }, []);

    const handleLogout = () => {
        const role = user?.role;
        clearAuth();
        if (role === 'employer') {
            router.push('/employer/login');
        } else {
            router.push('/candidate/login');
        }
    };
	return (
		<nav className="bg-primary-dark text-white px-6 py-4 flex items-center justify-between shadow-md">
			<Link href="/" className="flex items-center gap-2 cursor-pointer">
				{/* Placeholder for Logo */}
				<div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center font-bold text-white cursor-pointer">AR</div>
				<span className="text-xl font-bold tracking-wide cursor-pointer">Akij Resource</span>
			</Link>
			
			<div className="flex items-center gap-4">
				{user && (
					<div className="flex flex-col items-end hidden sm:flex">
						<span className="text-sm font-semibold">{user.name || "User"}</span>
						<span className="text-xs text-gray-300">{user.email}</span>
					</div>
				)}
				<button onClick={handleLogout} className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer" title="Logout">
					<LogOut className="w-5 h-5" />
				</button>
			</div>
		</nav>
	);
}
