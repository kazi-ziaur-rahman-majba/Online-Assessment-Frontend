import React from 'react';
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="bg-[#F9FAFB] text-gray-500 py-6 px-6 mt-auto border-t border-gray-200">
			<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
				<div className="flex items-center gap-2 text-sm">
					<span>Powered by</span>
					<div className="flex items-center gap-1 font-bold text-gray-700">
						<div className="w-5 h-5 bg-primary rounded-sm flex items-center justify-center text-[10px] text-white">AR</div>
						Akij Resource
					</div>
				</div>
				<div className="flex items-center gap-6 text-sm">
					<Link href="#" className="hover:text-primary transition-colors cursor-pointer">Help</Link>
					<Link href="#" className="hover:text-primary transition-colors cursor-pointer">Privacy</Link>
					<Link href="#" className="hover:text-primary transition-colors cursor-pointer">Terms</Link>
				</div>
			</div>
		</footer>
	);
}
