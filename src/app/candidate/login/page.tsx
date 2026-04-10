import React from 'react';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import InputField from '@/components/form/TextInput';

export default function CandidateLogin() {
    return (
        <div className="min-h-screen flex flex-col bg-[#F9FAFB] font-inter">
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-[420px] p-8 border border-gray-100">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-primary/30 mb-4">
                            AR
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Akij Resource</h1>
                        <p className="text-gray-500 mt-2 text-sm">Sign In as Candidate</p>
                    </div>

                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <InputField 
                                name="email"
                                type="email" 
                                label="Email"
                                placeholder="name@example.com"
                            />
                        </div>
                        
                        <div>
                            <InputField 
                                name="password"
                                type="password" 
                                label="Password"
                                placeholder="••••••••"
                            />
                            <div className="flex justify-end mt-2">
                                <Link href="#" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

                        <Link href="/candidate/dashboard" className="block w-full">
                            <button type="button" className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-md shadow-primary/20 transition-all active:scale-[0.98]">
                                Login
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
