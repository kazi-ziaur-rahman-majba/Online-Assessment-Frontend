"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, PencilLine, Trash2, X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Modal from '@/components/ui/Modal';
import InputField from '@/components/form/TextInput';
import SelectInput from '@/components/form/SelectField';

export default function CreateExamPage() {
    const [step, setStep] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [questionType, setQuestionType] = useState({label: 'Radio Buttons', value: 'Radio'});
    
    // Stub questions
    const [questions, setQuestions] = useState([
        { id: 1, title: 'What is the capital of France?', type: 'Radio' },
        { id: 2, title: 'Describe your experience with Next.js', type: 'Text' },
    ]);

    // Modal options state
    const [options, setOptions] = useState([
        { id: 1, text: '', isCorrect: false }
    ]);

    const handleAddOption = () => {
        setOptions([...options, { id: Date.now(), text: '', isCorrect: false }]);
    };

    const handleRemoveOption = (id: number) => {
        setOptions(options.filter(opt => opt.id !== id));
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F9FAFB] font-inter">
            <Navbar />
            
            <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <Link href="/employer/dashboard" className="p-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Manage Online Test</h1>
                </div>

                {/* Steps Indicator */}
                <div className="flex items-center gap-8 mb-8 border-b border-gray-200 pb-4">
                    <div className={`flex items-center gap-2 font-medium ${step === 1 ? 'text-primary border-b-2 border-primary pb-[17px] -mb-[17px]' : 'text-gray-400 cursor-pointer'}`} onClick={() => setStep(1)}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${step === 1 ? 'bg-primary' : 'bg-gray-300'}`}>1</div>
                        Step 1 - Basic Information
                    </div>
                    <div className={`flex items-center gap-2 font-medium ${step === 2 ? 'text-primary border-b-2 border-primary pb-[17px] -mb-[17px]' : 'text-gray-400 cursor-pointer'}`} onClick={() => setStep(2)}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${step === 2 ? 'bg-primary' : 'bg-gray-300'}`}>2</div>
                        Step 2 - Question Sets
                    </div>
                </div>

                {/* Form Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    {step === 1 ? (
                        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-3">Basic Information</h2>
                            
                            <div>
                                <InputField label="Exam Title" placeholder="e.g. Psychometric Test for IT" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputField type="number" label="Total Candidates" placeholder="100" />
                                </div>
                                <div>
                                    <InputField type="number" label="Total Slots" placeholder="2" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputField type="number" label="Question Sets" placeholder="3" />
                                </div>
                                <div>
                                    <SelectInput 
                                        label="Question Type" 
                                        value={{label: 'MCQ & Text', value: 'mixed'}} 
                                        onChange={() => {}} 
                                        options={[
                                            {label: 'MCQ & Text', value: 'mixed'},
                                            {label: 'MCQ Only', value: 'mcq'},
                                            {label: 'Text Only', value: 'text'}
                                        ]} 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputField type="datetime-local" label="Start Time" />
                                </div>
                                <div>
                                    <InputField type="datetime-local" label="End Time" />
                                </div>
                            </div>
                            
                            <div>
                                <InputField type="number" wrapperClass="md:w-1/2" label="Duration (in minutes)" placeholder="60" />
                            </div>

                            <div className="flex justify-end pt-4">
                                <button type="button" onClick={() => setStep(2)} className="bg-primary hover:bg-primary-dark text-white px-8 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
                                    Next
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                                <h2 className="text-lg font-bold text-gray-800">Question Sets</h2>
                                <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-sm">
                                    <Plus className="w-4 h-4" />
                                    Add Question
                                </button>
                            </div>

                            <div className="space-y-4">
                                {questions.map((q, index) => (
                                    <div key={q.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-bold text-gray-500 w-8">Q{index + 1}.</span>
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">{q.title}</p>
                                                <span className="inline-block mt-1 px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-sm font-medium">Type: {q.type}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-md transition-colors">
                                                <PencilLine className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="flex justify-between pt-6 border-t border-gray-100 mt-8">
                                <button onClick={() => setStep(1)} className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                                    Back
                                </button>
                                <Link href="/employer/dashboard">
                                    <button className="px-8 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium shadow-sm transition-colors cursor-pointer">
                                        Save Exam
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Question">
                <div className="space-y-5">
                    <div>
                        <InputField label="Question Title" placeholder="Enter question..." />
                    </div>
                    
                    <div className="-mt-3 mb-2">
                        <SelectInput 
                            label="Question Type" 
                            value={questionType}
                            onChange={(opt) => setQuestionType(opt)}
                            options={[
                                {label: 'Radio Buttons', value: 'Radio'},
                                {label: 'Checkbox (Multiple variants)', value: 'Checkbox'},
                                {label: 'Text Area', value: 'Text'}
                            ]}
                        />
                    </div>

                    {(questionType.value === 'Radio' || questionType.value === 'Checkbox') && (
                        <div className="border-t border-gray-100 pt-4 mt-6">
                            <label className="block text-sm font-bold text-gray-700 mb-3">Options</label>
                            
                            <div className="space-y-3 mb-4">
                                {options.map((opt, i) => (
                                    <div key={opt.id} className="flex items-center gap-3">
                                        <div className="flex-1">
                                            <InputField placeholder={`Option ${i + 1}`} />
                                        </div>
                                        <label className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                                            <input type="checkbox" className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" />
                                            <span>Correct</span>
                                        </label>
                                        <button 
                                            onClick={() => handleRemoveOption(opt.id)}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                            title="Remove option"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            
                            <button 
                                onClick={handleAddOption}
                                className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark"
                            >
                                <Plus className="w-4 h-4" />
                                Add Option
                            </button>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-6">
                        <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium text-sm transition-colors">
                            Cancel
                        </button>
                        <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 bg-primary text-white rounded-md hover:bg-primary-dark font-medium text-sm transition-colors shadow-sm">
                            Save Question
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
