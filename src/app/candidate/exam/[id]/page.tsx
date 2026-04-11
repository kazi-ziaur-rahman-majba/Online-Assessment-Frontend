"use client";

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Clock, CheckCircle2, AlertTriangle, Loader2, X } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
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
    const [showQuestionNav, setShowQuestionNav] = useState(false);

    // Hydration fix
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => { setIsMounted(true); }, []);

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

    const questions = Array.isArray(fetchRes)
        ? fetchRes
        : (fetchRes?.data?.questions || fetchRes?.questions || fetchRes?.data || []);

    const examData = Array.isArray(fetchRes)
        ? { questions: fetchRes, duration: 60 }
        : (fetchRes?.data || fetchRes || {});

    useEffect(() => {
        const duration = examData.duration || 60;
        if (duration && timeLeft === null) {
            setTimeLeft(duration * 60);
        }
    }, [examData.duration, timeLeft]);

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

        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [timeLeft]);

    const formatTime = (seconds: number | null) => {
        if (seconds === null) return "00:00";
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
        }
    };

    const handleAutoSubmit = async () => {
        try {
            await submitMutation.mutateAsync(true);
            setIsTimeoutModalOpen(true);
        } catch (error: any) {
            setIsTimeoutModalOpen(true);
        }
    };

    const getAnswerForCurrentQuestion = () => {
        if (!currentQuestion) return null;
        return answers.find(a => a.questionId === currentQuestion.id);
    };

    if (!isMounted) return null;

    if (isLoading) {
        return (
            <ProtectedRoute allowedRoles={['candidate']} loginPath="/candidate/login">
                <div className="min-h-screen flex items-center justify-center bg-[#F4F7FA]">
                    <Loader2 className="w-10 h-10 animate-spin text-primary" />
                </div>
            </ProtectedRoute>
        );
    }

    if (isError || !questions || questions.length === 0) {
        return (
            <ProtectedRoute allowedRoles={['candidate']} loginPath="/candidate/login">
                <Navbar />
                <div className="min-h-screen flex items-center justify-center p-6">
                    <div className="text-center">
                        <p className="text-red-500 mb-4">Failed to load questions.</p>
                        <Link href="/candidate/dashboard" className="px-6 py-2 bg-primary text-white rounded-lg">Back</Link>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute allowedRoles={['candidate']} loginPath="/candidate/login">
            <div className="min-h-screen flex flex-col bg-[#F4F7FA]">
                <Navbar />

                {/* Status Bar */}
                <div className="w-full max-w-[850px] mx-auto pt-4 md:pt-8 px-4 md:px-6">
                    <div className="bg-white rounded-2xl p-3 md:p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border border-gray-100 shadow-sm">

                        {/* Left Side: Question Info & Navigation */}
                        <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-3 md:gap-4">
                            <span className="text-base md:text-lg font-bold text-[#344054] whitespace-nowrap">
                                Question ({currentQuestionIdx + 1}/{questions.length})
                            </span>
                            <button
                                onClick={() => setShowQuestionNav(!showQuestionNav)}
                                className="px-2.5 py-1.5 md:px-3 md:py-1.5 text-xs md:text-sm font-medium text-[#6941C6] border border-[#6941C6] rounded-lg hover:bg-[#F9F5FF] transition-colors whitespace-nowrap"
                            >
                                All Questions
                            </button>
                        </div>

                        {/* Right Side: Timer */}
                        <div className="flex items-center justify-center gap-2 bg-[#F2F4F7] w-full sm:w-auto px-4 py-2 sm:py-1.5 rounded-xl font-bold text-[#344054]">
                            <Clock className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="text-sm md:text-base">
                                {formatTime(timeLeft)}
                            </span>
                        </div>

                    </div>
                </div>

                {/* Question Navigation Panel */}
                {showQuestionNav && (
                    <div className="w-full max-w-[850px] mx-auto px-6 py-4">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-bold text-gray-900">All Questions</h3>
                                <button onClick={() => setShowQuestionNav(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2">
                                {questions.map((q: any, idx: number) => {
                                    const answer = answers.find(a => a.questionId === q.id);
                                    const hasAnswer = answer && (answer.answerText || (answer.selectedOptionIds && answer.selectedOptionIds.length > 0));
                                    const isCurrent = idx === currentQuestionIdx;

                                    return (
                                        <button
                                            key={q.id}
                                            onClick={() => {
                                                setCurrentQuestionIdx(idx);
                                                setShowQuestionNav(false);
                                            }}
                                            className={`p-2 rounded-lg text-sm font-medium transition-all ${isCurrent
                                                    ? 'bg-[#6941C6] text-white'
                                                    : hasAnswer
                                                        ? 'bg-green-100 text-green-700 border border-green-200'
                                                        : 'bg-gray-50 text-gray-600 border border-gray-100 hover:bg-gray-100'
                                                }`}
                                        >
                                            Q{idx + 1}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Card */}
                <main className="flex-1 w-full max-w-[850px] mx-auto px-4 py-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden flex flex-col min-h-[550px]">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gray-50">
                            <div className="h-full bg-[#6941C6] transition-all" style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}></div>
                        </div>

                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                            Q{currentQuestionIdx + 1}. {currentQuestion?.title}
                        </h2>

                        <div className="space-y-4 mb-12 flex-1">
                            {/* --- Radio (Logic Intact) --- */}
                            {currentQuestion?.type === "radio" && currentQuestion.options?.map((opt: any) => {
                                const isChecked = getAnswerForCurrentQuestion()?.selectedOptionIds?.includes(opt.id);
                                return (
                                    <label key={opt.id} className={`flex items-center gap-4 p-3 text-base rounded-xl border-2 cursor-pointer transition-all ${isChecked ? 'border-[#6941C6] bg-[#F9F5FF]' : 'border-gray-100 hover:border-gray-200'}`}>
                                        <div className={`w-6 h-6 rounded-full border-2 text-base flex items-center justify-center ${isChecked ? 'border-[#6941C6] bg-[#6941C6]' : 'border-gray-300'}`}>
                                            {isChecked && <div className="w-2 h-2 rounded-full bg-white"></div>}
                                        </div>
                                        <input type="radio" className="hidden" checked={isChecked || false} onChange={() => handleAnswerUpdate(currentQuestion.id, undefined, [opt.id])} />
                                        <span className={`text-base ${isChecked ? 'text-gray-900 font-semibold' : 'text-gray-700'}`}>{opt.text || opt}</span>
                                    </label>
                                );
                            })}

                            {/* --- Checkbox (Logic Intact) --- */}
                            {currentQuestion?.type === "checkbox" && currentQuestion.options?.map((opt: any) => {
                                const selectedIds = getAnswerForCurrentQuestion()?.selectedOptionIds || [];
                                const isChecked = selectedIds.includes(opt.id);
                                return (
                                    <label key={opt.id} className={`flex items-center gap-4 p-3 text-base rounded-xl border-2 cursor-pointer transition-all ${isChecked ? 'border-[#6941C6] bg-[#F9F5FF]' : 'border-gray-100 hover:border-gray-200'}`}>
                                        <div className={`w-6 h-6 rounded-md border-2 text-base flex items-center justify-center ${isChecked ? 'border-[#6941C6] bg-[#6941C6]' : 'border-gray-300'}`}>
                                            {isChecked && <CheckCircle2 className="w-3 h-3 text-white" />}
                                        </div>
                                        <input type="checkbox" className="hidden" checked={isChecked || false} onChange={(e) => {
                                            const newIds = e.target.checked ? [...selectedIds, opt.id] : selectedIds.filter((id: string) => id !== opt.id);
                                            handleAnswerUpdate(currentQuestion.id, undefined, newIds);
                                        }} />
                                        <span className={`text-base ${isChecked ? 'text-gray-900 font-semibold' : 'text-gray-700'}`}>{opt.text || opt}</span>
                                    </label>
                                );
                            })}

                            {/* --- TEXT AREA / SUBJECTIVE --- */}
                            {(currentQuestion?.type === "text" || currentQuestion?.type === "subjective") && (
                                <div className="animate-in fade-in duration-500">
                                    <TextEditor
                                        value={getAnswerForCurrentQuestion()?.answerText || ""}
                                        onChange={(val) => handleAnswerUpdate(currentQuestion.id, val, undefined)}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center pt-4 border-t border-gray-100">
                            <button
                                onClick={() => setCurrentQuestionIdx(prev => Math.min(questions.length - 1, prev + 1))}
                                disabled={isLastQuestion}
                                className="w-full md:w-auto px-4 py-2 md:px-6 md:py-2.5 border border-gray-200 cursor-pointer rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Skip this Question
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={submitMutation.isPending}
                                className="w-full md:w-auto py-2 px-4 md:px-6 md:py-2.5 bg-[#6941C6] hover:bg-[#53389E] text-white font-semibold md:font-bold rounded-xl shadow-md transition-all disabled:opacity-70 flex items-center gap-2"
                            >
                                {isLastQuestion ? "Submit Exam" : "Save & Continue"}
                            </button>
                        </div>
                    </div>
                </main>

                <Footer />

                {/* Modals - Logic fully preserved from your original code */}
                <Modal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} title="Confirm Submission">
                    <div className="space-y-4">
                        <p className="text-gray-600">Are you sure you want to submit your exam now? You won't be able to change your answers afterward.</p>
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button onClick={() => setIsConfirmModalOpen(false)} className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 font-medium">Resume</button>
                            <button onClick={handleManualSubmit} disabled={submitMutation.isPending} className="px-5 py-2 bg-[#6941C6] text-white rounded-md flex items-center gap-2">
                                {submitMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />} Confirm Submit
                            </button>
                        </div>
                    </div>
                </Modal>

                <Modal isOpen={isSuccessModalOpen} onClose={() => { }} maxWidth="max-w-3xl">
                    <div className="flex flex-col items-center p-5 text-center">
                        <Image src="/success.png" alt="Success" width={46} height={46} className='mb-3.5' />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Test Completed</h2>
                        <p className="text-gray-500 mb-5">You have successfully submitted your exam. Your responses have been saved.</p>
                        <Link href="/candidate/dashboard" className="w-full">
                            <button className="w-full py-3 bg-[#6941C6] cursor-pointer text-white rounded-lg font-medium">Back to Dashboard</button>
                        </Link>
                    </div>
                </Modal>

                <Modal isOpen={isTimeoutModalOpen} onClose={() => { }} maxWidth="max-w-3xl">
                    <div className="flex flex-col items-center p-5 text-center">
                        <Image src="/time.png" alt="Timeout" width={46} height={46} className='mb-3.5' />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Timeout!</h2>
                        <p className="text-gray-500 mb-5">Unfortunately you ran out of time. Your responses up to this point have been submitted.</p>
                        <Link href="/candidate/dashboard" className="w-full">
                            <button className="w-full py-3 bg-[#6941C6] text-white cursor-pointer rounded-lg font-medium">Back to Dashboard</button>
                        </Link>
                    </div>
                </Modal>
            </div>
        </ProtectedRoute>
    );
}