"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ExamCard from '@/components/employer/ExamCard';
import { Plus, Loader2, Search } from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { axiosInstance } from '@/lib/axios';

const fetchExams = async () => {
    const response = await axiosInstance.get('/exams');
    return response.data;
};

export default function EmployerDashboard() {
    const [searchQuery, setSearchQuery] = useState("");

    const { data: examsData, isLoading, isError } = useQuery({
        queryKey: ['exams'],
        queryFn: fetchExams
    });

    const examsList = Array.isArray(examsData) ? examsData : Array.isArray(examsData?.data) ? examsData.data : [];
    const filteredExams = useMemo(() => {
        return examsList.filter((exam: any) =>
            exam.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [examsList, searchQuery]);

    return (
        <ProtectedRoute allowedRoles={['employer']} loginPath="/employer/login">
            <div className="min-h-screen flex flex-col bg-[#F9FAFB] font-inter">
                <Navbar />
                
                <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold md:font-bold text-gray-900">Online Tests</h1>
                        
                        <div className="flex-1 max-w-xl w-full mx-0 md:mx-8">
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Search by exam title"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white border rounded-lg py-2.5 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/20 border-primary transition-all shadow-sm text-sm"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary/10 p-1 rounded-md">
                                    <Search className="w-4 h-4 text-primary" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link href="/employer/exams/create" className="cursor-pointer">
                                <button className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-md active:scale-95 cursor-pointer">
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
                        <div className="bg-white rounded-2xl border border-gray-100 min-h-[460px] flex flex-col items-center justify-center p-10 shadow-sm">
                            <div className="relative w-48 h-48 mb-6">
                                <Image 
                                    src="/emptybox.png" 
                                    alt="No Online Test Available Illustration" 
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h2 className="text-xl font-semibold text-[#1F2937] mb-3">No Online Test Available</h2>
                            <p className="text-[#6B7280] text-sm text-center max-w-md leading-relaxed">
                                Currently, there are no online tests available. Please check back later for updates.
                            </p>
                        </div>
                    ) : filteredExams.length === 0 ? (
                        <div className="min-h-[300px] flex flex-col items-center justify-center text-gray-500 italic">
                            No exams found matching "{searchQuery}"
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                            {filteredExams.map((exam: any) => (
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