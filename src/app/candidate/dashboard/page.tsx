"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CandidateExamCard from '@/components/candidate/ExamCard';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { axiosInstance } from '@/lib/axios';

export default function CandidateDashboard() {
    const { data: examsData, isLoading, isError } = useQuery({
        queryKey: ['candidate-exams'],
        queryFn: async () => {
            const res = await axiosInstance.get('/candidate/exams?all=true');
            return res.data;
        }
    });

    const examsList = Array.isArray(examsData) ? examsData : Array.isArray(examsData?.data) ? examsData.data : [];

    return (
        <ProtectedRoute allowedRoles={['candidate']} loginPath="/candidate/login">
        <div className="min-h-screen flex flex-col bg-[#F9FAFB] font-inter">
            <Navbar />
            
            <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Online Tests</h1>
                    <p className="text-gray-500 mt-1 text-sm">Available tests for you to complete.</p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : isError ? (
                    <div className="text-center py-20 text-red-500 font-medium">Failed to load exams</div>
                ) : examsList.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 font-medium">No exams available</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {examsList.map((exam: any) => (
                            <CandidateExamCard 
                                key={exam.id}
                                examId={exam.id}
                                title={exam.title}
                                duration={`${exam.duration || 60} min`}
                                questions={`${exam.questionCount || 0} Questions`}
                                negativeMarking={exam.negativeMarking ? 'Yes' : 'No'}
                            />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
        </ProtectedRoute>
    );
}
