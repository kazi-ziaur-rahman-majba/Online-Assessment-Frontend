"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Footer from '@/components/layout/Footer';
import InputField from '@/components/form/TextInput';
import { axiosInstance } from '@/lib/axios';
import { setToken, setUser } from '@/lib/auth';

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" })
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function CandidateLogin() {
    const router = useRouter();
    const [apiError, setApiError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' }
    });

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);
        setApiError(null);
        try {
            const response = await axiosInstance.post('/auth/login', data);
            
            const token = response.data?.access_token || response.data?.accessToken;
            const user = response.data?.user;
            
            if (token) {
                setToken(token);
                if (user) {
                    setUser(user);
                } else {
                    setUser({ role: 'candidate', email: data.email } as any);
                }

                router.push('/candidate/dashboard');
            } else {
                setApiError("Invalid response: Token missing");
            }
        } catch (error: any) {
            setApiError(error.response?.data?.message || error.message || "Failed to login");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F9FAFB] font-inter">
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-[420px] p-8 border border-gray-100">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-primary/30 mb-4">
                            AR
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Akij Resource</h1>
                        <p className="text-gray-500 mt-2 text-sm">Sign In to Candidate Portal</p>
                    </div>

                    {apiError && (
                        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-sm text-red-700">
                            {apiError}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <InputField 
                                        {...field}
                                        type="email" 
                                        label="Email"
                                        placeholder="name@example.com"
                                        message={errors.email?.message}
                                    />
                                )}
                            />
                        </div>
                        
                        <div>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <InputField 
                                        {...field}
                                        type="password" 
                                        label="Password"
                                        placeholder="••••••••"
                                        message={errors.password?.message}
                                    />
                                )}
                            />
                            <div className="flex justify-end mt-2">
                                <Link href="#" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors cursor-pointer">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-md shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center cursor-pointer"
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
