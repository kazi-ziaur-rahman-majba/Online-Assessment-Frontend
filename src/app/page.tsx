"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-primary-light">
      {/* Simple Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm px-6 py-4 flex items-center justify-between border-b border-primary/10">
        <div className="max-w-7xl mx-auto w-full flex items-center gap-2">
          <Image src="/logo.svg" alt="Akij Resource Logo" width={140} height={35} priority />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full text-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-primary-dark tracking-tight leading-tight">
              Welcome to <span className="text-primary">Akij Resource</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Your gateway to excellence. Connecting top industry talent with the best career opportunities. 
              Please choose your portal to continue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Employer Card */}
            <div 
              onClick={() => router.push("/employer/login")}
              className="flex flex-col items-center space-y-6 p-8 bg-white rounded-2xl shadow-lg border border-primary/5 hover:border-primary/20 hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="w-20 h-20 bg-primary-light rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-primary group-hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-primary-dark">Employer Portal</h2>
                <p className="text-sm text-gray-500">Hire top talent and manage your recruitment process with ease.</p>
              </div>
              <Button
                label="Employer Login"
                buttonClass="!w-full !py-4 !text-base !font-bold rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all"
                onClick={() => router.push("/employer/login")}
              />
            </div>

            {/* Candidate Card */}
            <div 
              onClick={() => router.push("/candidate/login")}
              className="flex flex-col items-center space-y-6 p-8 bg-white rounded-2xl shadow-lg border border-primary/5 hover:border-secondary/20 hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="w-20 h-20 bg-primary-light rounded-2xl flex items-center justify-center group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-secondary group-hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-primary-dark">Candidate Portal</h2>
                <p className="text-sm text-gray-500">Discover career-defining roles and showcase your potential.</p>
              </div>
              <Button
                label="Candidate Login"
                color="var(--color-secondary)"
                buttonClass="!w-full !py-4 !text-base !font-bold rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all"
                onClick={() => router.push("/candidate/login")}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="py-10 bg-white/50 border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Akij Resource. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors cursor-pointer">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors cursor-pointer">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
