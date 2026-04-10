import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    maxWidth?: string;
}

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-xl' }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

            <div className={`bg-white rounded-[24px] shadow-2xl w-full ${maxWidth} animate-in fade-in zoom-in duration-200 overflow-hidden relative`}>
                
                {title ? (
                    <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                        <button 
                            onClick={onClose} 
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                ) : (

                    <button 
                        onClick={onClose} 
                        className="absolute top-6 right-6 z-10 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    >
                        <X className="w-6 h-6" />
                    </button>
                )}

                <div className="w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}