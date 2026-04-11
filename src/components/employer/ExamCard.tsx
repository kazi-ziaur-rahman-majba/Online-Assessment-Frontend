import React, { useState } from 'react';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { Users, BookOpen, Clock, PencilLine, Trash2 } from 'lucide-react';
import { axiosInstance } from '@/lib/axios';
import { showToast } from '@/utils/toast-utils';
import DeleteModal from '../modal/DeleteModal';

interface ExamCardProps {
    title: string;
    candidates: number;
    questionSets: number;
    slots: number;
    examId: string;
}

export default function ExamCard({ title, candidates, questionSets, slots, examId }: ExamCardProps) {
    const queryClient = useQueryClient();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/exams/${examId}`);
            queryClient.invalidateQueries({ queryKey: ['exams'] });
            showToast('success', 'Exam deleted successfully');
            setIsDeleteModalOpen(false);
        } catch (error: any) {
            showToast('error', error.response?.data?.message || 'Failed to delete exam');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <div className="flex gap-1">
                    <Link href={`/employer/exams/${examId}/edit`} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors cursor-pointer">
                        <PencilLine className="w-4 h-4" />
                    </Link>
                    <button 
                        onClick={() => setIsDeleteModalOpen(true)} 
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
            
            <div className="flex gap-6 mb-6 flex-wrap">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
                        <Users className="w-4 h-4 text-primary" />
                        <span>Candidates</span>
                    </div>
                    <span className="font-bold text-gray-900 pl-5.5">{candidates}</span>
                </div>
                
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <span>Question Sets</span>
                    </div>
                    <span className="font-bold text-gray-900 pl-5.5">{questionSets}</span>
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>Exam Slots</span>
                    </div>
                    <span className="font-bold text-gray-900 pl-5.5">{slots}</span>
                </div>
            </div>

            <div className="mt-auto flex justify-end gap-3">
                <Link href={`/employer/exams/${examId}/candidates`} className="cursor-pointer">
                    <button className="px-4 py-2 text-sm font-medium border border-primary text-primary rounded-md hover:bg-primary/5 transition-colors cursor-pointer">
                        View Candidates
                    </button>
                </Link>
            </div>

            <DeleteModal
                isOpen={isDeleteModalOpen}
                title="Delete Exam"
                message={`Are you sure you want to delete "${title}"? This action cannot be undone.`}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={handleDelete}
            />
        </div>
    );
}
