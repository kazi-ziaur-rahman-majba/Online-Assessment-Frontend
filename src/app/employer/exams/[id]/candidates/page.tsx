"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { formatDateTime } from '@/utils/date-utils';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { axiosInstance } from '@/lib/axios';

export default function CandidatesPage() {
    const params = useParams();
    const id = params.id as string;

    const { data: candidatesData, isLoading, isError } = useQuery({
        queryKey: ['candidates', id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/exams/${id}/candidates`);
            return res.data;
        },
        enabled: !!id
    });

    const submissions = Array.isArray(candidatesData) 
        ? candidatesData 
        : Array.isArray(candidatesData?.data) 
            ? candidatesData.data 
            : [];

    return (
        <ProtectedRoute allowedRoles={['employer']} loginPath="/employer/login">
        <div className="min-h-screen flex flex-col bg-[#F9FAFB] font-inter">
            <Navbar />
            
            <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="flex items-start gap-4 mb-8">
                    <Link href="/employer/dashboard" className="mt-1 p-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Exam Submissions</h1>
                        <p className="text-gray-500 mt-1 text-sm">View all candidates who participated in this online test.</p>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {isLoading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : isError ? (
                        <div className="text-center py-20 text-red-500 font-medium p-6">
                            <p>Failed to load candidates. Please try again later.</p>
                        </div>
                    ) : submissions.length === 0 ? (
                        <div className="text-center py-20 text-gray-500 font-medium">No submissions yet</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-600">
                                <thead className="bg-gray-50 text-gray-700 text-xs uppercase font-semibold border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Email</th>
                                        <th className="px-6 py-4">Submitted At</th>
                                        <th className="px-6 py-4">Auto Submit</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {submissions.map((item: any) => {
                                        // User stated name/email come from the candidate object inside the item
                                        const candidateInfo = item.candidate || {};
                                        return (
                                            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-gray-900">
                                                    {candidateInfo.name || item.name || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {candidateInfo.email || item.email || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.submittedAt ? formatDateTime(item.submittedAt) : '-'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
                                                        ${item.isAutoSubmit || item.autoSubmit 
                                                            ? 'bg-red-50 text-red-600 border border-red-100' 
                                                            : 'bg-green-50 text-green-600 border border-green-100'}`}>
                                                        {item.isAutoSubmit || item.autoSubmit ? 'Yes' : 'No'}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
        </ProtectedRoute>
    );
}
