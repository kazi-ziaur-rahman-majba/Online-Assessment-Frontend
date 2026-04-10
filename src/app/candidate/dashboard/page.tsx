"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CandidateExamCard from '@/components/candidate/ExamCard';

export default function CandidateDashboard() {
    const mockupExams = [
        {
            id: '1',
            title: 'Psychometric Test for Management Trainee Officer',
            duration: '60 min',
            questions: '20 Questions',
            negativeMarking: 'No',
        },
        {
            id: '2',
            title: 'Aptitude Test for Software Engineer',
            duration: '45 min',
            questions: '30 Questions',
            negativeMarking: 'Yes (0.25)',
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#F9FAFB] font-inter">
            <Navbar />
            
            <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Online Tests</h1>
                    <p className="text-gray-500 mt-1 text-sm">Available tests for you to complete.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockupExams.map(exam => (
                        <CandidateExamCard 
                            key={exam.id}
                            examId={exam.id}
                            title={exam.title}
                            duration={exam.duration}
                            questions={exam.questions}
                            negativeMarking={exam.negativeMarking}
                        />
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
