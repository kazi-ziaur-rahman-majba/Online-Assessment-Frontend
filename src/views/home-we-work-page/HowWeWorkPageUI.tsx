'use client';

import { useState } from 'react';
import { Globe, FileText, Users, Plane, Shield, CheckCircle, ArrowRight, Phone, Mail, MapPin, Facebook, Twitter, Linkedin as LinkedIn, Instagram } from 'lucide-react';

export default function HowWeWorkPage() {
  const [activeStep, setActiveStep] = useState(0);

  const workSteps = [
    {
      number: "01",
      title: "Discovery & Assessment",
      description: "We begin by understanding your career goals, educational background, and personal preferences to create a tailored pathway.",
      highlights: ["Career goal assessment", "Educational background review", "Personal preference analysis"],
      tags: ["Initial Consultation", "Goal Setting", "Profile Building"]
    },
    {
      number: "02",
      title: "Strategic Planning",
      description: "Our experts develop a comprehensive plan that outlines the best opportunities and pathways for your career journey.",
      highlights: ["Opportunity mapping", "Timeline development", "Resource planning"],
      tags: ["Strategy Development", "Opportunity Analysis", "Timeline Planning"]
    },
    {
      number: "03",
      title: "Documentation & Preparation",
      description: "We guide you through all necessary documentation, application processes, and prepare you for interviews.",
      highlights: ["Document preparation", "Application guidance", "Interview coaching"],
      tags: ["Documentation", "Application Support", "Interview Prep"]
    },
    {
      number: "04",
      title: "Application & Submission",
      description: "Our team ensures your applications are submitted correctly and on time, maximizing your chances of success.",
      highlights: ["Application submission", "Quality assurance", "Follow-up coordination"],
      tags: ["Application Management", "Quality Control", "Submission Tracking"]
    },
    {
      number: "05",
      title: "Travel & Relocation",
      description: "We provide comprehensive support for your travel arrangements and initial relocation needs.",
      highlights: ["Travel arrangements", "Accommodation support", "Visa assistance"],
      tags: ["Travel Support", "Relocation Aid", "Visa Processing"]
    },
    {
      number: "06",
      title: "Ongoing Support",
      description: "Our commitment continues with ongoing check-ins and support to ensure your success in your new journey.",
      highlights: ["Regular check-ins", "Continued guidance", "Success monitoring"],
      tags: ["Ongoing Support", "Success Tracking", "Continuous Care"]
    }
  ];

  const services = [
    {
      icon: Globe,
      title: "Visa Application Guidance",
      description: "Expert guidance to navigate the complex visa application process and maximize your chances of success.",
      color: "text-blue-600"
    },
    {
      icon: FileText,
      title: "Document Preparation",
      description: "Professional assistance in preparing all required documents, forms, and supporting materials required for your application.",
      color: "text-green-600"
    },
    {
      icon: Users,
      title: "Interview Coaching",
      description: "One-on-one coaching sessions to help you prepare effective interview questions and prepare a compelling case for immigration officers.",
      color: "text-purple-600"
    },
    {
      icon: Plane,
      title: "Travel & Relocation Support",
      description: "We handle all the logistics of your travel and relocation experience, including flight arrangements, finding flights to arranging housing, so you can focus on starting your new life abroad.",
      color: "text-orange-600"
    },
    {
      icon: Shield,
      title: "Post-Arrival Assistance",
      description: "Our team helps you get settled in your new country, including registering with local authorities, setting up bank accounts and more.",
      color: "text-teal-600"
    },
    {
      icon: CheckCircle,
      title: "Ongoing Check-ins",
      description: "We maintain regular contact to ensure you're adapting well to your new life and are able to access resources and put your initial support.",
      color: "text-red-600"
    }
  ];

  const stats = [
    { number: "10", label: "Successful Course Graduates", suffix: "+" },
    { number: "700", label: "Project Completed", suffix: "+" },
    { number: "5k", label: "Global Happy Clients", suffix: "+" },
    { number: "500", label: "Team Members", suffix: "+" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-[var(--primary-color)]">The Benchmark</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-[var(--body-color)] hover:text-[var(--primary-color)] transition-colors">Home</a>
              <a href="#" className="text-[var(--body-color)] hover:text-[var(--primary-color)] transition-colors">About</a>
              <a href="#" className="text-[var(--body-color)] hover:text-[var(--primary-color)] transition-colors">Services</a>
              <a href="#" className="text-[var(--body-color)] hover:text-[var(--primary-color)] transition-colors">Contact</a>
            </div>
            <button className="btn-primary">Get Quote</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-color-light)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              How We Work
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100">
              Our systematic approach to career development and education consultancy ensures your success every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[var(--secondary-color)] hover:bg-[var(--secondary-color-light)] text-white px-8 py-4 rounded-lg font-medium transition-colors duration-200">
                Start Your Journey
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-[var(--primary-color)] px-8 py-4 rounded-lg font-medium transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Study. Travel. Live</h2>
            <p className="text-lg text-[var(--body-color)] max-w-2xl mx-auto">
              The Benchmark Career Development Centre & Education Consultancy
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="text-4xl md:text-5xl font-bold text-[var(--primary-color)] mb-2">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-sm md:text-base text-[var(--body-color)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Proven Process</h2>
            <p className="text-xl text-[var(--body-color)] max-w-3xl mx-auto">
              We follow a systematic 6-step approach to ensure your success in achieving your career and education goals.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {workSteps.map((step, index) => (
              <div 
                key={index} 
                className={`service-card cursor-pointer transition-all duration-300 ${
                  activeStep === index ? 'ring-2 ring-[var(--secondary-color)]' : ''
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className="flex items-start space-x-4">
                  <div className="step-number">{step.number}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-[var(--body-color)] mb-4">{step.description}</p>
                    <ul className="space-y-2 mb-4">
                      {step.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center text-sm text-[var(--body-color)]">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Comprehensive Services</h2>
            <p className="text-xl text-[var(--body-color)] max-w-3xl mx-auto">
              We provide end-to-end support for your international career and education journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="service-card group">
                <div className={`w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={`w-8 h-8 ${service.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-[var(--body-color)] leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-color-light)] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center">
            <blockquote className="text-2xl md:text-3xl font-light italic mb-8 max-w-4xl mx-auto">
              "We specialize in connecting skilled workers with reputable companies, demonstrating our ability to adapt and respond to evolving needs."
            </blockquote>
            <div className="flex justify-center">
              <button className="bg-[var(--secondary-color)] hover:bg-[var(--secondary-color-light)] text-white px-8 py-4 rounded-lg font-medium transition-colors duration-200 flex items-center">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Providing Online Education &<br />Career Consultancy
            </h2>
            <div className="flex justify-center mb-8">
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
                <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
              </div>
            </div>
            <button className="btn-primary text-lg px-8 py-4">
              Apply For Meeting →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--primary-color)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--secondary-color-light)]">The Benchmark</h3>
              <p className="text-[var(--gray-color)] mb-4">
                Career Development and Education Consultancy
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-[var(--gray-color)] hover:text-[var(--secondary-color-light)] cursor-pointer transition-colors" />
                <Twitter className="w-6 h-6 text-[var(--gray-color)] hover:text-[var(--secondary-color-light)] cursor-pointer transition-colors" />
                <LinkedIn className="w-6 h-6 text-[var(--gray-color)] hover:text-[var(--secondary-color-light)] cursor-pointer transition-colors" />
                <Instagram className="w-6 h-6 text-[var(--gray-color)] hover:text-[var(--secondary-color-light)] cursor-pointer transition-colors" />
              </div>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[var(--secondary-color-light)]">Services</h4>
              <ul className="space-y-2 text-[var(--gray-color)]">
                <li><a href="#" className="hover:text-[var(--secondary-color-light)] transition-colors">Career Guidance</a></li>
                <li><a href="#" className="hover:text-[var(--secondary-color-light)] transition-colors">Student Visa</a></li>
                <li><a href="#" className="hover:text-[var(--secondary-color-light)] transition-colors">Work Permit</a></li>
                <li><a href="#" className="hover:text-[var(--secondary-color-light)] transition-colors">Tours and Travels</a></li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[var(--secondary-color-light)]">Contact Us</h4>
              <div className="space-y-3 text-[var(--gray-color)]">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>14, Flat: 5/1, Chittagong, Bangladesh</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>+880 1957-414962</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>info@thebenchmark.bd.com</span>
                </div>
              </div>
            </div>
            
            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[var(--secondary-color-light)]">Subscribe to our news letter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-l-lg text-black focus:outline-none focus:ring-2 focus:ring-[var(--secondary-color)]"
                />
                <button className="bg-[var(--secondary-color)] hover:bg-[var(--secondary-color-light)] px-4 py-2 rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-[var(--gray-color)] text-sm mt-2">
                Subscribe to our newsletter to get the latest news and updates.
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-[var(--gray-color)]">
            <p>&copy; 2024 The Benchmark. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}