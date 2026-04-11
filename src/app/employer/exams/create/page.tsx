"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft, Plus, PencilLine, Trash2, X, Loader2,
    CheckCircle2, AlertCircle, FileText
} from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Modal from '@/components/ui/Modal';
import InputField from '@/components/form/TextInput';
import SelectInput from '@/components/form/SelectField';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { axiosInstance } from '@/lib/axios';
import { showToast } from '@/utils/toast-utils';

const step1Schema = z.object({
    title: z.string().min(1, "Title is required"),
    totalCandidates: z.coerce.number().min(1, "Must be at least 1"),
    totalSlots: z.coerce.number().min(1, "Must be at least 1"),
    questionSets: z.coerce.number().min(1, "Must be at least 1"),
    questionType: z.string().min(1, "Question type is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    duration: z.coerce.number().min(1, "Must be at least 1 minute"),
}).refine((data) => new Date(data.endTime) > new Date(data.startTime), {
    message: "End time must be after start time",
    path: ["endTime"],
});

type Step1FormValues = z.infer<typeof step1Schema>;

export default function CreateExamPage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [step, setStep] = useState(1);
    const [examId, setExamId] = useState<string | null>(null);
    const [isCreatingExam, setIsCreatingExam] = useState(false);

    // Modal state for Step 2
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
    const [questionType, setQuestionType] = useState({ label: 'Radio Buttons', value: 'radio' });
    const [questionTitle, setQuestionTitle] = useState("");
    const [options, setOptions] = useState([{ id: Date.now(), text: '', isCorrect: false }]);
    const [isSavingQuestion, setIsSavingQuestion] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);

    const { control, handleSubmit, formState: { errors } } = useForm<Step1FormValues>({
        resolver: zodResolver(step1Schema),
        defaultValues: {
            title: '',
            totalCandidates: undefined,
            totalSlots: undefined,
            questionSets: undefined,
            questionType: 'mixed',
            startTime: '',
            endTime: '',
            duration: undefined
        }
    });

    const onStep1Submit = async (data: Step1FormValues) => {
        setIsCreatingExam(true);
        try {
            // Append +06:00 offset to ensure the backend treats it as Bangladesh time (UTC+6)
            // This prevents the time from shifting when converted to UTC on the backend
            const payload = {
                ...data,
                startTime: `${data.startTime}:00+06:00`,
                endTime: `${data.endTime}:00+06:00`,
            };
            const res = await axiosInstance.post('/exams', payload);
            setExamId(res.data?.id || res.data?.data?.id);
            setStep(2);
            showToast('success', 'Exam details saved!');
        } catch (error: any) {
            showToast('error', error.response?.data?.message || 'Failed to create exam');
        } finally {
            setIsCreatingExam(false);
        }
    };

    const { data: fetchRes, isLoading: questionsLoading } = useQuery({
        queryKey: ['exam-questions', examId],
        queryFn: async () => {
            const res = await axiosInstance.get(`/exams/${examId}`);
            return res.data;
        },
        enabled: !!examId && step === 2
    });

    const questions = fetchRes?.data?.questions || fetchRes?.questions || [];

    const handleAddOption = () => {
        setOptions([...options, { id: Date.now(), text: '', isCorrect: false }]);
    };

    const handleRemoveOption = (id: number) => {
        setOptions(options.filter(opt => opt.id !== id));
    };

    const handleUpdateOption = (id: number, key: string, val: any) => {
        setOptions(options.map(opt => opt.id === id ? { ...opt, [key]: val } : opt));
    };

    const resetModal = () => {
        setQuestionTitle("");
        setQuestionType({ label: 'Radio Buttons', value: 'radio' });
        setOptions([{ id: Date.now(), text: '', isCorrect: false }]);
        setEditingQuestionId(null);
        setIsModalOpen(false);
    };

    const saveQuestion = async () => {
        if (!questionTitle) {
            showToast('error', 'Question title is required');
            return;
        }
        setIsSavingQuestion(true);
        try {
            const payload = {
                title: questionTitle,
                type: questionType.value,
                options: (questionType.value === 'radio' || questionType.value === 'checkbox')
                    ? options.map(o => ({ text: o.text, isCorrect: o.isCorrect }))
                    : []
            };

            if (editingQuestionId) {
                await axiosInstance.put(`/questions/${editingQuestionId}`, payload);
                showToast('success', 'Question updated!');
            } else {
                await axiosInstance.post(`/exams/${examId}/questions`, payload);
                showToast('success', 'Question added!');
            }
            queryClient.invalidateQueries({ queryKey: ['exam-questions', examId] });
            resetModal();
        } catch (error: any) {
            showToast('error', error.response?.data?.message || 'Failed to save question');
        } finally {
            setIsSavingQuestion(false);
        }
    };

    const deleteQuestion = async () => {
        if (!questionToDelete) return;
        try {
            await axiosInstance.delete(`/questions/${questionToDelete}`);
            queryClient.invalidateQueries({ queryKey: ['exam-questions', examId] });
            showToast('success', 'Question deleted');
            setIsDeleteModalOpen(false);
            setQuestionToDelete(null);
        } catch (error) {
            showToast('error', 'Failed to delete question');
        }
    };

    const openDeleteModal = (id: string) => {
        setQuestionToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const openEditModal = (q: any) => {
        setEditingQuestionId(q.id);
        setQuestionTitle(q.title);
        const typeLabel = q.type === 'radio' ? 'Radio Buttons' : q.type === 'checkbox' ? 'Checkbox (Multiple variants)' : 'Text Area';
        setQuestionType({ label: typeLabel, value: q.type });
        if (q.options?.length > 0) {
            setOptions(q.options.map((o: any) => ({ id: o.id || Date.now() + Math.random(), text: o.text, isCorrect: o.isCorrect })));
        } else {
            setOptions([{ id: Date.now(), text: '', isCorrect: false }]);
        }
        setIsModalOpen(true);
    };

    return (
        <ProtectedRoute allowedRoles={['employer']} loginPath="/employer/login">
            <div className="min-h-screen flex flex-col bg-[#F9FAFB] font-inter">
                <Navbar />

                <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-4 md:py-8">
                    <div className="flex items-center gap-3 mb-8">
                        <Link href="/employer/dashboard" className="p-1 md:p-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                        </Link>
                        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold md:font-bold text-gray-900">Manage Online Test</h1>
                    </div>

                    <div className="flex flex-col gap-4 mb-8 -mt-3 md:mt-0 border-b border-gray-200 pb-4">
                        <div className="flex items-center justify-between">
                            {/* Left Side: Steps (Using flex-wrap to prevent hiding) */}
                            <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
                                {/* Step 1 */}
                                <div className={`flex items-center gap-2 font-medium ${step === 1 ? 'text-primary border-b-2 border-primary pb-[17px] -mb-[17px]' : 'text-gray-400'}`}>
                                    <div className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 rounded-full flex items-center justify-center text-[10px] sm:text-xs text-white ${step === 1 ? 'bg-primary' : 'bg-gray-300'}`}>1</div>
                                    <span className="text-xs sm:text-sm">Basic Info</span>
                                </div>

                                {/* Step 2 */}
                                <div className={`flex items-center gap-2 font-medium ${step === 2 ? 'text-primary border-b-2 border-primary pb-[17px] -mb-[17px]' : 'text-gray-400'}`}>
                                    <div className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 rounded-full flex items-center justify-center text-[10px] sm:text-xs text-white ${step === 2 ? 'bg-primary' : 'bg-gray-300'}`}>2</div>
                                    <span className="text-xs sm:text-sm">Question Sets</span>
                                </div>
                            </div>

                            {/* Right Side: Dashboard Button (Visible on sm/mobile) */}
                            <Link href="/employer/dashboard">
                                <button className="flex items-center gap-1 bg-white text-black border border-gray-200 hover:bg-gray-50 font-semibold px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg text-[10px] sm:text-sm transition-all shadow active:scale-95">
                                    Dashboard
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-8">
                        {step === 1 ? (
                            <form onSubmit={handleSubmit(onStep1Submit)} className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                                <h2 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-3">Basic Information</h2>

                                <Controller name="title" control={control} render={({ field }) => (
                                    <InputField {...field} label="Exam Title" placeholder="e.g. Psychometric Test for IT" message={errors.title?.message} />
                                )} />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Controller name="totalCandidates" control={control} render={({ field }) => (
                                        <InputField {...field} type="number" label="Total Candidates" placeholder="Enter number" message={errors.totalCandidates?.message} />
                                    )} />
                                    <Controller name="totalSlots" control={control} render={({ field }) => (
                                        <InputField {...field} type="number" label="Total Slots" placeholder="Enter number" message={errors.totalSlots?.message} />
                                    )} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Controller name="questionSets" control={control} render={({ field }) => (
                                        <InputField {...field} type="number" label="Question Sets" placeholder="Enter number" message={errors.questionSets?.message} />
                                    )} />
                                    <Controller name="questionType" control={control} render={({ field: { onChange, value } }) => (
                                        <SelectInput
                                            label="Question Type"
                                            value={{ label: value === 'mixed' ? 'MCQ & Text' : value === 'mcq' ? 'MCQ Only' : 'Text Only', value }}
                                            onChange={(val) => onChange(val.value)}
                                            options={[
                                                { label: 'MCQ & Text', value: 'mixed' },
                                                { label: 'MCQ Only', value: 'mcq' },
                                                { label: 'Text Only', value: 'text' }
                                            ]}
                                        />
                                    )} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <Controller name="startTime" control={control} render={({ field }) => (
                                        <InputField {...field} type="datetime-local" label="Start Time" message={errors.startTime?.message} />
                                    )} />
                                    <Controller name="endTime" control={control} render={({ field }) => (
                                        <InputField {...field} type="datetime-local" label="End Time" message={errors.endTime?.message} />
                                    )} />
                                    <Controller name="duration" control={control} render={({ field }) => (
                                        <InputField {...field} type="number" label="Duration (in minutes)" placeholder="Enter minutes" message={errors.duration?.message} />
                                    )} />
                                </div>
                                

                                <div className="flex justify-end pt-4">
                                    <button type="submit" disabled={isCreatingExam} className="bg-primary hover:bg-primary-dark text-white px-8 py-2.5 rounded-lg font-medium transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2 cursor-pointer">
                                        {isCreatingExam && <Loader2 className="w-4 h-4 animate-spin" />}
                                        Next
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                                    <h2 className="text-lg font-bold text-gray-800">Question Sets</h2>
                                    <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-sm cursor-pointer">
                                        <Plus className="w-4 h-4" />
                                        Add Question
                                    </button>
                                </div>

                                <div className="space-y-6 min-h-[200px]">
                                    {questionsLoading ? (
                                        <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
                                    ) : questions.length === 0 ? (
                                        <div className="text-center py-10 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">No questions added yet.</div>
                                    ) : (
                                        questions.map((q: any, index: number) => (
                                            <div key={q.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                                {/* Header */}
                                                <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-sm font-bold text-gray-900">Question {index + 1}</span>
                                                        <span className="px-2.5 py-0.5 bg-white border border-gray-200 text-gray-600 text-[10px] uppercase tracking-wider rounded-md font-bold">
                                                            {q.type === 'radio' ? 'MCQ' : q.type === 'checkbox' ? 'Checkbox' : 'Text'}
                                                        </span>
                                                    </div>
                                                    <div className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded">1 pt</div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-6">
                                                    <h3 className="text-base font-bold text-gray-900 mb-4">{q.title}</h3>

                                                    {(q.type === 'radio' || q.type === 'checkbox') && q.options && (
                                                        <div className="space-y-3">
                                                            {q.options.map((opt: any, i: number) => (
                                                                <div key={i} className={`flex items-center justify-between p-3 rounded-lg border transition-all ${opt.isCorrect ? 'bg-green-50 border-green-200 text-green-800' : 'bg-white border-gray-100 text-gray-600'}`}>
                                                                    <span className="text-sm font-medium">{String.fromCharCode(65 + i)}. {opt.text}</span>
                                                                    {opt.isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-500/10" />}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {q.type === 'text' && (
                                                        <div className="flex gap-3 text-sm text-gray-500 leading-relaxed border border-gray-100 p-4 rounded-lg bg-gray-50/50">
                                                            <FileText className="w-5 h-5 text-gray-400 shrink-0" />
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan.</p>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Actions */}
                                                <div className="px-6 py-3 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
                                                    <button onClick={() => openEditModal(q)} className="text-primary text-sm font-bold hover:text-primary-dark transition-colors flex items-center gap-1 cursor-pointer">
                                                        <PencilLine className="w-3.5 h-3.5" /> Edit
                                                    </button>
                                                    <button onClick={() => openDeleteModal(q.id)} className="text-red-500 text-sm font-bold hover:text-red-600 transition-colors flex items-center gap-1 cursor-pointer">
                                                        <Trash2 className="w-3.5 h-3.5" /> Remove From Exam
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <div className="flex justify-end pt-6 border-t border-gray-100 mt-8">
                                    <button onClick={() => {
                                        queryClient.invalidateQueries({ queryKey: ['exams'] });
                                        router.push('/employer/dashboard');
                                    }} className="px-4 md:px-8 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium shadow-sm transition-colors cursor-pointer">
                                        Finish
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </main>

                <Footer />

                <Modal isOpen={isModalOpen} onClose={resetModal} title={editingQuestionId ? "Edit Question" : "Add Question"}>
                    <div className="space-y-5 px-0 md:px-6">
                        <InputField label="Question Title" placeholder="Enter question..." value={questionTitle} onChange={(e: any) => setQuestionTitle(e?.target?.value ?? e)} />

                        <div className="-mt-3 mb-2">
                            <SelectInput
                                label="Question Type"
                                value={questionType}
                                onChange={(opt) => setQuestionType(opt)}
                                options={[
                                    { label: 'Radio Buttons', value: 'radio' },
                                    { label: 'Checkbox (Multiple variants)', value: 'checkbox' },
                                    { label: 'Text Area', value: 'text' }
                                ]}
                            />
                        </div>

                        {(questionType.value === 'radio' || questionType.value === 'checkbox') && (
                            <div className="border-t border-gray-100 pt-4 mt-6">
                                <label className="block text-sm font-bold text-gray-700 mb-3">Options</label>
                                <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto">
                                    {options.map((opt, i) => (
                                        <div key={opt.id} className="flex items-center gap-3">
                                            <div className="flex-1">
                                                <InputField placeholder={`Option ${i + 1}`} value={opt.text} onChange={(e: any) => handleUpdateOption(opt.id, 'text', e?.target?.value ?? e)} />
                                            </div>
                                            <label className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 cursor-pointer">
                                                <input
                                                    type={questionType.value === 'radio' ? 'radio' : 'checkbox'}
                                                    name={questionType.value === 'radio' ? 'correctOption' : undefined}
                                                    checked={opt.isCorrect}
                                                    onChange={(e) => {
                                                        if (questionType.value === 'radio') {
                                                            setOptions(options.map(o => ({ ...o, isCorrect: o.id === opt.id })));
                                                        } else {
                                                            handleUpdateOption(opt.id, 'isCorrect', e.target.checked);
                                                        }
                                                    }}
                                                    className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary cursor-pointer"
                                                />
                                                <span className="font-semibold text-gray-800">{String.fromCharCode(65 + i)}</span>
                                                <span>Correct</span>
                                            </label>
                                            <button onClick={() => handleRemoveOption(opt.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={handleAddOption} className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark cursor-pointer">
                                    <Plus className="w-4 h-4" /> Add Option
                                </button>
                            </div>
                        )}

                        <div className="flex gap-3 pt-6 border-t border-gray-100 mt-6 justify-between mb-4">
                            <button onClick={resetModal} className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium text-sm transition-colors cursor-pointer">
                                Cancel
                            </button>
                            <button disabled={isSavingQuestion} onClick={saveQuestion} className="px-5 py-2 bg-primary text-white rounded-md hover:bg-primary-dark font-medium text-sm transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2 cursor-pointer">
                                {isSavingQuestion && <Loader2 className="w-4 h-4 animate-spin" />} Save Question
                            </button>
                        </div>
                    </div>
                </Modal>

                <Modal isOpen={isDeleteModalOpen} onClose={() => { setIsDeleteModalOpen(false); setQuestionToDelete(null); }} title="Delete Question">
                    <div className="space-y-4">
                        <p className="text-gray-600">Are you sure you want to delete this question? This action cannot be undone.</p>
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button onClick={() => { setIsDeleteModalOpen(false); setQuestionToDelete(null); }} className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium">Cancel</button>
                            <button onClick={deleteQuestion} className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 font-medium">Delete</button>
                        </div>
                    </div>
                </Modal>
            </div>
        </ProtectedRoute>
    );
}