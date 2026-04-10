import React from 'react';
import Link from 'next/link';
import { LogOut } from 'lucide-react';

export default function Navbar() {
	return (
		<nav className="bg-primary-dark text-white px-6 py-4 flex items-center justify-between shadow-md">
			<Link href="/" className="flex items-center gap-2">
				{/* Placeholder for Logo */}
				<div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center font-bold text-white">AR</div>
				<span className="text-xl font-bold tracking-wide">Akij Resource</span>
			</Link>
			
			<div className="flex items-center gap-4">
				<div className="flex flex-col items-end hidden sm:flex">
					<span className="text-sm font-semibold">John Doe</span>
					<span className="text-xs text-gray-300">johndoe@example.com</span>
				</div>
				<button className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Logout">
					<LogOut className="w-5 h-5" />
				</button>
			</div>
		</nav>
	);
}
