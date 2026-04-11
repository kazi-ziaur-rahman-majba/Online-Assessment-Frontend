"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";
import { BriefcaseBusiness, MailIcon, PhoneCall, UserCircle } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-primary-light">
      <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-primary/10 h-16">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center relative">
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
            <h1 className="text-lg md:text-xl font-semibold text-[#334155] whitespace-nowrap">
              Akij Resource
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full text-center space-y-12">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div
              onClick={() => router.push("/employer/login")}
              className="flex flex-col items-center space-y-5 p-6 bg-white rounded-2xl shadow-md border border-primary/5 hover:border-primary/20 hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="w-14 h-14 bg-primary-light rounded-2xl flex items-center justify-center">
                <BriefcaseBusiness className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-primary-dark">Employer Portal</h2>
                <p className="text-sm text-gray-500">Hire top talent and manage your recruitment process with ease.</p>
              </div>
              <Button
                label="Employer Login"
                buttonClass="!w-full !py-2 !text-base !font-bold rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all"
                onClick={() => router.push("/employer/login")}
              />
            </div>

            <div
              onClick={() => router.push("/candidate/login")}
              className="flex flex-col items-center space-y-5 p-6 bg-white rounded-2xl shadow-md border border-primary/5 cursor-pointer"
            >
              <div className="w-14 h-14 bg-primary-light rounded-2xl flex items-center justify-center">
                <UserCircle className="h-8 w-8 text-secondary" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-primary-dark">Candidate Portal</h2>
                <p className="text-sm text-gray-500">Discover career-defining roles and showcase your potential.</p>
              </div>
              <Button
                label="Candidate Login"
                color="var(--color-secondary)"
                buttonClass="!w-full !py-2 !text-base !font-bold rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all"
                onClick={() => router.push("/candidate/login")}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#130b2c] text-gray-500 py-4 px-2 md:px-6 mt-auto border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

          <div className="flex items-center gap-3 text-sm order-2 md:order-1">
            <p className="text-white text-base md:text-lg whitespace-nowrap">Powered by</p>
            <div className="relative w-[100px]  md:w-[150px] md:h-[40px]">
              <Image
                src="/footer.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="flex items-center sm:flex-row gap-4 sm:gap-6 text-sm text-white order-1 md:order-2">
            <p className="text-sm md:text-base text-white hidden md:block">Helpline</p>

            <div className="flex items-center gap-2 cursor-pointer hover:text-gray-300 transition-colors">
              <PhoneCall size={16} className="shrink-0" />
              <span className="whitespace-nowrap text-xs md:text-sm">
                +88011020202505
              </span>
            </div>

            <div className="flex items-center gap-2 cursor-pointer hover:text-gray-300 transition-colors">
              <MailIcon size={16} className="shrink-0" />
              <span className="whitespace-nowrap text-xs md:text-sm">
                support@akij.work
              </span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}