import React from 'react';
import Link from 'next/link';
import { Users, BookOpen, Clock } from 'lucide-react';

interface ExamCardProps {
    title: string;
    candidates: number;
    questionSets: number;
    slots: number;
    examId: string;
}

export default function ExamCard({ title, candidates, questionSets, slots, examId }: ExamCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
            
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
                <Link href={`/employer/exams/${examId}/edit`} className="cursor-pointer">
                    <button className="px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                        Edit
                    </button>
                </Link>
                <Link href={`/employer/exams/${examId}/candidates`} className="cursor-pointer">
                    <button className="px-4 py-2 text-sm font-medium border border-primary text-primary rounded-md hover:bg-primary/5 transition-colors cursor-pointer">
                        View Candidates
                    </button>
                </Link>
            </div>
        </div>
    );
}
