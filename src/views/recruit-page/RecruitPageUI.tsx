"use client"
import { MotionDiv } from '@/utils/framer.motion';
import { Building2, MapPin, Upload } from 'lucide-react';
import React, { useState } from 'react';

const RecruitPageUI = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    businessEmail: '',
    contactEmail: '',
    address: '',
    country: '',
    website: '',
    phoneNumber: '',
    companySize: '',
    industry: '',
    jobDescription: '',
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    companyProfile: null,
    jobDescription: null,
    additionalDocs: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (fileType: string, file: File | null) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [fileType]: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Recruitment form submitted:', formData, uploadedFiles);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Form */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-secondary to-secondary-light p-8 text-white">
            <MotionDiv>
            <h2 className="text-3xl font-bold mb-2">Recruitment Partnership</h2>
            </MotionDiv>
             <MotionDiv>
             <p className="text-red-100">
                Partner with us to find the best talent for your organization
              </p>
             </MotionDiv>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Company Information */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                   <MotionDiv>
                   <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Building2 className="w-5 h-5 mr-2 text-primary" />
                      Company Information
                    </h3>

                   </MotionDiv>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <MotionDiv className="md:col-span-2">
                        <label
                          htmlFor="companyName"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Company Name *
                        </label>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          required
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                          placeholder="Enter your company name"
                        />
                      </MotionDiv>

                      <MotionDiv>
                        <label
                          htmlFor="businessEmail"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Business Email *
                        </label>
                        <input
                          type="email"
                          id="businessEmail"
                          name="businessEmail"
                          required
                          value={formData.businessEmail}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                          placeholder="company@domain.com"
                        />
                      </MotionDiv>

                      <MotionDiv>
                        <label
                          htmlFor="contactEmail"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Contact Email *
                        </label>
                        <input
                          type="email"
                          id="contactEmail"
                          name="contactEmail"
                          required
                          value={formData.contactEmail}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                          placeholder="hr@company.com"
                        />
                      </MotionDiv>

                      <MotionDiv>
                        <label
                          htmlFor="phoneNumber"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          required
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                          placeholder="Enter contact number"
                        />
                      </MotionDiv>

                      <MotionDiv>
                        <label
                          htmlFor="website"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Website <span className="text-gray-400">(optional)</span>
                        </label>
                        <input
                          type="url"
                          id="website"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                          placeholder="https://www.company.com"
                        />
                      </MotionDiv>

                      <MotionDiv>
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Country *
                        </label>
                        <select
                          id="country"
                          name="country"
                          required
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                        >
                          <option value="">Select Country</option>
                          <option value="bangladesh">Bangladesh</option>
                          <option value="india">India</option>
                          <option value="pakistan">Pakistan</option>
                          <option value="usa">United States</option>
                          <option value="uk">United Kingdom</option>
                          <option value="canada">Canada</option>
                          <option value="australia">Australia</option>
                          <option value="singapore">Singapore</option>
                        </select>
                      </MotionDiv>

                      <MotionDiv>
                        <label
                          htmlFor="companySize"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Company Size *
                        </label>
                        <select
                          id="companySize"
                          name="companySize"
                          required
                          value={formData.companySize}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                        >
                          <option value="">Select Company Size</option>
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-500">201-500 employees</option>
                          <option value="501-1000">501-1000 employees</option>
                          <option value="1000+">1000+ employees</option>
                        </select>
                      </MotionDiv>

                      <MotionDiv>
                        <label
                          htmlFor="industry"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Industry *
                        </label>
                        <select
                          id="industry"
                          name="industry"
                          required
                          value={formData.industry}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                        >
                          <option value="">Select Industry</option>
                          <option value="technology">Technology</option>
                          <option value="finance">Finance & Banking</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="education">Education</option>
                          <option value="manufacturing">Manufacturing</option>
                          <option value="retail">Retail</option>
                          <option value="consulting">Consulting</option>
                          <option value="other">Other</option>
                        </select>
                      </MotionDiv>
                    </div>

                    <MotionDiv className="mt-4">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Company Address *
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        required
                        rows={3}
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all resize-none"
                        placeholder="Enter complete company address"
                      />
                    </MotionDiv>
                  </div>

                  {/* Job Requirements */}
                  <div>
                   <MotionDiv>
                   <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-primary" />
                      Recruitment Requirements
                    </h3>
                   </MotionDiv>

                    <MotionDiv>
                      <label
                        htmlFor="jobDescription"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Job Description & Requirements *
                      </label>
                      <textarea
                        id="jobDescription"
                        name="jobDescription"
                        required
                        rows={6}
                        value={formData.jobDescription}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all resize-none"
                        placeholder="Describe the positions you're looking to fill, required qualifications, experience level, and any specific requirements..."
                      />
                    </MotionDiv>
                  </div>
                </div>

                {/* Right Column - Document Uploads */}
                <div className="space-y-6">
                  <MotionDiv>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Upload className="w-5 h-5 mr-2 text-primary" />
                      Relevant Documents
                    </h3>

                    {/* Company Profile */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Profile *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-secondary transition-colors cursor-pointer">
                        <Building2 className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">Upload company profile</p>
                        <p className="text-xs text-gray-400 mt-1">PDF, DOC up to 5MB</p>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload('companyProfile', e.target.files?.[0] || null)
                          }
                        />
                      </div>
                    </div>

                    {/* Job Description Document */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Detailed Job Description
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-secondary transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">Upload job description</p>
                        <p className="text-xs text-gray-400 mt-1">PDF, DOC up to 5MB</p>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload('jobDescription', e.target.files?.[0] || null)
                          }
                        />
                      </div>
                    </div>

                    {/* Additional Documents */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Documents
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-secondary transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">Upload additional docs</p>
                        <p className="text-xs text-gray-400 mt-1">PDF, DOC up to 5MB</p>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload('additionalDocs', e.target.files?.[0] || null)
                          }
                        />
                      </div>
                    </div>

                    {/* Partnership Benefits */}
                    <div className="bg-gray-50 rounded-lg p-4 mt-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Partnership Benefits</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Access to pre-screened candidates</li>
                        <li>• Reduced hiring time and costs</li>
                        <li>• Quality assurance guarantee</li>
                        <li>• Ongoing recruitment support</li>
                      </ul>
                    </div>
                  </MotionDiv>
                </div>
              </div>

              {/* Submit Button */}
              <MotionDiv className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-secondary hover:bg-secondary-light text-white font-semibold py-4 px-16 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 shadow-lg text-lg"
                  >
                    Proceed with Partnership
                  </button>
                </div>
                <p className="text-center text-sm text-gray-500 mt-3">
                  Our team will review your submission and contact you within 24-48 hours
                </p>
              </MotionDiv>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitPageUI;
