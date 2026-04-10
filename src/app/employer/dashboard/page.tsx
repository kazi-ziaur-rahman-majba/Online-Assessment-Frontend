"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ExamCard from '@/components/employer/ExamCard';
import { Plus, PackageOpen } from 'lucide-react';

export default function EmployerDashboard() {
    const [isEmpty, setIsEmpty] = useState(false);

    const mockupExams = [
        {
            id: '1',
            title: 'Psychometric Test for Management Trainee Officer',
            candidates: 120,
            questionSets: 3,
            slots: 2,
        },
        {
            id: '2',
            title: 'Aptitude Test for Software Engineer',
            candidates: 45,
            questionSets: 2,
            slots: 4,
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#F9FAFB] font-inter">
            <Navbar />
            
            <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <h1 className="text-2xl font-bold text-gray-900">Online Tests</h1>
                    <div className="flex items-center gap-4">
                        {/* Dev Toggle */}
                        <label className="flex items-center cursor-pointer gap-2 bg-gray-200 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700">
                            <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={isEmpty}
                                onChange={() => setIsEmpty(!isEmpty)}
                            />
                            <div className="w-8 h-4 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary relative"></div>
                            Toggle Empty State
                        </label>

                        <Link href="/employer/exams/create">
                            <button className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-sm">
                                <Plus className="w-4 h-4" />
                                Create Online Test
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Content Area */}
                {isEmpty ? (
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
                        {mockupExams.map(exam => (
                            <ExamCard 
                                key={exam.id}
                                examId={exam.id}
                                title={exam.title}
                                candidates={exam.candidates}
                                questionSets={exam.questionSets}
                                slots={exam.slots}
                            />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
