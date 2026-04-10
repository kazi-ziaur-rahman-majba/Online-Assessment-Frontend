"use client";

import CTABanner from "@/components/cta-section/CTABanner";
import Counter, { MotionDiv } from "@/utils/framer.motion";
import {
  Globe,
  FileText,
  Users,
  Plane,
  Shield,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

const HomePageUI = () => {
  const stats = [
    { number: 10, label: "Successful Course Graduates", suffix: "+" },
    { number: 700, label: "Project Completed", suffix: "+" },
    { number: 5, label: "Global Happy Clients", suffix: "k+" },
    { number: 500, label: "Team Members", suffix: "+" },
  ];

  const services = [
    {
      icon: Globe,
      title: "Visa Application Guidance",
      description:
        "Expert guidance to navigate the complex visa application process and maximize your chances of success.",
      color: "text-[var(--quaternary-color)]",
    },
    {
      icon: FileText,
      title: "Document Preparation",
      description:
        "Professional assistance in preparing all required documents, forms and supporting materials required for your application.",
      color: "text-[var(--secondary-color)]",
    },
    {
      icon: Users,
      title: "Interview Coaching",
      description:
        "One-on-one coaching sessions to help you prepare effective interview questions and present a compelling case to immigration officers.",
      color: "text-[var(--primary-color-light)]",
    },
    {
      icon: Plane,
      title: "Travel & Relocation Support",
      description:
        "We handle all the logistics of your travel and relocation experience, including booking flights to arranging housing, so you can focus on starting your new life abroad.",
      color: "text-orange-600",
    },
    {
      icon: Shield,
      title: "Post-Arrival Assistance",
      description:
        "Our team helps you get settled in your new country, including registering with local authorities, setting up bank accounts and more.",
      color: "text-blue-600",
    },
    {
      icon: CheckCircle,
      title: "Ongoing Check-ins",
      description:
        "We maintain regular contact to ensure you're adapting well to your new life and are able to access resources and put your initial support.",
      color: "text-yellow-600",
    },
  ];

  const eventImages = [
    "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400",
  ];

  return (
    <div className="min-h-screen bg-red-500">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Professional consultation"
            className="w-full h-full object-cover"
            width={200}
            height={200}
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          {/* Bokeh Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-orange-400/20"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
          <MotionDiv>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Loyalty is our
              <br />
              <span className="text-[var(--secondary-color-light)]">
                commitment
              </span>
            </h1>
          </MotionDiv>
          <MotionDiv>
            <p className="text-xl md:text-2xl !text-gray-light mb-8 max-w-2xl mx-auto">
              Building lasting relationships through dedicated career
              development and education consultancy services.
            </p>
          </MotionDiv>
          <MotionDiv>
            <button className="bg-[var(--secondary-color)] hover:bg-[var(--secondary-color-light)] text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get Quote →
            </button>
          </MotionDiv>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-[var(--primary-color)] py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <MotionDiv>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Study. Travel. Live
              </h2>
            </MotionDiv>
            <MotionDiv>
              <p className="text-lg !text-gray-light">
                BanglaBriz Career Development Centre & Education Consultancy
              </p>
            </MotionDiv>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-6xl font-bold text-white mb-2">
                  <Counter value={stat.number} direction="up" />
                  <span className="text-[var(--secondary-color)]">
                    {stat.suffix}
                  </span>
                </div>
                <MotionDiv className="text-sm md:text-base !text-gray-light">
                  {stat.label}
                </MotionDiv>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Section - Updated Layout */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <MotionDiv>
                  <Image
                    src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Global career opportunities"
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                    width={200}
                    height={200}
                  />
                </MotionDiv>
                {/* Globe overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--quaternary-color)]/20 to-transparent rounded-2xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <MotionDiv className="w-24 h-24 rounded-full bg-[var(--quaternary-color)]/90 flex items-center justify-center backdrop-blur-sm">
                    <Globe className="w-12 h-12 text-white" />
                  </MotionDiv>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="order-1 lg:order-2">
              <MotionDiv>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Start your career
                  <br />
                  <span className="text-[var(--quaternary-color)]">
                    anywhere in the world
                  </span>
                </h2>
              </MotionDiv>
              <MotionDiv>
                <p className="text-lg !text-gray-light leading-relaxed mb-8">
                  Our premier matching infrastructure and international
                  partnerships enable us to connect top global companies with
                  workers based on their preferences. We provide comprehensive
                  support to help you achieve your career goals in any country
                  you choose.
                </p>
              </MotionDiv>
              <div className="space-y-4 mb-8">
                <MotionDiv className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[var(--quaternary-color)] mr-3" />
                  <span className="!text-gray-light">
                    Global network of partner companies
                  </span>
                </MotionDiv>
                <MotionDiv delay={2.5} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[var(--quaternary-color)] mr-3" />
                  <span className="!text-gray-light">
                    Personalized career matching
                  </span>
                </MotionDiv>
                <MotionDiv className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[var(--quaternary-color)] mr-3" />
                  <span className="!text-gray-light">
                    End-to-end relocation support
                  </span>
                </MotionDiv>
              </div>
              <MotionDiv>
                <button className="bg-[var(--secondary-color)] hover:bg-[var(--secondary-color-light)] text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center">
                  Explore Opportunities
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </MotionDiv>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <MotionDiv
                key={index}
                delay={index * 0.1}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 group"
              >
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className={`w-8 h-8 ${service.color}`} />
                </div>
                <h3 className="text-xl font-bold text-[var(--primary-color)] mb-4">
                  {service.title}
                </h3>
                <p className="text-[var(--body-color)] leading-relaxed">
                  {service.description}
                </p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Highlight Statement - Updated with Gradient Background */}
      <section className="py-20 bg-gradient-to-br from-[var(--secondary-color)] via-[var(--secondary-color-light)] to-[var(--primary-color-light)] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-lg"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center">
          <MotionDiv>
            <h2 className="text-2xl md:text-3xl font-semibold text-white leading-relaxed">
              We specialize in connecting skilled workers with reputable
              companies, demonstrating our ability to adapt and respond to
              evolving needs.
            </h2>
          </MotionDiv>
        </div>
      </section>

      {/* Events Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-12">
            <MotionDiv>
              <p className="text-[var(--body-color)] mb-2">Our Activities</p>
            </MotionDiv>
            <MotionDiv>
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary-color)] mb-4">
                Explore recent events
              </h2>
            </MotionDiv>
            <MotionDiv>
              <a
                href="#"
                className="text-[var(--secondary-color)] hover:text-[var(--secondary-color-light)] font-medium flex items-center"
              >
                More on Our Facebook →
              </a>
            </MotionDiv>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {eventImages.map((image, index) => (
              <MotionDiv
                delay={0.25 * index}
                key={index}
                className="group cursor-pointer"
              >
                <Image
                  src={image}
                  alt={`Event ${index + 1}`}
                  className="w-full h-64 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                  width={200}
                  height={200}
                />
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
};
export default HomePageUI;
