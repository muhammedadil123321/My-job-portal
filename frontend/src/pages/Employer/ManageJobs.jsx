import React, { useState, useContext } from 'react';
import { Search, Plus, Edit, Eye, Users, Trash2, Calendar, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { JobContext } from "../../context/JobContext";

const ManageJobs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const { jobs, deleteJob } = useContext(JobContext);

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || job.jobStatus === statusFilter.toLowerCase();
    const matchesType = typeFilter === "All" || job.jobType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Status badge styling
  const getStatusStyle = (status) => {
    switch(status) {
      case "active":
        return "bg-green-100 text-green-700 border border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case "rejected":
        return "bg-red-100 text-red-700 border border-red-300";
      case "blocked":
        return "bg-gray-100 text-gray-700 border border-gray-300";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  // Display status text (capitalize first letter)
  const getStatusDisplay = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Display job type text with proper formatting
  const getJobTypeDisplay = (jobType) => {
    const typeMap = {
      "part-time": "Part-time",
      "hourly": "Hourly",
      "weekend-time": "Weekend-time",
      "season-time": "Season-time"
    };
    return typeMap[jobType] || jobType;
  };

  const openDeleteModal = (jobId) => {
    setSelectedJobId(jobId);
    setShowDeleteModal(true);
  };

  const handleDeleteJob = () => {
    deleteJob(selectedJobId);
    setShowDeleteModal(false);
    setSelectedJobId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manage Jobs</h1>
              <p className="mt-1 text-sm text-gray-600">View and manage all your job postings</p>
            </div>
            <button 
              className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              onClick={() => navigate('/employer/post-job')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                Search Jobs
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by job title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                Job Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                Job Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Types</option>
                <option value="part-time">Part-time</option>
                <option value="hourly">Hourly</option>
                <option value="weekend-time">Weekend-time</option>
                <option value="season-time">Season-time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          // Empty State
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchTerm || statusFilter !== "All" || typeFilter !== "All" 
                  ? "No jobs found" 
                  : "No jobs posted yet"}
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                {searchTerm || statusFilter !== "All" || typeFilter !== "All"
                  ? "Try adjusting your filters to find what you're looking for"
                  : "Get started by posting your first job opening"}
              </p>
              {!searchTerm && statusFilter === "All" && typeFilter === "All" && (
                <button 
                  className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                  onClick={() => navigate('/employer/post-job')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Post Your First Job
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredJobs.map((job) => (
              <div 
                key={job.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
              >
                <div className="p-5">
                  <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                    {/* Left Side - Job Info */}
                    <div className="flex-1">
                      {/* Status Badge */}
                      <div className="mb-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold ${getStatusStyle(job.jobStatus)}`}>
                          {getStatusDisplay(job.jobStatus)}
                        </span>
                      </div>

                      {/* Job Title */}
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        {job.jobTitle}
                      </h3>

                      {/* Job Details */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">{getJobTypeDisplay(job.jobType)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span>Posted {new Date(job.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="font-semibold text-blue-600">{job.applications} Applicants</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Actions */}
                    <div className="flex flex-row gap-2 lg:min-w-[140px]">
                      <button
                        onClick={() => navigate(`view-job/${job.id}`)}
                        className="flex-1 lg:flex-none inline-flex items-center justify-center px-2 py-2 text-sm font-medium text-blue-700 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        <Eye className="w-4 h-4 lg:mr-2" />
                        <span className="hidden lg:inline text-xs">View</span>
                      </button>
                      
                      <button
                        onClick={() => navigate(`edit-job/${job.id}`)}
                        className="flex-1 lg:flex-none inline-flex items-center justify-center px-2 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        <Edit className="w-4 h-4 lg:mr-2" />
                        <span className="hidden lg:inline text-xs">Edit</span>
                      </button>
                      
                      <button
                        onClick={() => openDeleteModal(job.id)}
                        className="flex-1 lg:flex-none inline-flex items-center justify-center px-2 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-300 rounded-md hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 lg:mr-2" />
                        <span className="hidden lg:inline text-xs">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Delete Job Posting</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Are you sure you want to delete this job posting? This action cannot be undone and all associated applications will be removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteJob}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
              >
                Delete Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageJobs;