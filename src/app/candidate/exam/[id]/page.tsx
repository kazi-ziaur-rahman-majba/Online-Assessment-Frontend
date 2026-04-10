"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Modal from '@/components/ui/Modal';
import TextEditor from '@/components/form/TextEditor';

export default function ExamSessionPage({ params }: { params: { id: string } }) {
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isTimeoutModalOpen, setIsTimeoutModalOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(1511); // 25:11 in seconds

    // Simulating timer (just for effect)
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const questions = [
        {
            id: 1,
            title: "Which of the following indicators is used to measure overall volatility?",
            type: "Radio",
            options: ["Bollinger Bands", "RSI", "MACD", "Moving Average"]
        },
        {
            id: 2,
            title: "Which of the following are programming languages? (Select all that apply)",
            type: "Checkbox",
            options: ["Python", "HTML", "C++", "CSS"]
        },
        {
            id: 3,
            title: "Briefly explain the role of a garbage collector in memory management.",
            type: "Text",
        }
    ];

    const isLastQuestion = currentQuestionIdx === questions.length - 1;
    const currentQuestion = questions[currentQuestionIdx];

    const handleNext = () => {
        if (isLastQuestion) {
            setIsSuccessModalOpen(true);
        } else {
            setCurrentQuestionIdx(prev => prev + 1);
        }
    };

    // To simulate timeout for testing
    const triggerTimeout = () => {
        setIsTimeoutModalOpen(true);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F9FAFB] font-inter">
            <Navbar />
            
            {/* Top Bar Navigation */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10 px-6 py-4 shadow-sm">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="text-lg font-bold text-gray-800">
                        Question <span className="text-primary">{String(currentQuestionIdx + 1).padStart(2, '0')}</span>/{String(questions.length).padStart(2, '0')}
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button onClick={triggerTimeout} className="text-xs text-gray-400 hover:text-gray-600 underline hidden sm:block">Simulate Timeout</button>
                        <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg border border-red-200 font-bold tracking-wider">
                            <Clock className="w-5 h-5" />
                            {formatTime(timeLeft)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-[700px] mx-auto px-6 py-12">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-300 relative overflow-hidden">
                    
                    {/* Decorative element */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary-light"></div>

                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
                        <span className="text-primary mr-2">Q.</span>
                        {currentQuestion.title}
                    </h2>

                    <div className="space-y-4 mb-10">
                        {currentQuestion.type === "Radio" && currentQuestion.options?.map((opt, i) => (
                            <label key={i} className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all">
                                <input type="radio" name={`q-${currentQuestion.id}`} className="w-5 h-5 text-primary border-gray-300 focus:ring-primary" />
                                <span className="text-gray-700 text-lg">{opt}</span>
                            </label>
                        ))}

                        {currentQuestion.type === "Checkbox" && currentQuestion.options?.map((opt, i) => (
                            <label key={i} className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all">
                                <input type="checkbox" className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary" />
                                <span className="text-gray-700 text-lg">{opt}</span>
                            </label>
                        ))}

                        {currentQuestion.type === "Text" && (
                            <TextEditor 
                                value=""
                                onChange={(val) => {console.log(val)}}
                            />
                        )}
                    </div>

                    <div className="flex justify-end pt-6 border-t border-gray-100">
                        <button 
                            onClick={handleNext} 
                            className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-all shadow-md active:scale-[0.98] text-lg"
                        >
                            {isLastQuestion ? "Submit Exam" : "Save & Next"}
                        </button>
                    </div>
                </div>
            </main>

            {/* Success Modal */}
            <Modal isOpen={isSuccessModalOpen} onClose={() => {}} maxWidth="max-w-md">
                <div className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Test Completed</h2>
                    <p className="text-gray-500 mb-8 max-w-sm">
                        You have successfully submitted your exam. Your responses have been saved.
                    </p>
                    <Link href="/candidate/dashboard" className="w-full">
                        <button className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors shadow-sm">
                            Back to Dashboard
                        </button>
                    </Link>
                </div>
            </Modal>

            {/* Timeout Modal */}
            <Modal isOpen={isTimeoutModalOpen} onClose={() => {}} maxWidth="max-w-md">
                <div className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6">
                        <AlertTriangle className="w-10 h-10 text-orange-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Timeout!</h2>
                    <p className="text-gray-500 mb-8 max-w-sm">
                        Unfortunately you ran out of time. Your responses up to this point have been submitted.
                    </p>
                    <Link href="/candidate/dashboard" className="w-full">
                        <button className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors shadow-sm">
                            Give Feedback
                        </button>
                    </Link>
                </div>
            </Modal>
        </div>
    );
}
