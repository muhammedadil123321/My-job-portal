import React from "react";
import { UserPlus, Search, MousePointerClick, Building2, Briefcase, UserCheck } from "lucide-react";

export default function HowToWorks() {
 
  return (
    <section className={`py-16 bg-linear-to-tr from-white to-slate-100 transition-all duration-1000`}>
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* Title */}
        <h2 data-aos="zoom-in" className="text-3xl md:text-4xl font-bold mb-3 font-outfit">How It Works</h2>
        <p data-aos="zoom-in" className="text-md sm:text-lg text-gray-800 mb-12 font-poppins">
          Simple steps for workers and employers.
        </p>

        {/* 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 text-left shadow-sm rounded-md">

          {/* Workers Column */}
          <div data-aos="fade-right" className="  p-8 rounded-xl">
            <h3 className="font-outfit text-xl font-semibold mb-6 text-center md:text-left ">
              For Workers
            </h3>

            {/* Step 1 */}
            <div className="flex items-start gap-4 mb-2 relative">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 flex justify-center items-center bg-blue-700 text-white rounded-lg shadow-sm">
                  <UserPlus className="w-6 h-6" />
                </div>
                <div className="w-0.5 h-16 bg-linear-to-t from-blue-300 to-gray-800 rounded-full mt-2"></div>
              </div>
              <div className="flex-1">
                <span className="text-xs font-semibold text-gray-600 uppercase">Step 1</span>
                <h4 className="font-semibold">Sign Up & Create Profile</h4>
                <p className="text-gray-600 text-sm">
                  Create your account with basic details.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4 mb-2 relative">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 flex justify-center items-center bg-blue-700 to-blue-400 text-white rounded-lg shadow-sm">
                  <Search className="w-6 h-6" />
                </div>
                <div className="w-0.5 h-16 bg-linear-to-t from-blue-300 to-gray-800 rounded-full mt-2"></div>
              </div>
              <div className="flex-1">
                <span className="text-xs font-semibold text-gray-600 uppercase">Step 2</span>
                <h4 className="font-semibold">Find Jobs</h4>
                <p className="text-gray-600 text-sm">
                  Browse nearby part-time and daily jobs.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 flex justify-center items-center bg-blue-700  text-white rounded-lg shadow-sm">
                  <MousePointerClick className="w-6 h-6" />
                </div>
              </div>
              <div className="flex-1">
                <span className="text-xs font-semibold text-gray-600 uppercase">Step 3</span>
                <h4 className="font-semibold">Apply</h4>
                <p className="text-gray-600 text-sm">
                  Open the job and apply with one click.
                </p>
              </div>
            </div>
          </div>

          {/* Employers Column */}
          <div data-aos="fade-left" className="  rounded-xl p-8">
            <h3 className="text-xl font-outfit font-semibold mb-6 text-center md:text-left">
              For Employers
            </h3>

            {/* Step 1 */}
            <div className="flex items-start gap-4 mb-2 relative">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 flex justify-center items-center bg-blue-700 text-white rounded-lg shadow-sm">
                  <Building2 className="w-6 h-6" />
                </div>
               <div className="w-0.5 h-16 bg-linear-to-t from-blue-300 to-gray-800 rounded-full mt-2"></div>
              </div>
              <div className="flex-1">
                <span className="text-xs font-semibold text-gray-600 uppercase">Step 1</span>
                <h4 className="font-semibold">Create Account</h4>
                <p className="text-gray-600 text-sm">
                  Register as an employer.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4 mb-2 relative">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 flex justify-center items-center bg-blue-700 to-gray-900 text-white rounded-lg shadow-sm">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="w-0.5 h-16 bg-linear-to-t from-blue-300 to-gray-800 rounded-full mt-2"></div>
              </div>
              <div className="flex-1">
                <span className="text-xs font-semibold text-gray-600 uppercase">Step 2</span>
                <h4 className="font-semibold">Post a Job</h4>
                <p className="text-gray-600 text-sm">
                  Add job details like pay, location, and timing.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 flex justify-center items-center bg-blue-700 to-gray-900 text-white rounded-lg shadow-sm">
                  <UserCheck className="w-6 h-6" />
                </div>
              </div>
              <div className="flex-1">
                <span className="text-xs font-semibold text-gray-600 uppercase">Step 3</span>
                <h4 className="font-semibold">Select Worker</h4>
                <p className="text-gray-600 text-sm">
                  View applications and choose the right worker.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}