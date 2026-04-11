import React from 'react';
import Image from 'next/image';
import { MailIcon, PhoneCall } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#130b2c] text-gray-500 py-4 px-2 md:px-6 mt-auto border-t border-gray-800">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                
                <div className="flex items-center gap-3 text-sm order-2 md:order-1">
                    <p className="text-white text-base md:text-lg whitespace-nowrap">Powered by</p>
                    <div className="relative w-[100px] h-[40px] md:w-[150px] md:h-[60px]">
                        <Image 
                            src="/footer.png" 
                            alt="Logo" 
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                <div className="flex items-center sm:flex-row gap-4 sm:gap-6 text-sm text-white order-1 md:order-2">
                    <p className="text-sm md:text-base text-white hidden md:block">Helpline</p>
                    
                    <div className="flex items-center gap-2 cursor-pointer hover:text-gray-300 transition-colors">
                        <PhoneCall size={16} className="shrink-0" />
                        <span className="whitespace-nowrap text-xs md:text-sm">
                            +88011020202505
                        </span>
                    </div>

                    <div className="flex items-center gap-2 cursor-pointer hover:text-gray-300 transition-colors">
                        <MailIcon size={16} className="shrink-0" />
                        <span className="whitespace-nowrap text-xs md:text-sm">
                            support@akij.work
                        </span>
                    </div>
                </div>

            </div>
        </footer>
    );
}