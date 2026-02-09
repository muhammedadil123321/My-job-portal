import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Clock, Briefcase, Send } from "lucide-react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import jobData from "../../jobDetails/jobCardDetails";

function ViewJobDetails() {
  const { id } = useParams();
  const selectedJob = jobData.find((job) => job.id === Number(id));

  // Check if job is saved in localStorage
  const getSavedJobs = () => {
    const savedJobsFromStorage = localStorage.getItem("savedJobs");
    if (savedJobsFromStorage) {
      try {
        return JSON.parse(savedJobsFromStorage);
      } catch (error) {
        return [];
      }
    }
    return [];
  };

  const [active, setActive] = useState(() => {
    const savedJobs = getSavedJobs();
    return savedJobs.some((job) => job.id === Number(id));
  });

  // Sync saved state when job id changes or component mounts
  useEffect(() => {
    const savedJobs = getSavedJobs();
    const isSaved = savedJobs.some((job) => job.id === Number(id));
    setActive(isSaved);
  }, [id]);

  const handleSaveToggle = () => {
    const savedJobs = getSavedJobs();
    const isCurrentlySaved = savedJobs.some((job) => job.id === Number(id));

    if (isCurrentlySaved) {
      // Remove from saved jobs
      const updatedSavedJobs = savedJobs.filter((job) => job.id !== Number(id));
      localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
      setActive(false);
    } else {
      // Add to saved jobs
      const updatedSavedJobs = [...savedJobs, selectedJob];
      localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
      setActive(true);
    }
  };

  if (!selectedJob) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Job not found
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-20 md:pt-36 pb-10 px-3 sm:px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* RIGHT SIDEBAR - MOVES TO TOP ON SMALL SCREENS */}
        <div className="lg:hidden mb-6">
          <div className="sticky top-20 h-fit">
            {/* Employer Card */}
            <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-4 md:p-6">
              <div
                className={`w-12 h-12 ${selectedJob.logoColor} rounded-xl flex items-center justify-center mb-3`}
              >
                <span className="text-white font-bold text-lg">
                  {selectedJob.companyLogo}
                </span>
              </div>

              <h1 className="font-outfit font-medium text-lg md:text-xl text-gray-900">
                {selectedJob.companyName}
              </h1>

              <p className="flex text-sm md:text-base items-center gap-1 text-gray-600 mb-4">
                <MapPin size={16} /> {selectedJob.location}
              </p>

              <p className="font-outfit text-gray-900 mb-2 font-medium text-sm">About</p>

              <p className="text-gray-700 mb-4 text-sm md:text-base">
                {selectedJob.companyDescription ||
                  "We're a dedicated team committed to excellence and customer satisfaction. Join us to make a difference!"}
              </p>

              <div className="flex w-full gap-2 flex-col sm:flex-row">
                <button
                  className="
                    flex-1
                    bg-blue-600 text-white px-4 md:px-6 py-2.5 rounded-lg font-outfit 
                    transition-all duration-200 ease-out
                    hover:bg-blue-700
                    hover:shadow-lg
                    hover:scale-[1.02]
                    active:scale-[0.98]
                    flex items-center justify-center gap-2
                    group
                    text-sm md:text-base
                  "
                >
                  <Send size={18} className="group-hover:translate-x-0.5 transition-transform" />
                  Apply Now
                </button>
              {/* save button */}
                <button
                  onClick={handleSaveToggle}
                  className="px-3 md:px-2.5 py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center bg-gray-50 border-gray-200 cursor-pointer shadow-sm border relative hover:bg-gray-100"
                >
                  {/* Outline icon */}
                  <FaRegBookmark
                    size={20}
                    className={`transition-all duration-300 ease-in-out
                      ${active ? "opacity-0 scale-75" : "opacity-100 scale-100 text-blue-600"}
                    `}
                  />

                  {/* Filled icon */}
                  <FaBookmark
                    size={20}
                    className={`absolute transition-all duration-300 ease-in-out
                      ${active ? "opacity-100 scale-100 text-blue-600" : "opacity-0 scale-75"}
                    `}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 ">
          
          {/* LEFT CONTENT - SCROLLABLE Y AXIS */}
          <div className="lg:col-span-2 lg:max-h-[calc(100vh-180px)] lg:overflow-y-auto">

            <div className="space-y-6 md:space-y-8 pr-0 md:pr-4">
              
              {/* Job Header */}
              <div className="rounded-sm bg-white border-gray-200 border shadow-sm p-4 md:p-6">
                <h1 className="text-2xl sm:text-3xl font-outfit font-bold text-gray-900 mb-4">
                  {selectedJob.jobTitle}
                </h1>

                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-600 text-xs sm:text-sm">
                  <span className="font-semibold text-green-600">
                    {selectedJob.salary}
                  </span>

                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    {selectedJob.timing || "Hours not specified"}
                  </div>

                  <div className="flex items-center gap-2">
                    <Briefcase size={16} />
                    {selectedJob.tags}
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="rounded-sm bg-white border-gray-200 border shadow-sm p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold font-outfit mb-4">Job Description</h2>

                <p className="text-gray-700 mb-4 leading-relaxed text-sm md:text-base">
                  {selectedJob.description ||
                    "We are looking for an enthusiastic and skilled candidate to join our team. The ideal candidate should be passionate about customer service and excellence."}
                </p>

                <h3 className="font-outfit font-semibold text-gray-900 mb-2 text-sm md:text-base">
                  Responsibilities:
                </h3>

                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm md:text-base">
                  <li>Deliver exceptional service to customers</li>
                  <li>Complete assigned tasks with precision</li>
                  <li>Maintain professional standards</li>
                  <li>Work collaboratively with team members</li>
                  <li>Follow company policies and procedures</li>
                </ul>
              </div>

              {/* Required Skills */}
              <div className="rounded-sm bg-white border-gray-200 border shadow-sm p-4 md:p-6">
                <h2 className="font-outfit text-lg md:text-xl font-semibold mb-4">Required Skills</h2>

                <div className="flex flex-wrap gap-2 md:gap-3">
                  {selectedJob.skills && selectedJob.skills.length > 0
                    ? selectedJob.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 md:px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs sm:text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))
                    : [
                        "Customer Service",
                        "Communication",
                        "Problem Solving",
                        "Team Work",
                        "Time Management",
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="px-3 md:px-4 py-1.5 bg-blue-50 text-gray-600 rounded-full text-xs sm:text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                </div>
              </div>

              {/* Location */}
              <div className="rounded-sm bg-white border-gray-200 border shadow-sm p-4 md:p-6">
                <h3 className="font-outfit text-lg md:text-xl font-semibold mb-3">Location</h3>

                <div className="flex items-center gap-2 text-gray-700 mb-4 text-sm md:text-base">
                  <MapPin size={18} />
                  {selectedJob.location}
                </div>

                <div className="h-40 md:h-48 rounded-lg overflow-hidden border">
                  <iframe
                    title="Job Location Map"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      selectedJob.location
                    )}&output=embed`}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR - HIDDEN ON SMALL SCREENS, SHOWS ON DESKTOP */}
          <div className="hidden lg:block lg:col-span-1 ">
            <div className="sm:sticky top-20 md:top-36 h-fit ">
              {/* Employer Card */}
              <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-4 md:p-6">
                <div
                  className={`w-12 h-12 ${selectedJob.logoColor} rounded-xl flex items-center justify-center mb-3`}
                >
                  <span className="text-white font-bold text-lg">
                    {selectedJob.companyLogo}
                  </span>
                </div>

                <h1 className="font-outfit font-medium text-lg md:text-xl text-gray-900">
                  {selectedJob.companyName}
                </h1>

                <p className="flex text-sm md:text-base items-center gap-1 text-gray-600 mb-4">
                  <MapPin size={16} /> {selectedJob.location}
                </p>

                <p className="font-outfit text-gray-900 mb-2 font-medium text-sm">About</p>

                <p className="text-gray-700 mb-4 text-sm md:text-base">
                  {selectedJob.companyDescription ||
                    "We're a dedicated team committed to excellence and customer satisfaction. Join us to make a difference!"}
                </p>

                <div className="flex w-full gap-2 flex-cols sm:flex-row">
                  <button
                    className="
                      sm:w-1/2 w-full
                      bg-blue-600 text-white px-4 md:px-6 py-2.5 rounded-lg font-outfit 
                      transition-all duration-200 ease-out
                      hover:bg-blue-700
                      hover:shadow-lg
                      hover:scale-[1.02]
                      active:scale-[0.98]
                      flex items-center justify-center gap-2
                      group
                      text-sm md:text-base
                    "
                  >
                    <Send size={18} className="group-hover:translate-x-0.5 transition-transform" />
                    Apply Now
                  </button>

                  <button
                    onClick={handleSaveToggle}
                    className="px-3 md:px-2.5 py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center bg-gray-50 border-gray-200 cursor-pointer shadow-sm border relative hover:bg-gray-100"
                  >
                    {/* Outline icon */}
                    <FaRegBookmark
                      size={20}
                      className={`transition-all duration-300 ease-in-out
                        ${active ? "opacity-0 scale-75" : "opacity-100 scale-100 text-blue-600"}
                      `}
                    />

                    {/* Filled icon */}
                    <FaBookmark
                      size={20}
                      className={`absolute transition-all duration-300 ease-in-out
                        ${active ? "opacity-100 scale-100 text-blue-600" : "opacity-0 scale-75"}
                      `}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewJobDetails;