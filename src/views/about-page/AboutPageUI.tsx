"use client";

import { useState } from "react";
import {
  Globe,
  FileText,
  Users,
  Plane,
  Shield,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Counter, { MotionDiv } from "@/utils/framer.motion";
import CTABanner from "@/components/cta-section/CTABanner";

const AboutPageUI = () => {
  const [activeStep, setActiveStep] = useState(0);

  const workSteps = [
    {
      number: "01",
      title: "Discovery & Assessment",
      description:
        "We begin by understanding your career goals, educational background, and personal preferences to create a tailored pathway.",
      highlights: [
        "Career goal assessment",
        "Educational background review",
        "Personal preference analysis",
      ],
      tags: ["Initial Consultation", "Goal Setting", "Profile Building"],
    },
    {
      number: "02",
      title: "Strategic Planning",
      description:
        "Our experts develop a comprehensive plan that outlines the best opportunities and pathways for your career journey.",
      highlights: [
        "Opportunity mapping",
        "Timeline development",
        "Resource planning",
      ],
      tags: [
        "Strategy Development",
        "Opportunity Analysis",
        "Timeline Planning",
      ],
    },
    {
      number: "03",
      title: "Documentation & Preparation",
      description:
        "We guide you through all necessary documentation, application processes, and prepare you for interviews.",
      highlights: [
        "Document preparation",
        "Application guidance",
        "Interview coaching",
      ],
      tags: ["Documentation", "Application Support", "Interview Prep"],
    },
    {
      number: "04",
      title: "Application & Submission",
      description:
        "Our team ensures your applications are submitted correctly and on time, maximizing your chances of success.",
      highlights: [
        "Application submission",
        "Quality assurance",
        "Follow-up coordination",
      ],
      tags: [
        "Application Management",
        "Quality Control",
        "Submission Tracking",
      ],
    },
    {
      number: "05",
      title: "Travel & Relocation",
      description:
        "We provide comprehensive support for your travel arrangements and initial relocation needs.",
      highlights: [
        "Travel arrangements",
        "Accommodation support",
        "Visa assistance",
      ],
      tags: ["Travel Support", "Relocation Aid", "Visa Processing"],
    },
    {
      number: "06",
      title: "Ongoing Support",
      description:
        "Our commitment continues with ongoing check-ins and support to ensure your success in your new journey.",
      highlights: [
        "Regular check-ins",
        "Continued guidance",
        "Success monitoring",
      ],
      tags: ["Ongoing Support", "Success Tracking", "Continuous Care"],
    },
  ];

  const services = [
    {
      icon: Globe,
      title: "Visa Application Guidance",
      description:
        "Expert guidance to navigate the complex visa application process and maximize your chances of success.",
      color: "text-blue-600",
    },
    {
      icon: FileText,
      title: "Document Preparation",
      description:
        "Professional assistance in preparing all required documents, forms, and supporting materials required for your application.",
      color: "text-green-600",
    },
    {
      icon: Users,
      title: "Interview Coaching",
      description:
        "One-on-one coaching sessions to help you prepare effective interview questions and prepare a compelling case for immigration officers.",
      color: "text-purple-600",
    },
    {
      icon: Plane,
      title: "Travel & Relocation Support",
      description:
        "We handle all the logistics of your travel and relocation experience, including flight arrangements, finding flights to arranging housing, so you can focus on starting your new life abroad.",
      color: "text-orange-600",
    },
    {
      icon: Shield,
      title: "Post-Arrival Assistance",
      description:
        "Our team helps you get settled in your new country, including registering with local authorities, setting up bank accounts and more.",
      color: "text-teal-600",
    },
    {
      icon: CheckCircle,
      title: "Ongoing Check-ins",
      description:
        "We maintain regular contact to ensure you're adapting well to your new life and are able to access resources and put your initial support.",
      color: "text-red-600",
    },
  ];

  const stats = [
    { number: 10, label: "Successful Course Graduates", suffix: "+" },
    { number: 700, label: "Project Completed", suffix: "+" },
    { number: 5, label: "Global Happy Clients", suffix: "k+" },
    { number: 500, label: "Team Members", suffix: "+" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-color-light)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center">
            <MotionDiv>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                How We Work
              </h1>
            </MotionDiv>
            <MotionDiv>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto !text-gray-light">
                Our systematic approach to career development and education
                consultancy ensures your success every step of the way.
              </p>
            </MotionDiv>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MotionDiv delay={0.1}>
                <button className="bg-[var(--secondary-color)] hover:bg-[var(--secondary-color-light)] text-white px-8 py-4 rounded-lg font-medium transition-colors duration-200">
                  Start Your Journey
                </button>
              </MotionDiv>
              <MotionDiv delay={0.2}>
                <button className="border-2 border-white text-white hover:bg-white hover:text-[var(--primary-color)] px-8 py-4 rounded-lg font-medium transition-all duration-200">
                  Learn More
                </button>
              </MotionDiv>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <MotionDiv>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Study. Travel. Live
              </h2>
            </MotionDiv>
            <MotionDiv>
              <p className="text-lg text-[var(--body-color)] max-w-2xl mx-auto">
                The Benchmark Career Development Centre & Education Consultancy
              </p>
            </MotionDiv>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <MotionDiv delay={0.2 * index} key={index} className="stat-card">
                <div className="text-4xl md:text-5xl font-bold text-[var(--primary-color)] mb-2">
                  <Counter value={stat.number} />
                  {stat.suffix}
                </div>
                <div className="text-sm md:text-base text-[var(--body-color)]">
                  {stat.label}
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
           <MotionDiv>
           <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Proven Process
            </h2>
           </MotionDiv>
            <MotionDiv>
            <p className="text-xl text-[var(--body-color)] max-w-3xl mx-auto">
              We follow a systematic 6-step approach to ensure your success in
              achieving your career and education goals.
            </p>
            </MotionDiv>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {workSteps.map((step, index) => (
              <MotionDiv
                key={index}
                className={`service-card cursor-pointer transition-all duration-300 ${
                  activeStep === index
                    ? "ring-2 ring-[var(--secondary-color)]"
                    : ""
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className="flex items-start space-x-4">
                  <div className="step-number">{step.number}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-[var(--body-color)] mb-4">
                      {step.description}
                    </p>
                    <ul className="space-y-2 mb-4">
                      {step.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-sm text-[var(--body-color)]"
                        >
                          <CheckCircle className="w-4 h-4 text-[var(--quaternary-color)] mr-2" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {step.tags.map((tag, idx) => (
                        <span key={idx} className="phase-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
           <MotionDiv>
           <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Comprehensive Services
            </h2>
           </MotionDiv>
           <MotionDiv>
           <p className="text-xl text-[var(--body-color)] max-w-3xl mx-auto">
              We provide end-to-end support for your international career and
              education journey.
            </p>
           </MotionDiv>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <MotionDiv delay={.25*index} key={index} className="service-card group">
                <div
                  className={`w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className={`w-8 h-8 ${service.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-[var(--body-color)] leading-relaxed">
                  {service.description}
                </p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-color-light)] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <MotionDiv className="text-center">
            <blockquote className="text-2xl md:text-3xl font-light italic mb-8 max-w-4xl mx-auto">
              "We specialize in connecting skilled workers with reputable
              companies, demonstrating our ability to adapt and respond to
              evolving needs."
            </blockquote>
            <div className="flex justify-center">
              <button className="bg-[var(--secondary-color)] hover:bg-[var(--secondary-color-light)] text-white px-8 py-4 rounded-lg font-medium transition-colors duration-200 flex items-center">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </MotionDiv>
        </div>
      </section>
      <CTABanner />

    </div>
  );
};
export default AboutPageUI;
