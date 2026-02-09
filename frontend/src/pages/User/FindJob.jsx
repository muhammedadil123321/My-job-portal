import React, { useEffect, useState } from "react";
import jobData from "../../jobDetails/jobCardDetails";
import { useNavigate } from "react-router-dom";
import { Send, Filter, X } from "lucide-react";

function FindJob() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState(null);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const navigate = useNavigate();

  // Load job data on component mount
  useEffect(() => {
    setJobs(jobData);
    setFilteredJobs(jobData);
  }, []);

  // Filter logic - applies both job type and distance filters
  const applyFilters = () => {
    let result = jobs;

    if (selectedJobType) {
      result = result.filter((job) => job.tags === selectedJobType);
    }

    if (selectedDistance) {
      result = result.filter((job) => {
        if (selectedDistance === "0-5") return job.distance <= 5;
        if (selectedDistance === "5-10")
          return job.distance > 5 && job.distance <= 10;
        if (selectedDistance === "10-20")
          return job.distance > 10 && job.distance <= 20;
        if (selectedDistance === "20+") return job.distance > 20;
        return true;
      });
    }

    setFilteredJobs(result);
    setShowMobileFilter(false); // Close mobile filter after applying
  };

  // Handle Job Type changes
  const handleJobTypeChange = (jobType) => {
    if (selectedJobType === jobType) {
      setSelectedJobType(null);
    } else {
      setSelectedJobType(jobType);
    }
  };

  // Handle Distance changes
  const handleDistanceChange = (distance) => {
    if (selectedDistance === distance) {
      setSelectedDistance(null);
    } else {
      setSelectedDistance(distance);
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedJobType(null);
    setSelectedDistance(null);
    setFilteredJobs(jobs);
    setShowMobileFilter(false);
  };

  // Navigate to job details page
  const handleJobDetails = (jobId) => {
    navigate(`/view-job/${jobId}`);
  };

  // Filter Sidebar Component (used for both desktop and mobile)
  const FilterSidebar = () => (
    <div className="bg-white h-fit border-2 border-gray-200 p-4 shadow-sm rounded-md">
      {/* FILTER: Job Type */}
      <h3 className="text-gray-800 font-semibold mb-4 text-sm">
        Filter by Job Type
      </h3>

      <div className="flex flex-col gap-3 text-sm text-gray-700">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 cursor-pointer"
            checked={selectedJobType === "Part-time"}
            onChange={() => handleJobTypeChange("Part-time")}
          />
          Part-time
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 cursor-pointer"
            checked={selectedJobType === "Hourly"}
            onChange={() => handleJobTypeChange("Hourly")}
          />
          Hourly
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 cursor-pointer"
            checked={selectedJobType === "Weekend Jobs"}
            onChange={() => handleJobTypeChange("Weekend Jobs")}
          />
          Weekend Jobs
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 cursor-pointer"
            checked={selectedJobType === "Seasonal"}
            onChange={() => handleJobTypeChange("Seasonal")}
          />
          Seasonal
        </label>
      </div>

      {/* FILTER: Distance */}
      <h3 className="text-gray-800 font-semibold mt-6 mb-4 text-sm">
        Filter by Distance
      </h3>

      <div className="flex flex-col gap-3 text-sm text-gray-700">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 cursor-pointer"
            checked={selectedDistance === "0-5"}
            onChange={() => handleDistanceChange("0-5")}
          />
          Within 0–5 km
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 cursor-pointer"
            checked={selectedDistance === "5-10"}
            onChange={() => handleDistanceChange("5-10")}
          />
          Within 5–10 km
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 cursor-pointer"
            checked={selectedDistance === "10-20"}
            onChange={() => handleDistanceChange("10-20")}
          />
          Within 10–20 km
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 cursor-pointer"
            checked={selectedDistance === "20+"}
            onChange={() => handleDistanceChange("20+")}
          />
          Above 20+ km
        </label>
      </div>

      {/* Action Buttons */}
      <button
        onClick={applyFilters}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2.5 rounded-sm mt-6"
      >
        Apply Filters
      </button>

      <button
        onClick={clearAllFilters}
        className="block text-center bg-blue-50 p-2.5 rounded-sm w-full mt-3 text-gray-700 border border-gray-200 text-sm font-semibold hover:bg-gray-100"
      >
        Clear All
      </button>
    </div>
  );

  return (
    <div className="w-full min-h-screen pt-10">
      {/* Main Layout */}
      <div className="max-w-[1400px] w-full mx-auto flex flex-col lg:flex-row gap-6 lg:gap-10 mt-8 lg:mt-16 px-4 pb-12">
        
        {/* DESKTOP FILTER SIDEBAR - Hidden on mobile */}
        <div className="hidden lg:block lg:w-1/5">
          <FilterSidebar />
        </div>

        {/* MOBILE FILTER BUTTON - Only visible on mobile */}
        <button
          onClick={() => setShowMobileFilter(true)}
          className="lg:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-40 flex items-center gap-2 hover:bg-blue-700"
        >
          <Filter size={20} />
          <span className="font-medium">Filters</span>
        </button>

        {/* MOBILE FILTER MODAL */}
        {showMobileFilter && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
            <div className="bg-white w-full rounded-t-3xl max-h-[85vh] overflow-y-auto animate-slide-up">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
                <button
                  onClick={() => setShowMobileFilter(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Filter Content */}
              <div className="p-4">
                <FilterSidebar />
              </div>
            </div>
          </div>
        )}

        {/* RIGHT SIDE: JOB CARDS */}
        <div className="flex-1 bg-white p-2 lg:p-4">
          {/* Results Header & Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 pb-6">
            {/* Showing Results Count */}
            <p className="text-xs sm:text-sm text-gray-900 bg-gray-50 w-fit px-3 py-2.5 rounded-sm shadow-sm font-medium">
              Available <span className="font-bold">{filteredJobs.length}</span>{" "}
              jobs
            </p>

            {/* Search Bar */}
            <div className="flex items-center bg-gray-50 border border-gray-200 gap-2 h-[46px] px-3 sm:px-6 rounded-sm shadow-sm flex-1">
              <svg width="20" height="20" fill="#6B7280" viewBox="0 0 30 30" className="flex-shrink-0">
                <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
              </svg>

              <input
                type="text"
                placeholder="Find jobs"
                className="w-full h-full outline-none text-gray-500 bg-transparent text-sm"
              />

              <button className="bg-indigo-500 w-20 sm:w-32 h-9 rounded-full text-xs sm:text-sm text-white hover:bg-indigo-600 flex-shrink-0">
                Search
              </button>
            </div>
          </div>

          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-5 hover:shadow-lg transition"
                >
                  {/* Company Logo */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 ${job.logoColor} rounded-xl flex items-center justify-center`}
                    >
                      <span className="text-white font-bold text-base sm:text-lg">
                        {job.companyLogo}
                      </span>
                    </div>
                  </div>

                  {/* Company Name & Job Title */}
                  <div>
                    <h4 className="text-gray-800 font-semibold text-xs sm:text-sm">
                      {job.companyName}
                    </h4>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                      {job.jobTitle}
                    </h3>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm mb-2">
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13 21.314 8.343 16.657a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="truncate">{job.location}</span>
                  </div>

                  {/* Distance */}
                  <div className="flex items-center gap-2 text-blue-600 text-xs sm:text-sm mb-2 font-medium">
                    📍 {job.distance} km away
                  </div>

                  {/* Salary */}
                  <div className="flex items-center gap-2 text-gray-700 text-xs sm:text-sm mb-4">
                    <svg
                      className="w-4 h-4 text-gray-500 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-10V4m0 16v-4"
                      />
                    </svg>
                    {job.salary}
                  </div>

                  {/* Job Type Tag */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700 font-semibold">
                      {job.tags}
                    </span>
                  </div>

                  {/* Easy Apply Button */}
               
                  <button
                    onClick={() => handleJobDetails(job.id)}
                    className="w-[120px] sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 sm:py-3 px-4 sm:px-3 rounded-lg transition flex items-center justify-center gap-1.5 text-xs sm:text-sm whitespace-nowrap"
                  >
                    <Send size={16} />
                    Easy Apply
                  </button>
                  
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-base sm:text-lg">
                  No jobs match your filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindJob;