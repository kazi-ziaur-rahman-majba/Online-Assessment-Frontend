import React from 'react';
import Link from 'next/link';
import { Clock, BookOpen, AlertCircle } from 'lucide-react';

interface CandidateExamCardProps {
    title: string;
    duration: string;
    questions: string;
    negativeMarking: string;
    examId: string;
}

export default function CandidateExamCard({ title, duration, questions, negativeMarking, examId }: CandidateExamCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
            
            <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>Duration</span>
                    </div>
                    <span className="font-bold text-gray-900 text-sm">{duration}</span>
                </div>
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <span>Questions</span>
                    </div>
                    <span className="font-bold text-gray-900 text-sm">{questions}</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                        <AlertCircle className="w-4 h-4 text-primary" />
                        <span>Negative Marking</span>
                    </div>
                    <span className="font-bold text-gray-900 text-sm">{negativeMarking}</span>
                </div>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-100">
                <Link href={`/candidate/exam/${examId}`} className="block w-full cursor-pointer">
                    <button className="w-full py-2 md:py-2.5 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-sm transition-colors cursor-pointer">
                        Start
                    </button>
                </Link>
            </div>
        </div>
    );
}
