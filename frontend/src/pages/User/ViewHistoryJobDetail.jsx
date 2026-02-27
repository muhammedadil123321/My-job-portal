import React from "react";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Clock,
  Calendar,
  CheckCircle,
  IndianRupee,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const ViewHistoryJobDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const application = location.state?.application;

  // If user refreshes or opens URL directly without state
  if (!application) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Application data not available
          </h2>
          <p className="text-gray-600 mb-4 text-sm">
            Please go back to your application history and open the job again.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Applications
          </button>
        </div>
      </div>
    );
  }

  const jobSnapshot = application.jobSnapshot || {};
  const jobRef = application.job || {};

  // Prefer snapshot data (so view still works even if job changes/deletes),
  // but fall back to populated job fields if needed.
  const job = {
    workPlaceName: jobSnapshot.workPlaceName || jobRef.workPlaceName || "Company",
    jobTitle: jobSnapshot.jobTitle || jobRef.jobTitle || "Job Title",
    jobSummary: jobSnapshot.jobSummary || "",
    responsibilities: jobSnapshot.responsibilities || [],
    requiredSkills: jobSnapshot.requiredSkills || [],
    salaryMin: jobSnapshot.salaryMin,
    salaryMax: jobSnapshot.salaryMax,
    salaryType: jobSnapshot.salaryType,
    jobType: jobSnapshot.jobType || jobRef.jobType,
    workplaceAddress: jobSnapshot.workplaceAddress,
    city: jobSnapshot.city || jobRef.city,
    state: jobSnapshot.state || jobRef.state,
    country: jobSnapshot.country,
    workingTimeStart: jobSnapshot.workingTimeStart,
    workingTimeEnd: jobSnapshot.workingTimeEnd,
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-50 text-green-700 border border-green-300";
      case "rejected":
        return "bg-red-50 text-red-700 border border-red-300";
      default:
        return "bg-blue-50 text-blue-700 border border-blue-300";
    }
  };

  const getStatusDisplay = (status) => {
    if (!status) return "Pending";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatTime = (time) => {
    if (!time) return "-";
    const [h, m] = time.split(":");
    const hour = Number(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    return `${hour % 12 || 12}:${m} ${ampm}`;
  };

  const formatSalary = (min, max) => {
    if (!min || !max) return "Not specified";
    return `₹${Number(min).toLocaleString("en-IN")} - ₹${Number(
      max
    ).toLocaleString("en-IN")}`;
  };

  const getJobTypeDisplay = (jobType) => {
    const typeMap = {
      "part-time": "Part-time",
      hourly: "Hourly",
      "weekend-time": "Weekend-time",
      "season-time": "Season-time",
    };
    return typeMap[jobType] || jobType || "N/A";
  };

  const appliedDate =
    (application.appliedDate || application.createdAt) &&
    new Date(application.appliedDate || application.createdAt).toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Applications
          </button>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {job.workPlaceName}
              </h1>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                {job.jobTitle}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div
                  className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold ${getStatusStyle(
                    application.status
                  )}`}
                >
                  <CheckCircle className="w-4 h-4 mr-1.5" />
                  {getStatusDisplay(application.status)}
                </div>
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">
                    {getJobTypeDisplay(job.jobType || application.jobType)}
                  </span>
                </div>
                {(job.city || job.state) && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>
                      {job.city}, {job.state}
                    </span>
                  </div>
                )}
                {appliedDate && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>Applied on {appliedDate}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Summary */}
            {job.jobSummary && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Job Summary
                </h2>
                <p className="text-gray-700 leading-relaxed">{job.jobSummary}</p>
              </div>
            )}

            {/* Responsibilities */}
            {Array.isArray(job.responsibilities) && job.responsibilities.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Key Responsibilities
                </h2>
                <div className="space-y-3">
                  {job.responsibilities.map((resp, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-semibold mt-0.5">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 flex-1">{resp}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Required Skills */}
            {Array.isArray(job.requiredSkills) && job.requiredSkills.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Required Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.requiredSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md border border-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Info Cards */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Salary */}
              {(job.salaryMin || job.salaryMax) && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <IndianRupee className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">
                      Salary Range
                    </h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {formatSalary(job.salaryMin, job.salaryMax)}
                  </p>
                  {job.salaryType && (
                    <p className="text-sm text-gray-600">Per {job.salaryType}</p>
                  )}
                </div>
              )}

              {/* Working Hours */}
              {(job.workingTimeStart || job.workingTimeEnd) && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">
                      Working Hours
                    </h3>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 block mb-1">
                    {formatTime(job.workingTimeStart)} -{" "}
                    {formatTime(job.workingTimeEnd)}
                  </span>
                  <span className="text-sm text-gray-600">Timing</span>
                </div>
              )}

              {/* Work Location */}
              {(job.workplaceAddress || job.city || job.state || job.country) && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-orange-600" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">
                      Work Location
                    </h3>
                  </div>
                  <div className="space-y-1 mb-4">
                    {job.workplaceAddress && (
                      <p className="text-sm font-semibold text-gray-900">
                        {job.workplaceAddress}
                      </p>
                    )}
                    {(job.city || job.state) && (
                      <p className="text-sm text-gray-600">
                        {job.city}, {job.state}
                      </p>
                    )}
                    {job.country && (
                      <p className="text-sm text-gray-600">{job.country}</p>
                    )}
                  </div>

                  {job.workplaceAddress && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="w-full h-64 bg-gray-100 rounded-md overflow-hidden border border-gray-300">
                        <iframe
                          src={`https://maps.google.com/maps?q=${encodeURIComponent(
                            (job.workplaceAddress || "") +
                              ", " +
                              (job.city || "") +
                              ", " +
                              (job.state || "") +
                              ", " +
                              (job.country || "")
                          )}&output=embed`}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          loading="lazy"
                          title="Job Location Map"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewHistoryJobDetail;