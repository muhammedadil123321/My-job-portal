import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { MapPin } from "lucide-react";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load saved jobs from localStorage
    const savedJobsFromStorage = localStorage.getItem("savedJobs");
    if (savedJobsFromStorage) {
      try {
        setSavedJobs(JSON.parse(savedJobsFromStorage));
      } catch (error) {
        console.error("Error parsing saved jobs:", error);
        setSavedJobs([]);
      }
    }
  }, []);

  const handleUnsave = (jobId) => {
    const updatedSavedJobs = savedJobs.filter((job) => job.id !== jobId);
    setSavedJobs(updatedSavedJobs);
    localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
  };

  const handleViewDetails = (jobId) => {
    navigate(`/view-job/${jobId}`);
  };

  if (savedJobs.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen pt-20 md:pt-36 pb-10 px-3 sm:px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-8 md:p-12 text-center">
            <FaRegBookmark className="mx-auto text-gray-400 mb-4" size={64} />
            <h2 className="text-2xl font-outfit font-semibold text-gray-900 mb-2">
              No Saved Jobs
            </h2>
            <p className="text-gray-600 mb-6">
              Start saving jobs you're interested in to view them here.
            </p>
            <button
              onClick={() => navigate("/findjob")}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-outfit hover:bg-blue-700 transition-colors"
            >
              Browse Jobs
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-20 md:pt-36 pb-10 px-3 sm:px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-outfit font-bold text-gray-900 mb-2">
            Saved Jobs
          </h1>
          <p className="text-gray-600">
            You have {savedJobs.length} saved job{savedJobs.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {savedJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 md:p-6 hover:shadow-md transition"
            >
              {/* Header with Logo and Save Button */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 ${job.logoColor} rounded-xl flex items-center justify-center`}
                >
                  <span className="text-white font-bold text-lg">
                    {job.companyLogo}
                  </span>
                </div>
                <button
                  onClick={() => handleUnsave(job.id)}
                  className="p-2 rounded-lg transition-all duration-300 flex items-center justify-center bg-gray-50 border-gray-200 cursor-pointer shadow-sm border hover:bg-gray-100"
                >
                  <FaBookmark
                    size={20}
                    className="text-blue-600"
                  />
                </button>
              </div>

              {/* Company Name */}
              <h3 className="text-gray-800 font-semibold text-sm mb-1">
                {job.companyName}
              </h3>

              {/* Job Title */}
              <h2 className="text-lg md:text-xl font-outfit font-bold text-gray-900 mb-3">
                {job.jobTitle}
              </h2>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                <MapPin size={16} />
                {job.location}
              </div>

              {/* Salary */}
              <div className="text-gray-700 text-sm mb-3">
                <span className="font-semibold text-green-600">{job.salary}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 text-xs rounded-full bg-blue-50 text-gray-600 font-medium">
                  {job.tags}
                </span>
                {job.category && (
                  <span className="px-3 py-1 text-xs rounded-full bg-gray-50 text-gray-600 font-medium">
                    {job.category}
                  </span>
                )}
              </div>

              {/* View Details Button */}
              <button
                onClick={() => handleViewDetails(job.id)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SavedJobs;
