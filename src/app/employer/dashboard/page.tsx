"use client";

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ExamCard from '@/components/employer/ExamCard';
import { Plus, PackageOpen, Loader2 } from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { axiosInstance } from '@/lib/axios';

const fetchExams = async () => {
    const response = await axiosInstance.get('/exams');
    return response.data;
};

export default function EmployerDashboard() {

    const { data: examsData, isLoading, isError } = useQuery({
        queryKey: ['exams'],
        queryFn: fetchExams
    });

    const examsList = Array.isArray(examsData) ? examsData : Array.isArray(examsData?.data) ? examsData.data : [];

    return (
        <ProtectedRoute allowedRoles={['employer']} loginPath="/employer/login">
        <div className="min-h-screen flex flex-col bg-[#F9FAFB] font-inter">
            <Navbar />
            
            <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <h1 className="text-2xl font-bold text-gray-900">Online Tests</h1>
                    <div className="flex items-center gap-4">
                        {/* Removed Toggle Empty State */}

                        <Link href="/employer/exams/create">
                            <button className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-sm">
                                <Plus className="w-4 h-4" />
                                Create Online Test
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Content Area */}
                {isLoading ? (
                    <div className="min-h-[400px] flex items-center justify-center">
                        <Loader2 className="w-10 h-10 animate-spin text-primary" />
                    </div>
                ) : isError ? (
                    <div className="min-h-[400px] flex items-center justify-center text-red-500 font-medium">
                        Failed to load exams. Please try again later.
                    </div>
                ) : examsList.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-200 min-h-[400px] flex flex-col items-center justify-center p-8 shadow-sm">
                        <div className="bg-gray-50 rounded-full p-6 mb-4">
                            <PackageOpen className="w-16 h-16 text-gray-300" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">No Online Test Available</h2>
                        <p className="text-gray-500 text-sm text-center max-w-md">
                            It looks like you haven't created any tests yet. Click the "Create Online Test" button to get started.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {examsList.map((exam: any) => (
                            <ExamCard 
                                key={exam.id}
                                examId={exam.id}
                                title={exam.title}
                                candidates={exam.totalCandidates || exam.candidates || 0}
                                questionSets={exam.questionSets || 0}
                                slots={exam.totalSlots || exam.slots || 0}
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
