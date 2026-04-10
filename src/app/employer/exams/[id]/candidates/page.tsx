"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { formatDateTime } from '@/utils/date-utils';

export default function CandidatesPage({ params }: { params: { id: string } }) {
    const candidates = [
        { id: 1, name: 'John Smith', email: 'john.smith@example.com', submittedAt: new Date(2026, 9, 12, 10, 30), autoSubmit: false },
        { id: 2, name: 'Sarah Connor', email: 'sarah.c@example.com', submittedAt: new Date(2026, 9, 12, 11, 15), autoSubmit: true },
        { id: 3, name: 'Michael Doe', email: 'm.doe@example.com', submittedAt: new Date(2026, 9, 12, 9, 45), autoSubmit: false },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#F9FAFB] font-inter">
            <Navbar />
            
            <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="flex items-start gap-4 mb-8">
                    <Link href="/employer/dashboard" className="mt-1 p-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Manage Online Test</h1>
                        <p className="text-gray-500 mt-1">Psychometric Test for Management Trainee Officer</p>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                                {candidates.map((candidate) => (
                                    <tr key={candidate.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{candidate.name}</td>
                                        <td className="px-6 py-4">{candidate.email}</td>
                                        <td className="px-6 py-4">{formatDateTime(candidate.submittedAt)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
                                                ${candidate.autoSubmit 
                                                    ? 'bg-red-50 text-red-600 border border-red-100' 
                                                    : 'bg-green-50 text-green-600 border border-green-100'}`}>
                                                {candidate.autoSubmit ? 'Yes' : 'No'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
