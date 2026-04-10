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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className={`bg-white rounded-xl shadow-xl w-full ${maxWidth} animate-in fade-in zoom-in duration-200 overflow-hidden`}>
                {title && (
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
                        <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}
                {!title && (
                    <button onClick={onClose} className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                )}
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
