import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Filter, X, AlertCircle, Loader2,MapPin } from "lucide-react";
import { IndianRupee } from "lucide-react";

const JOB_TYPE_OPTIONS = [
  { label: "Part-time", value: "part-time" },
  { label: "Hourly", value: "hourly" },
  { label: "Weekend Jobs", value: "weekend-time" },
  { label: "Seasonal", value: "season-time" },
];

function FindJob() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState(null);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  // Fetch jobs from backend on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("http://localhost:5001/api/jobs");

        if (!response.ok) {
          throw new Error(
            `Failed to fetch jobs: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err.message || "Something went wrong while fetching jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // ── Apply Filters — runs ONLY when Apply Filters / Search button is clicked ───
  const applyFilters = () => {
    let result = jobs;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (job) =>
          job.jobTitle?.toLowerCase().includes(query) ||
          job.workPlaceName?.toLowerCase().includes(query) ||
          job.city?.toLowerCase().includes(query) ||
          job.state?.toLowerCase().includes(query)
      );
    }

    // ✅ Job type filter — selectedJobType holds backend value e.g. "part-time"
    if (selectedJobType) {
      result = result.filter(
        (job) => job.jobType?.toLowerCase() === selectedJobType.toLowerCase()
      );
    }

    // Distance filter
    if (selectedDistance) {
      result = result.filter((job) => {
        const d = job.distance;
        if (d === undefined || d === null) return false;
        if (selectedDistance === "0-5") return d <= 5;
        if (selectedDistance === "5-10") return d > 5 && d <= 10;
        if (selectedDistance === "10-20") return d > 10 && d <= 20;
        if (selectedDistance === "20+") return d > 20;
        return true;
      });
    }

    setFilteredJobs(result);
    setShowMobileFilter(false);
  };

  // ── Live search as user types (search only, does NOT apply type/distance) ─────
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    let result = jobs;

    if (query.trim()) {
      const lower = query.toLowerCase();
      result = result.filter(
        (job) =>
          job.jobTitle?.toLowerCase().includes(lower) ||
          job.workPlaceName?.toLowerCase().includes(lower) ||
          job.city?.toLowerCase().includes(lower) ||
          job.state?.toLowerCase().includes(lower)
      );
    }

    setFilteredJobs(result);
  };

  // ── Checkbox toggles — ONLY update state, do NOT trigger filtering ────────────
  // ✅ stores backend value e.g. "part-time", NOT the label "Part-time"
  const handleJobTypeChange = (value) => {
    setSelectedJobType((prev) => (prev === value ? null : value));
  };

  const handleDistanceChange = (distance) => {
    setSelectedDistance((prev) => (prev === distance ? null : distance));
  };

  const clearAllFilters = () => {
    setSelectedJobType(null);
    setSelectedDistance(null);
    setSearchQuery("");
    setFilteredJobs(jobs);
    setShowMobileFilter(false);
  };

  const handleJobDetails = (jobId) => {
    navigate(`/view-job/${jobId}`);
  };

  const getLogoColor = (name = "") => {
    const colors = [
      "bg-blue-500",
      "bg-violet-500",
      "bg-emerald-500",
      "bg-rose-500",
      "bg-amber-500",
      "bg-cyan-500",
      "bg-pink-500",
      "bg-teal-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getLogoInitial = (name = "") => name.charAt(0).toUpperCase() || "?";

  // ─── Filter Sidebar ───────────────────────────────────────────────────────────
  const FilterSidebar = () => (
    <div className="bg-white h-fit border-2 border-gray-200 p-4 shadow-sm rounded-md">
      {/* Job Type */}
      <h3 className="text-gray-800 font-semibold mb-4 text-sm">
        Filter by Job Type
      </h3>
      <div className="flex flex-col gap-3 text-sm text-gray-700">
        {/* ✅ value used for state/compare, label shown in UI */}
        {JOB_TYPE_OPTIONS.map(({ label, value }) => (
          <label key={value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 cursor-pointer"
              checked={selectedJobType === value}
              onChange={() => handleJobTypeChange(value)}
            />
            {label}
          </label>
        ))}
      </div>

      {/* Distance */}
      <h3 className="text-gray-800 font-semibold mt-6 mb-4 text-sm">
        Filter by Distance
      </h3>
      <div className="flex flex-col gap-3 text-sm text-gray-700">
        {[
          { label: "Within 0–5 km", value: "0-5" },
          { label: "Within 5–10 km", value: "5-10" },
          { label: "Within 10–20 km", value: "10-20" },
          { label: "Above 20+ km", value: "20+" },
        ].map(({ label, value }) => (
          <label key={value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 cursor-pointer"
              checked={selectedDistance === value}
              onChange={() => handleDistanceChange(value)}
            />
            {label}
          </label>
        ))}
      </div>

      {/* Action Buttons */}
      <button
        onClick={applyFilters}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2.5 rounded-sm mt-6 transition"
      >
        Apply Filters
      </button>
      <button
        onClick={clearAllFilters}
        className="block text-center bg-blue-50 p-2.5 rounded-sm w-full mt-3 text-gray-700 border border-gray-200 text-sm font-semibold hover:bg-gray-100 transition"
      >
        Clear All
      </button>
    </div>
  );

  // ─── Loading State ────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-gray-500">
          <Loader2 size={40} className="animate-spin text-blue-600" />
          <p className="text-base font-medium">Fetching available jobs...</p>
        </div>
      </div>
    );
  }

  // ─── Error State ──────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <AlertCircle size={40} className="text-red-500" />
          <h2 className="text-lg font-semibold text-gray-800">
            Failed to load jobs
          </h2>
          <p className="text-sm text-gray-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ─── Main Render ──────────────────────────────────────────────────────────────
  return (
    <div className="w-full min-h-screen pt-10">
      <div className="max-w-[1400px] w-full mx-auto flex flex-col lg:flex-row gap-6 lg:gap-10 mt-8 lg:mt-16 px-4 pb-12">
        {/* DESKTOP FILTER SIDEBAR */}
        <div className="hidden lg:block lg:w-1/5">
          <FilterSidebar />
        </div>

        {/* MOBILE FILTER FAB */}
        <button
          onClick={() => setShowMobileFilter(true)}
          className="lg:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-40 flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <Filter size={20} />
          <span className="font-medium">Filters</span>
        </button>

        {/* MOBILE FILTER MODAL */}
        {showMobileFilter && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
            <div className="bg-white w-full rounded-t-3xl max-h-[85vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
                <button
                  onClick={() => setShowMobileFilter(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-4">
                <FilterSidebar />
              </div>
            </div>
          </div>
        )}

        {/* JOB CARDS SECTION */}
        <div className="flex-1 bg-white p-2 lg:p-4">
          {/* Results Count + Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 pb-6">
            <p className="text-xs sm:text-sm text-gray-900 bg-gray-50 w-fit px-3 py-2.5 rounded-sm shadow-sm font-medium whitespace-nowrap">
              Available <span className="font-bold">{filteredJobs.length}</span>{" "}
              jobs
            </p>

            <div className="flex items-center bg-gray-50 border border-gray-200 gap-2 h-[46px] px-3 sm:px-6 rounded-sm shadow-sm flex-1">
              <svg
                width="20"
                height="20"
                fill="#6B7280"
                viewBox="0 0 30 30"
                className="flex-shrink-0"
              >
                <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
              </svg>

              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search by title, company, or location"
                className="w-full h-full outline-none text-gray-500 bg-transparent text-sm"
              />

              <button
                onClick={applyFilters}
                className="bg-indigo-500 w-20 sm:w-32 h-9 rounded-full text-xs sm:text-sm text-white hover:bg-indigo-600 flex-shrink-0 transition"
              >
                Search
              </button>
            </div>
          </div>

          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-5 hover:shadow-lg transition"
                >
                  {/* Company Logo Avatar */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 ${getLogoColor(
                        job.workPlaceName
                      )} rounded-xl flex items-center justify-center`}
                    >
                      <span className="text-white font-bold text-base sm:text-lg">
                        {getLogoInitial(job.workPlaceName)}
                      </span>
                    </div>
                  </div>

                  {/* Workplace Name & Job Title */}
                  <div>
                    <h4 className="text-gray-800 font-semibold text-xs sm:text-sm truncate">
                      {job.workPlaceName}
                    </h4>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 truncate">
                      {job.jobTitle}
                    </h3>
                  </div>

                  {/* City & State */}
                  <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm mb-2">
                    <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span className="truncate">
                      {[job.city, job.state].filter(Boolean).join(", ")}
                    </span>
                  </div>

                  {/* Distance (only shown if available) */}
                  {job.distance !== undefined && (
                    <div className="flex items-center gap-2 text-blue-600 text-xs sm:text-sm mb-2 font-medium">
                      📍 {job.distance} km away
                    </div>
                  )}

                  {/* Salary */}
                  <div className="flex items-center gap-2 text-gray-700 text-xs sm:text-sm mb-4">
                    <IndianRupee className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span>
                      {job.salaryMin} - {job.salaryMax}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    {/* Easy Apply Button */}
                    <button
                      onClick={() => handleJobDetails(job._id)}
                      className="w-[120px] sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 sm:py-1 px-4 sm:px-2 rounded-lg transition flex items-center justify-center gap-1.5 text-xs sm:text-sm whitespace-nowrap"
                    >
                      <Send size={16} />
                      Easy Apply
                    </button>

                    {/* ✅ Job Type Tag — shows human label instead of raw DB value */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700 font-semibold">
                        {JOB_TYPE_OPTIONS.find((o) => o.value === job.jobType)
                          ?.label || job.jobType}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-base sm:text-lg">
                  No jobs match your filters
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 text-sm text-blue-600 hover:underline font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindJob;
