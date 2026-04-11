"use client";

import Image from 'next/image';
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
import { showToast } from '@/utils/toast-utils';

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" })
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function EmployerLogin() {
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
                    setUser({ role: 'employer', email: data.email } as any);
                }
                showToast("success", "Login successful!");
                router.push('/employer/dashboard');
            } else {
                const msg = "Invalid response: Token missing";
                setApiError(msg);
                showToast("error", msg);
            }
        } catch (error: any) {
            const msg = error.response?.data?.message || error.message || "Failed to login";
            setApiError(msg);
            showToast("error", msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F9FAFB] font-inter">
            {/* Header */}
            <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-primary/10 h-16">
                <div className="max-w-7xl mx-auto px-2 md:px-6 h-full flex items-center relative">
                    <div className="flex-shrink-0">
                        <Image
                            src="/Logo.png"
                            alt="Akij Resource Logo"
                            width={120}
                            height={30}
                            className="w-16 sm:w-20 md:w-[120px] h-auto"
                        />
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2">
                        <h1 className="text-base md:text-xl font-semibold text-[#334155] whitespace-nowrap">
                            Akij Resource
                        </h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 bg-[#F8F9FC]">
                {/* Heading Outside the Card */}
                <h2 className="text-2xl font-semibold text-[#334155] mb-8">Sign In</h2>

                <div className="bg-white rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.04)] w-full max-w-[500px] p-10 border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0">
                        <div className="bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-bl-xl border-l border-b border-green-100">
                            Employer Portal
                        </div>
                    </div>

                    <div className="mb-6 p-2 bg-green-50/50 rounded-xl border border-green-100">
                        <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Demo Credentials</p>
                        <div className="flex flex-col gap-1 text-sm text-green-800">
                            <p><span className="font-semibold">Email:</span> employer@gmail.com</p>
                            <p><span className="font-semibold">Password:</span> 123456</p>
                        </div>
                    </div>

                    {apiError && (
                        <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-sm text-red-700">
                            {apiError}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        type="email"
                                        label="Email/ User ID"
                                        placeholder="Enter your email/User ID"
                                        message={errors.email?.message}
                                    />
                                )}
                            />
                        </div>

                        <div className="relative">
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        type="password"
                                        label="Password"
                                        placeholder="Enter your password"
                                        message={errors.password?.message}
                                    />
                                )}
                            />
                        </div>

                        <div className="flex justify-end !mt-2">
                            <Link href="#" className="text-sm font-medium text-[#475467] hover:text-primary transition-colors">
                                Forget Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2 bg-[#6366F1] hover:bg-[#5558e6] text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center mt-4"
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}