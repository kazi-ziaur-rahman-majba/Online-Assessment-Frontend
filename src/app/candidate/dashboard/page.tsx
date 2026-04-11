"use client";

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CandidateExamCard from '@/components/candidate/ExamCard';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Search } from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { axiosInstance } from '@/lib/axios';

export default function CandidateDashboard() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    
    const { data: examsData, isLoading, isError } = useQuery({
        queryKey: ['candidate-exams'],
        queryFn: async () => {
            const res = await axiosInstance.get('/candidate/exams?all=true');
            return res.data;
        }
    });

    const examsList = Array.isArray(examsData) ? examsData : Array.isArray(examsData?.data) ? examsData.data : [];
    
    const filteredExams = useMemo(() => {
        return examsList.filter((exam: any) =>
            exam.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [examsList, searchQuery]);

    const updateSearch = (value: string) => {
        const url = new URL(window.location.href);
        if (value) {
            url.searchParams.set('search', value);
        } else {
            url.searchParams.delete('search');
        }
        window.history.pushState({}, '', url.toString());
        window.dispatchEvent(new Event('popstate'));
    };

    return (
        <ProtectedRoute allowedRoles={['candidate']} loginPath="/candidate/login">
        <div className="min-h-screen flex flex-col bg-[#F9FAFB] font-inter">
            <Navbar />
            
            <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Online Tests</h1>
                        <p className="text-gray-500 mt-1 text-sm">Available tests for you to complete.</p>
                    </div>

                    <div className="flex-1 max-w-xl w-full mx-0 md:ml-8">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search by exam title"
                                defaultValue={searchQuery}
                                onChange={(e) => updateSearch(e.target.value)}
                                className="w-full bg-white border rounded-lg py-2.5 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/20 border-primary transition-all shadow-sm text-sm"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary/10 p-1 rounded-md">
                                <Search className="w-4 h-4 text-primary" />
                            </div>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : isError ? (
                    <div className="text-center py-20 text-red-500 font-medium">Failed to load exams</div>
                ) : filteredExams.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 font-medium">
                        {searchQuery ? `No exams found matching "${searchQuery}"` : 'No exams available'}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredExams.map((exam: any) => {
                            const qCount = exam.totalQuestions ?? exam.questionCount ?? exam.questions ?? 0;
                            return (
                                <CandidateExamCard 
                                    key={exam.id}
                                    examId={exam.id}
                                    title={exam.title}
                                    duration={exam.duration ? `${exam.duration} min` : 'N/A'}
                                    questions={qCount > 0 ? `${qCount} Questions` : 'N/A'}
                                    negativeMarking={exam.negativeMarking ? 'Yes' : 'No'}
                                />
                            );
                        })}
                    </div>
                )}
            </main>

            <Footer />
        </div>
        </ProtectedRoute>
    );
}
