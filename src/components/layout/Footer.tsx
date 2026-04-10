import React from 'react';

import Image from 'next/image';
import { MailIcon, PhoneCall } from 'lucide-react';

export default function Footer() {
	return (
		<footer className="bg-[#130b2c] text-gray-500 py-4 px-6 mt-auto border-t border-gray-200">
			<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
				<div className="flex items-center gap-2 text-sm">
					<p className="text-white text-lg">Powered by</p>
					<Image src="/footer.png" alt="Logo" width={150} height={120} />
				</div>
				<div className="flex items-center gap-6 text-sm text-white">
					<p className="cursor-pointer">Helpline</p>
					<p className="flex items-center gap-2 cursor-pointer"><PhoneCall className='text-md' style={{height: '17px', width: '17px'}} /><span>+88 011020202505</span></p>
					<p className="flex items-center gap-2 cursor-pointer"><MailIcon className='text-md' style={{height: '17px', width: '17px'}} /><span>support@akij.work</span></p>
				</div>
			</div>
		</footer>
	);
}