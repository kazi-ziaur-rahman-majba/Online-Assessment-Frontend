"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, User, CreditCard, MapPin } from "lucide-react"
import { MotionDiv } from "@/utils/framer.motion"

const AppluPageUI = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
        country: "",
        profession: "",
        presentAddress: "",
        permanentAddress: "",
        acceptTerms: false,
        subscribeNewsletter: false,
      })
    
      const [uploadedFiles, setUploadedFiles] = useState({
        profileImage: null,
        nidImage: null,
        passportImage: null,
        resume: null,
      })
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        setFormData((prev) => ({
          ...prev,
          [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }))
      }
    
      const handleFileUpload = (fileType: string, file: File | null) => {
        setUploadedFiles((prev) => ({
          ...prev,
          [fileType]: file,
        }))
      }
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Form submitted:", formData, uploadedFiles)
      }
    
      return (
        <div className="min-h-screen bg-gray-50">
          {/* Main Form */}
          <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-primary-light p-8 text-white">
                <MotionDiv>
                <h2 className="text-3xl font-bold mb-2">Application Form</h2>
                </MotionDiv>
                <MotionDiv>
                <p className="!text-gray-light">Please fill out all required information to complete your application</p>

                </MotionDiv>
                </div>
    
                <form onSubmit={handleSubmit} className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Personal Information */}
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <MotionDiv>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                          <User className="w-5 h-5 mr-2 text-primary" />
                          Personal Information
                        </h3>
    
                        </MotionDiv>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <MotionDiv>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent transition-all"
                              placeholder="Enter your full name"
                            />
                          </MotionDiv>
    
                          <MotionDiv>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent transition-all"
                              placeholder="Enter your email"
                            />
                          </MotionDiv>
    
                          <MotionDiv>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              required
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent transition-all"
                              placeholder="Enter your phone number"
                            />
                          </MotionDiv>
    
                          <MotionDiv>
                            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                              Date of Birth *
                            </label>
                            <input
                              type="date"
                              id="dateOfBirth"
                              name="dateOfBirth"
                              required
                              value={formData.dateOfBirth}
                              onChange={handleInputChange}
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent transition-all"
                            />
                          </MotionDiv>
    
                          <MotionDiv>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                              Gender *
                            </label>
                            <select
                              id="gender"
                              name="gender"
                              required
                              value={formData.gender}
                              onChange={handleInputChange}
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent transition-all"
                            >
                              <option value="">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                          </MotionDiv>
    
                          <MotionDiv>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                              Country *
                            </label>
                            <select
                              id="country"
                              name="country"
                              required
                              value={formData.country}
                              onChange={handleInputChange}
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent transition-all"
                            >
                              <option value="">Select Country</option>
                              <option value="bangladesh">Bangladesh</option>
                              <option value="india">India</option>
                              <option value="pakistan">Pakistan</option>
                              <option value="usa">United States</option>
                              <option value="uk">United Kingdom</option>
                              <option value="canada">Canada</option>
                            </select>
                          </MotionDiv>
                        </div>
    
                        <MotionDiv className="mt-4">
                          <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-1">
                            Profession *
                          </label>
                          <select
                            id="profession"
                            name="profession"
                            required
                            value={formData.profession}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent transition-all"
                          >
                            <option value="">Select Profession</option>
                            <option value="student">Student</option>
                            <option value="engineer">Engineer</option>
                            <option value="doctor">Doctor</option>
                            <option value="teacher">Teacher</option>
                            <option value="business">Business Professional</option>
                            <option value="other">Other</option>
                          </select>
                        </MotionDiv>
                      </div>
    
                      {/* Address Information */}
                      <MotionDiv>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                          <MapPin className="w-5 h-5 mr-2 text-primary" />
                          Address Information
                        </h3>
    
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="presentAddress" className="block text-sm font-medium text-gray-700 mb-1">
                              Present Address *
                            </label>
                            <textarea
                              id="presentAddress"
                              name="presentAddress"
                              required
                              rows={3}
                              value={formData.presentAddress}
                              onChange={handleInputChange}
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent transition-all resize-none"
                              placeholder="Enter your current address"
                            />
                          </div>
    
                          <div>
                            <label htmlFor="permanentAddress" className="block text-sm font-medium text-gray-700 mb-1">
                              Permanent Address *
                            </label>
                            <textarea
                              id="permanentAddress"
                              name="permanentAddress"
                              required
                              rows={3}
                              value={formData.permanentAddress}
                              onChange={handleInputChange}
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent transition-all resize-none"
                              placeholder="Enter your permanent address"
                            />
                          </div>
                        </div>
                      </MotionDiv>
                    </div>
    
                    {/* Right Column - File Uploads */}
                    <MotionDiv className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                          <Upload className="w-5 h-5 mr-2 text-primary" />
                          Document Uploads
                        </h3>
    
                        {/* Profile Image */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image *</label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-light transition-colors cursor-pointer">
                            <User className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600">Click to upload profile image</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</p>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload("profileImage", e.target.files?.[0] || null)}
                            />
                          </div>
                        </div>
    
                        {/* NID Image */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">National ID Image *</label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-light transition-colors cursor-pointer">
                            <CreditCard className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600">Click to upload NID image</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</p>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload("nidImage", e.target.files?.[0] || null)}
                            />
                          </div>
                        </div>
    
                        {/* Passport Image */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Passport Image</label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-light transition-colors cursor-pointer">
                            <CreditCard className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600">Click to upload passport image</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</p>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload("passportImage", e.target.files?.[0] || null)}
                            />
                          </div>
                        </div>
    
                        {/* Resume Upload */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Resume/CV *</label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-light transition-colors cursor-pointer">
                            <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600">Click to upload resume</p>
                            <p className="text-xs text-gray-400 mt-1">PDF only, up to 5MB</p>
                            <input
                              type="file"
                              accept=".pdf"
                              className="hidden"
                              onChange={(e) => handleFileUpload("resume", e.target.files?.[0] || null)}
                            />
                          </div>
                        </div>
                      </div>
                    </MotionDiv>
                  </div>
    
                  {/* Terms and Submit */}
                  <MotionDiv className="mt-8 pt-6 border-t border-gray-200">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="acceptTerms"
                          name="acceptTerms"
                          required
                          checked={formData.acceptTerms}
                          onChange={handleInputChange}
                          className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <label htmlFor="acceptTerms" className="ml-3 text-sm text-gray-700">
                          I accept the{" "}
                          <a href="#" className="text-primary hover:text-primary-light underline">
                            license terms and agreements
                          </a>{" "}
                          *
                        </label>
                      </div>
    
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="subscribeNewsletter"
                          name="subscribeNewsletter"
                          checked={formData.subscribeNewsletter}
                          onChange={handleInputChange}
                          className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <label htmlFor="subscribeNewsletter" className="ml-3 text-sm text-gray-700">
                          Subscribe to newsletter for updates and opportunities
                        </label>
                      </div>
                    </div>
    
                    <div className="mt-8 flex justify-center">
                      <button
                        type="submit"
                        className="bg-secondary hover:bg-secondary-light text-white font-semibold py-4 px-12 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 shadow-lg"
                      >
                        Submit Application
                      </button>
                    </div>
                  </MotionDiv>
                </form>
              </div>
            </div>
          </div>
        </div>
      )
}

export default AppluPageUI