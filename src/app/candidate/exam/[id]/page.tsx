"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Clock, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import Navbar from '@/components/layout/Navbar';
import Modal from '@/components/ui/Modal';
import TextEditor from '@/components/form/TextEditor';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { axiosInstance } from '@/lib/axios';
import { showToast } from '@/utils/toast-utils';

export default function ExamSessionPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isTimeoutModalOpen, setIsTimeoutModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [answers, setAnswers] = useState<any[]>([]);
    
    // Timer ref to prevent concurrent interval issues
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const { data: fetchRes, isLoading, isError } = useQuery({
        queryKey: ['candidate-exam-questions', id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/candidate/exams/${id}/questions`);
            return res.data;
        },
        enabled: !!id,
        refetchOnWindowFocus: false,
    });

    // Handle different API response structures
    const questions = Array.isArray(fetchRes) 
        ? fetchRes 
        : (fetchRes?.data?.questions || fetchRes?.questions || fetchRes?.data || []);
    
    const examData = Array.isArray(fetchRes) 
        ? { questions: fetchRes, duration: 60 } // Fallback duration if array
        : (fetchRes?.data || fetchRes || {});
    
    // Initialize timer only once when duration is loaded
    useEffect(() => {
        const duration = examData.duration || 60; // Default to 60 if not found
        if (duration && timeLeft === null) {
            setTimeLeft(duration * 60);
        }
    }, [examData.duration, timeLeft]);

    // Timer Logic
    useEffect(() => {
        if (timeLeft === null || timeLeft <= 0) return;

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev === null || prev <= 1) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    handleAutoSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [timeLeft]);

    const formatTime = (seconds: number | null) => {
        if (seconds === null) return "--:--";
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const isLastQuestion = currentQuestionIdx === questions.length - 1;
    const currentQuestion = questions[currentQuestionIdx];

    const handleNext = () => {
        if (isLastQuestion) {
            setIsConfirmModalOpen(true);
        } else {
            setCurrentQuestionIdx((prev) => prev + 1);
        }
    };

    const handleAnswerUpdate = (questionId: string, answerText?: string, selectedOptionIds?: string[]) => {
        setAnswers(prev => {
            const copy = [...prev];
            const existingIdx = copy.findIndex(a => a.questionId === questionId);
            const payload = { questionId, answerText, selectedOptionIds };
            
            if (existingIdx >= 0) {
                copy[existingIdx] = payload;
            } else {
                copy.push(payload);
            }
            return copy;
        });
    };

    const submitMutation = useMutation({
        mutationFn: async (isAutoSubmit: boolean) => {
            return axiosInstance.post('/submissions', {
                examId: id,
                isAutoSubmit,
                answers
            });
        }
    });

    const handleManualSubmit = async () => {
        setIsConfirmModalOpen(false);
        try {
            await submitMutation.mutateAsync(false);
            if (timerRef.current) clearInterval(timerRef.current);
            setIsSuccessModalOpen(true);
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || error.message || 'Failed to submit exam';
            showToast('error', errorMsg);
            
            // If already submitted, we can still show success modal after a delay 
            // or just let them stay on the page with the error toast.
            // Based on user request, showing the toast is the priority.
        }
    };

    const handleAutoSubmit = async () => {
        try {
            await submitMutation.mutateAsync(true);
            setIsTimeoutModalOpen(true);
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || error.message || 'Auto-submit failed';
            showToast('error', errorMsg);
            setIsTimeoutModalOpen(true);
        }
    };

    const getAnswerForCurrentQuestion = () => {
        if (!currentQuestion) return null;
        return answers.find(a => a.questionId === currentQuestion.id);
    };

    if (isLoading) {
        return (
            <ProtectedRoute allowedRoles={['candidate']} loginPath="/candidate/login">
                <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-primary" />
                        <p className="text-gray-500 font-medium">Loading exam questions...</p>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    if (isError || !questions || questions.length === 0) {
        return (
            <ProtectedRoute allowedRoles={['candidate']} loginPath="/candidate/login">
                <Navbar />
                <div className="min-h-[calc(100-64px)] flex items-center justify-center bg-[#F9FAFB] p-6">
                    <div className="text-center max-w-md">
                        <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 font-medium border border-red-100">
                            Failed to load exam or no questions available.
                        </div>
                        <Link href="/candidate/dashboard">
                            <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors cursor-pointer">
                                Back to Dashboard
                            </button>
                        </Link>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute allowedRoles={['candidate']} loginPath="/candidate/login">
        <div className="min-h-screen flex flex-col bg-[#F9FAFB] font-inter">
            <Navbar />
            
            {/* Top Bar Navigation */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10 px-6 py-4 shadow-sm">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="text-lg font-bold text-gray-800">
                        Question <span className="text-primary">{String(currentQuestionIdx + 1).padStart(2, '0')}</span>/{String(questions.length).padStart(2, '0')}
                    </div>
                    
                    <div className="flex items-center gap-4">
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
                        {currentQuestion?.title}
                    </h2>

                    <div className="space-y-4 mb-10">
                        {/* Lowercase type checks to match database values */}
                        {currentQuestion?.type === "radio" && currentQuestion.options?.map((opt: any, i: number) => {
                            const isChecked = getAnswerForCurrentQuestion()?.selectedOptionIds?.includes(opt.id);
                            return (
                                <label key={opt.id || i} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${isChecked ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50 hover:bg-primary/5'}`}>
                                    <input 
                                        type="radio" 
                                        name={`q-${currentQuestion.id}`} 
                                        checked={isChecked || false}
                                        onChange={() => handleAnswerUpdate(currentQuestion.id, undefined, [opt.id])}
                                        className="w-5 h-5 text-primary border-gray-300 focus:ring-primary cursor-pointer" 
                                    />
                                    <span className="text-gray-700 text-lg cursor-pointer">{opt.text || opt}</span>
                                </label>
                            );
                        })}

                        {currentQuestion?.type === "checkbox" && currentQuestion.options?.map((opt: any, i: number) => {
                            const selectedIds = getAnswerForCurrentQuestion()?.selectedOptionIds || [];
                            const isChecked = selectedIds.includes(opt.id);
                            return (
                                <label key={opt.id || i} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${isChecked ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50 hover:bg-primary/5'}`}>
                                    <input 
                                        type="checkbox" 
                                        checked={isChecked || false}
                                        onChange={(e) => {
                                            const newIds = e.target.checked 
                                                ? [...selectedIds, opt.id] 
                                                : selectedIds.filter((id: string) => id !== opt.id);
                                            handleAnswerUpdate(currentQuestion.id, undefined, newIds);
                                        }}
                                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer" 
                                    />
                                    <span className="text-gray-700 text-lg cursor-pointer">{opt.text || opt}</span>
                                </label>
                            );
                        })}

                        {currentQuestion?.type === "text" && (
                            <TextEditor 
                                value={getAnswerForCurrentQuestion()?.answerText || ""}
                                onChange={(val) => handleAnswerUpdate(currentQuestion.id, val, undefined)}
                            />
                        )}
                    </div>

                    <div className="flex justify-end pt-6 border-t border-gray-100">
                        <button 
                            onClick={handleNext} 
                            disabled={submitMutation.isPending}
                            className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-all shadow-md active:scale-[0.98] text-lg disabled:opacity-70 flex items-center gap-2 cursor-pointer"
                        >
                            {isLastQuestion ? "Submit Exam" : "Save & Next"}
                        </button>
                    </div>
                </div>
            </main>

            {/* Confirm Submit Modal */}
            <Modal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} title="Confirm Submission">
                <div className="space-y-4">
                    <p className="text-gray-600">Are you sure you want to submit your exam now? You won't be able to change your answers afterward.</p>
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <button onClick={() => setIsConfirmModalOpen(false)} className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium text-sm transition-colors cursor-pointer">
                            Resume Exam
                        </button>
                        <button onClick={handleManualSubmit} disabled={submitMutation.isPending} className="px-5 py-2 bg-primary text-white rounded-md hover:bg-primary-dark font-medium text-sm transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2 cursor-pointer">
                            {submitMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />} Confirm Submit
                        </button>
                    </div>
                </div>
            </Modal>

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
                    <Link href="/candidate/dashboard" className="w-full cursor-pointer">
                        <button className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors shadow-sm cursor-pointer">
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
                    <Link href="/candidate/dashboard" className="w-full cursor-pointer">
                        <button className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors shadow-sm cursor-pointer">
                            Back to Dashboard
                        </button>
                    </Link>
                </div>
            </Modal>
        </div>
        </ProtectedRoute>
    );
}
