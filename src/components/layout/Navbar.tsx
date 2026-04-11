"use client";

import React, { useEffect, useState } from 'react';  
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { getUser, clearAuth, User } from '@/lib/auth';

export default function Navbar() {
    const router = useRouter();
    const [user, setUserState] = useState<User | null>(null);

    useEffect(() => {
        const currentUser = getUser();
        setUserState(currentUser);
    }, []);

    const handleLogout = () => {
        clearAuth();
        setUserState(null);
        router.push('/');
    };

	return (
		<nav className="bg-primary-dark text-white px-6 py-4 flex items-center justify-between shadow-md">
			<Image src="/Logo.png" alt="Logo" width={150} height={150} />
			
			<div className="flex items-center gap-4">
				{user && (
					<div className="flex flex-col items-end hidden sm:flex">
						<span className="text-sm font-semibold text-black">{user.name || "User"}</span>
						<span className="text-xs text-black">{user.email}</span>
					</div>
				)}
				<button 
                    onClick={handleLogout} 
                    className="p-2 text-black bg-primary rounded cursor-pointer flex items-center gap-2" 
                    title="Logout"
                >
					<LogOut className="w-5 h-5 text-white" />
                    <span className="text-xs font-medium text-white">Logout</span>
				</button>
			</div>
		</nav>
	);
}
