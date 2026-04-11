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

            <div className={`bg-white rounded-xl border border-gray-200 shadow-sm w-full ${maxWidth} animate-in fade-in zoom-in duration-200 overflow-hidden relative`}>
                
                {title ? (
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-base font-bold text-gray-900">{title}</h2>
                        <button 
                            onClick={onClose} 
                            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (

                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 z-10 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}

                <div className="w-full p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}