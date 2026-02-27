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
            You have {savedJobs.length} saved job
            {savedJobs.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {savedJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 md:p-5 hover:shadow-lg transition"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                {/* Logo */}
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center">
                  {job.employer?.profileImage ? (
                    <img
                      src={job.employer.profileImage}
                      alt={job.workPlaceName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {job.workPlaceName?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Unsave */}
                <button
                  onClick={() => handleUnsave(job._id)}
                  className="p-2 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition"
                >
                  <FaBookmark size={18} className="text-blue-600" />
                </button>
              </div>

              {/* Company */}
              <h4 className="text-gray-800 font-semibold text-sm">
                {job.workPlaceName}
              </h4>

              {/* Job title */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {job.jobTitle}
              </h3>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <MapPin size={16} />
                {[job.district, job.state].filter(Boolean).join(", ")}
              </div>

              {/* Salary */}
              <div className="text-sm mb-3">
                <span className="font-semibold text-gray-900">
                  ₹{job.salaryMin} – ₹{job.salaryMax}
                </span>
                <span className="text-gray-500 ml-1">/ {job.salaryType}</span>
              </div>

              {/* Job Type */}
              <div className="mb-4">
                <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700 font-medium">
                  {job.jobType}
                </span>
              </div>

              {/* View button */}
              <button
                onClick={() => handleViewDetails(job._id)}
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
