import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Clock, Briefcase, Send, Loader2, AlertCircle, DollarSign } from "lucide-react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const API_URL = "http://localhost:5001/api/jobs";

// ─── Logo helpers ─────────────────────────────────────────────────────────────
const getLogoColor = (name = "") => {
  const colors = [
    "bg-blue-500", "bg-violet-500", "bg-emerald-500", "bg-rose-500",
    "bg-amber-500", "bg-cyan-500", "bg-pink-500", "bg-teal-500",
  ];
  return colors[name.charCodeAt(0) % colors.length];
};

const getLogoInitial = (name = "") => name.charAt(0).toUpperCase() || "?";

// ─── Saved jobs helpers ───────────────────────────────────────────────────────
const getSavedJobs = () => {
  try {
    return JSON.parse(localStorage.getItem("savedJobs") || "[]");
  } catch {
    return [];
  }
};

function ViewJobDetails() {
  const { id } = useParams();

  const [job,     setJob]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [saved,   setSaved]   = useState(false);

  // ─── Fetch job ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error(`Failed to load job (${res.status})`);
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error("ViewJobDetails fetch error:", err);
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  // ─── Sync saved state ────────────────────────────────────────────────────────
  useEffect(() => {
    setSaved(getSavedJobs().some((j) => j._id === id));
  }, [id]);

  // ─── Save / unsave toggle ────────────────────────────────────────────────────
  const handleSaveToggle = () => {
    const savedJobs = getSavedJobs();
    const isSaved   = savedJobs.some((j) => j._id === id);
    const updated   = isSaved
      ? savedJobs.filter((j) => j._id !== id)
      : [...savedJobs, job];
    localStorage.setItem("savedJobs", JSON.stringify(updated));
    setSaved(!isSaved);
  };

  // ─── Loading ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-gray-500">
          <Loader2 size={40} className="animate-spin text-blue-600" />
          <p className="text-base font-medium">Loading job details...</p>
        </div>
      </div>
    );
  }

  // ─── Error ───────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <AlertCircle size={40} className="text-red-500" />
          <h2 className="text-lg font-semibold text-gray-800">Failed to load job</h2>
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

  // ─── Not found ───────────────────────────────────────────────────────────────
  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Job not found.
      </div>
    );
  }

  // ─── Derived values ──────────────────────────────────────────────────────────
  const locationLabel = [job.city, job.state].filter(Boolean).join(", ");

  const salaryLabel =
    job.salaryMin && job.salaryMax
      ? `₹${job.salaryMin.toLocaleString()} – ₹${job.salaryMax.toLocaleString()}`
      : job.salary || "Salary not specified";

  const hoursLabel =
    job.workingTimeStart && job.workingTimeEnd
      ? `${job.workingTimeStart} – ${job.workingTimeEnd}`
      : null;

  // ─── Employer sidebar card ───────────────────────────────────────────────────
  const EmployerCard = () => (
    <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-4 md:p-6">
      {/* Logo */}
      <div
        className={`w-12 h-12 ${getLogoColor(job.workPlaceName)} rounded-xl flex items-center justify-center mb-3`}
      >
        <span className="text-white font-bold text-lg">
          {getLogoInitial(job.workPlaceName)}
        </span>
      </div>

      {/* Company name */}
      <h1 className="font-outfit font-medium text-lg md:text-xl text-gray-900">
        {job.workPlaceName}
      </h1>

      {/* Location */}
      <p className="flex items-center gap-1 text-sm md:text-base text-gray-600 mb-4">
        <MapPin size={16} /> {locationLabel || "Location not specified"}
      </p>

      <p className="font-outfit text-gray-900 mb-2 font-medium text-sm">About</p>
      <p className="text-gray-700 mb-4 text-sm md:text-base">
        {job.companyDescription ||
          "We're a dedicated team committed to excellence and customer satisfaction. Join us to make a difference!"}
      </p>

      {/* Buttons */}
      <div className="flex w-full gap-2">
        <button
          className="
            flex-1 bg-blue-600 text-white px-4 md:px-6 py-2.5 rounded-lg font-outfit
            transition-all duration-200 ease-out
            hover:bg-blue-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]
            flex items-center justify-center gap-2 group text-sm md:text-base
          "
        >
          <Send size={18} className="group-hover:translate-x-0.5 transition-transform" />
          Apply Now
        </button>

        <button
          onClick={handleSaveToggle}
          className="px-3 py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center bg-gray-50 border border-gray-200 shadow-sm relative hover:bg-gray-100 cursor-pointer"
        >
          <FaRegBookmark
            size={20}
            className={`transition-all duration-300 ease-in-out ${
              saved ? "opacity-0 scale-75" : "opacity-100 scale-100 text-blue-600"
            }`}
          />
          <FaBookmark
            size={20}
            className={`absolute transition-all duration-300 ease-in-out ${
              saved ? "opacity-100 scale-100 text-blue-600" : "opacity-0 scale-75"
            }`}
          />
        </button>
      </div>
    </div>
  );

  // ─── Main render ─────────────────────────────────────────────────────────────
  return (
    <div className="bg-gray-50 min-h-screen pt-20 md:pt-36 pb-10 px-3 sm:px-4 md:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Mobile sidebar */}
        <div className="lg:hidden mb-6">
          <EmployerCard />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">

          {/* ── Left scrollable content ── */}
          <div className="lg:col-span-2 lg:max-h-[calc(100vh-180px)] lg:overflow-y-auto">
            <div className="space-y-6 md:space-y-8 pr-0 md:pr-4">

              {/* ── Job Header ── */}
              <div className="rounded-sm bg-white border border-gray-200 shadow-sm p-4 md:p-6">
                <h1 className="text-2xl sm:text-3xl font-outfit font-bold text-gray-900 mb-5">
                  {job.jobTitle}
                </h1>

                {/* 3 pills: Salary | Hours | Job Type */}
                <div className="flex flex-wrap gap-3">

                  {/* Salary */}
                  <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold">
                    <DollarSign size={15} />
                    {salaryLabel}
                  </div>

                  {/* Working Hours */}
                  {hoursLabel && (
                    <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold">
                      <Clock size={15} />
                      {hoursLabel}
                    </div>
                  )}

                  {/* Job Type */}
                  {job.jobType && (
                    <div className="flex items-center gap-2 bg-violet-50 border border-violet-200 text-violet-700 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold">
                      <Briefcase size={15} />
                      {job.jobType}
                    </div>
                  )}

                </div>
              </div>

              {/* ── Job Description ── */}
              <div className="rounded-sm bg-white border border-gray-200 shadow-sm p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold font-outfit mb-4">
                  Job Description
                </h2>

                <p className="text-gray-700 mb-4 leading-relaxed text-sm md:text-base">
                  {job.description ||
                    "We are looking for an enthusiastic and skilled candidate to join our team. The ideal candidate should be passionate about customer service and excellence."}
                </p>

                <h3 className="font-outfit font-semibold text-gray-900 mb-2 text-sm md:text-base">
                  Responsibilities:
                </h3>

                {Array.isArray(job.responsibilities) && job.responsibilities.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm md:text-base">
                    {job.responsibilities.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm md:text-base">
                    <li>Deliver exceptional service to customers</li>
                    <li>Complete assigned tasks with precision</li>
                    <li>Maintain professional standards</li>
                    <li>Work collaboratively with team members</li>
                    <li>Follow company policies and procedures</li>
                  </ul>
                )}
              </div>

              {/* ── Required Skills ── */}
              <div className="rounded-sm bg-white border border-gray-200 shadow-sm p-4 md:p-6">
                <h2 className="font-outfit text-lg md:text-xl font-semibold mb-4">
                  Required Skills
                </h2>

                <div className="flex flex-wrap gap-2 md:gap-3">
                  {Array.isArray(job.skills) && job.skills.length > 0 ? (
                    job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 md:px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs sm:text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    ["Customer Service", "Communication", "Problem Solving", "Team Work", "Time Management"].map(
                      (skill) => (
                        <span
                          key={skill}
                          className="px-3 md:px-4 py-1.5 bg-blue-50 text-gray-600 rounded-full text-xs sm:text-sm font-medium"
                        >
                          {skill}
                        </span> 
                      )
                    )
                  )}
                </div>
              </div>

              {/* ── Location Map ── */}
              <div className="rounded-sm bg-white border border-gray-200 shadow-sm p-4 md:p-6">
                <h3 className="font-outfit text-lg md:text-xl font-semibold mb-3">Location</h3>

                <div className="flex items-center gap-2 text-gray-700 mb-4 text-sm md:text-base">
                  <MapPin size={18} />
                  {locationLabel || "Location not specified"}
                </div>

                {locationLabel && (
                  <div className="h-40 md:h-48 rounded-lg overflow-hidden border">
                    <iframe
                      title="Job Location Map"
                      src={`https://www.google.com/maps?q=${encodeURIComponent(locationLabel)}&output=embed`}
                      className="w-full h-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* ── Right sticky sidebar (desktop only) ── */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-36 h-fit">
              <EmployerCard />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ViewJobDetails;