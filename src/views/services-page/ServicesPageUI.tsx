"use client";

import {
  Globe,
  FileText,
  Users,
  Shield,
  ArrowRight,
  GraduationCap,
  Briefcase,
  HardHat,
  Building,
  Wrench,
  Factory,
} from "lucide-react";
import { MotionDiv } from "@/utils/framer.motion";
import CTASection from "@/components/cta-section/CTASection";

const ServicesPageUI = () => {

  const studentServices = [
    {
      icon: GraduationCap,
      title: "University Application Support",
      description:
        "Comprehensive guidance for university and college admissions, course selection, and application processes.",
      color: "text-[var(--secondary-color)]",
    },
    {
      icon: FileText,
      title: "Student Visa Assistance",
      description:
        "Expert support for student visa applications, documentation, and interview preparation.",
      color: "text-[var(--primary-color-light)]",
    },
    {
      icon: Users,
      title: "Academic Counseling",
      description:
        "Personalized academic guidance to help you choose the right educational path for your career goals.",
      color: "text-[var(--quaternary-color)]",
    },
    {
      icon: Globe,
      title: "Language Training",
      description:
        "IELTS, TOEFL, and language preparation courses to meet international education requirements.",
      color: "text-blue-600",
    },
  ];

  const workerServices = [
    {
      icon: HardHat,
      title: "Construction & Skilled Trades",
      description:
        "Connect with construction companies across Europe for positions in welding, masonry, plumbing, tiling, and painting.",
      color: "text-orange-600",
    },
    {
      icon: Factory,
      title: "Manufacturing & Industrial",
      description:
        "Opportunities in manufacturing facilities, production lines, and industrial operations across multiple countries.",
      color: "text-[var(--primary-color-light)]",
    },
    {
      icon: Building,
      title: "Engineering & Technical",
      description:
        "Technical positions for qualified engineers and technicians in various European markets.",
      color: "text-[var(--quaternary-color)]",
    },
    {
      icon: Wrench,
      title: "Maintenance & Operations",
      description:
        "Maintenance roles, equipment operation, and facility management positions with competitive salaries.",
      color: "text-[var(--secondary-color)]",
    },
    {
      icon: Briefcase,
      title: "Work Permit Processing",
      description:
        "Complete work permit and visa processing assistance for European countries including Lithuania, Croatia, Serbia, and Romania.",
      color: "text-blue-600",
    },
    {
      icon: Shield,
      title: "Legal & Documentation Support",
      description:
        "Professional assistance with all legal requirements, documentation, and compliance for international employment.",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center">
            <MotionDiv>
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--primary-color)] mb-6">
                Explore Our Services
              </h1>
            </MotionDiv>
            <MotionDiv>
              <p className="text-lg text-[var(--body-color)] max-w-4xl mx-auto leading-relaxed">
                We offer comprehensive support including application assistance
                for university and college admissions, guidance on selecting or
                changing courses, and support for student visas. We provide
                recognition of prior learning (RPL) and skills assessments, as
                well as coaching for language tests like PTE, NAATI, and IELTS.
                Our services extend to high school program assistance, arrival
                support such as housing and employment, and comprehensive
                migration consulting. We also offer various training courses
                including HACCP, workplace safety, general worker training, and
                hospitality operations. Additionally, we provide programs
                focused on sustainable tourism development.
              </p>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Student Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <MotionDiv>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--secondary-color-light)] mb-4">
                🎓 Student Services
              </h2>
            </MotionDiv>
           <MotionDiv>
           <p className="text-lg text-[var(--body-color)] max-w-3xl mx-auto">
              Comprehensive educational support and guidance for students
              pursuing international education opportunities.
            </p>
           </MotionDiv>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {studentServices.map((service, index) => (
              <MotionDiv
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group"
              >
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className={`w-8 h-8 ${service.color}`} />
                </div>
                <h3 className="text-xl font-bold text-[var(--primary-color)] mb-4">
                  {service.title}
                </h3>
                <p className="text-[var(--body-color)] leading-relaxed mb-6">
                  {service.description}
                </p>
                <button className="w-full bg-[var(--secondary-color)] hover:bg-[var(--secondary-color-light)] text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                  APPLY
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Worker Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
           <MotionDiv>
           <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-color-light)] mb-4">
              🧰 Worker Services
            </h2>
           </MotionDiv>
           <MotionDiv>
           <p className="text-lg text-[var(--body-color)] max-w-3xl mx-auto">
              International job opportunities with comprehensive support for
              skilled workers seeking employment abroad.
            </p>
           </MotionDiv>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workerServices.map((service, index) => (
              <MotionDiv
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group"
              >
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className={`w-8 h-8 ${service.color}`} />
                </div>
                <h3 className="text-xl font-bold text-[var(--primary-color)] mb-4">
                  {service.title}
                </h3>
                <p className="text-[var(--body-color)] leading-relaxed mb-6">
                  {service.description}
                </p>
                <button className="w-full bg-[var(--secondary-color)] hover:bg-[var(--secondary-color-light)] text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                  APPLY
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      <CTASection/>

    </div>
  );
};
export default ServicesPageUI;
