import { MotionDiv } from '@/utils/framer.motion'
import React from 'react'

const CTASection = () => {
  return (
    <section className="py-20 bg-[var(--quaternary-color)]">
    <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
      <MotionDiv>
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
        Ready to Start Your Journey?
      </h2>
      </MotionDiv>
      <MotionDiv>
      <p className="text-xl !text-gray-light mb-8 max-w-3xl mx-auto">
        Contact us today to discuss your career goals and find the perfect
        opportunity that matches your skills and aspirations.
      </p>
      </MotionDiv>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
       <MotionDiv>
       <button className="bg-[var(--secondary-color)] hover:bg-[var(--secondary-color-light)] text-white px-8 py-4 rounded-lg font-medium transition-colors duration-200">
          Apply Now
        </button>
       </MotionDiv>
       <MotionDiv>
       <button className="border-2 border-white text-white hover:bg-white hover:text-[var(--quaternary-color)] px-8 py-4 rounded-lg font-medium transition-all duration-200">
          Schedule Consultation
        </button>
       </MotionDiv>
      </div>
    </div>
  </section>
  )
}

export default CTASection