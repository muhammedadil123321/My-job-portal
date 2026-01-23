import React, { useState, useContext } from "react";
import {
  Trash2,
  Search,
  Filter,
  Building2,
  Briefcase,
  X,
  Eye,
  Ban,
  BeanOff,
  CheckCircle,
} from "lucide-react";
import { JobContext } from "../../context/JobContext";
import { useNavigate } from "react-router-dom";

function JobManagement() {
  // Use context to get jobs and global functions
  const navigate = useNavigate();
  const { jobs, deleteJob, approveJob, rejectJob, blockJob, unblockJob } =
    useContext(JobContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Handle accept/approve
  const handleAccept = (jobId) => {
    approveJob(jobId);
  };

  // Handle reject
  const handleReject = (jobId) => {
    rejectJob(jobId);
  };

  // Handle block
  const handleBlock = (jobId) => {
    blockJob(jobId);
  };

  // Handle unblock
  const handleUnblock = (jobId) => {
    unblockJob(jobId);
  };

  // Handle delete
  const handleDelete = (jobId) => {
    if (
      window.confirm("Are you sure you want to permanently delete this job?")
    ) {
      deleteJob(jobId);
    }
  };

  // Filter jobs based on search and status
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.workPlaceName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || job.jobStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Status badge styles
  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: "bg-amber-100 text-amber-700 border-amber-200",
      active: "bg-green-100 text-green-700 border-green-200",
      rejected: "bg-red-100 text-red-700 border-red-200",
      blocked: "bg-gray-100 text-gray-700 border-gray-200",
      closed: "bg-slate-100 text-slate-700 border-slate-200",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Render action buttons based on job status
  const getActionButtons = (job) => {
    return (
      <div className="flex gap-2 flex-wrap">
        {/* View always visible */}
        <button
          onClick={() => navigate(`view-postjob/${job.id}`)}
          className="flex-1 lg:flex-none inline-flex items-center justify-center px-2 py-2 text-sm font-medium text-blue-700 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
        >
          <Eye className="w-4 h-4 lg:mr-2" />
          <span className="hidden lg:inline text-xs">View</span>
        </button>

        {/* Pending → Approve / Reject */}
        {job.jobStatus === "pending" && (
          <>
            <button
              onClick={() => handleAccept(job.id)}
              className="flex-1 lg:flex-none inline-flex items-center justify-center px-2 py-2 text-sm font-medium text-green-700 bg-green-50 border border-green-300 rounded-md hover:bg-green-100 transition-colors"
            >
              <CheckCircle className="w-4 h-4 lg:mr-2" />
              <span className="hidden lg:inline text-xs">Approve</span>
            </button>
            <button
              onClick={() => handleReject(job.id)}
              className="flex-1 lg:flex-none inline-flex items-center justify-center px-2 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-300 rounded-md hover:bg-red-100 transition-colors"
            >
              <X className="w-4 h-4 lg:mr-2" />
              <span className="hidden lg:inline text-xs">Reject</span>
            </button>
          </>
        )}

        {/* Active → Reject / Block */}
        {job.jobStatus === "active" && (
          <>
            <button
              onClick={() => handleReject(job.id)}
              className="flex-1 lg:flex-none inline-flex items-center justify-center px-2 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-300 rounded-md hover:bg-red-100 transition-colors"
            >
              <X className="w-4 h-4 lg:mr-2" />
              <span className="hidden lg:inline text-xs">Reject</span>
            </button>
            <button
              onClick={() => handleBlock(job.id)}
              className="flex-1 lg:flex-none inline-flex items-center justify-center px-2 py-2 text-sm font-medium text-gray-50 bg-gray-700 border border-gray-300 rounded-md hover:bg-gray-800 transition-colors"
            >
              <Ban className="w-4 h-4 lg:mr-2" />
              <span className="hidden lg:inline text-xs">Block</span>
            </button>
          </>
        )}

        {/* Blocked → Unblock */}
        {job.jobStatus === "blocked" && (
          <button
            onClick={() => handleUnblock(job.id)}
            className="flex-1 lg:flex-none inline-flex items-center justify-center px-2 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          >
            <BeanOff className="w-4 h-4 lg:mr-2" />
            <span className="hidden lg:inline text-xs">UnBlock</span>
          </button>
        )}

        {/* Rejected → Approve again */}
        {job.jobStatus === "rejected" && (
          <button
            onClick={() => handleAccept(job.id)}
            className="flex-1 lg:flex-none inline-flex items-center justify-center px-2 py-2 text-sm font-medium text-green-700 bg-green-50 border border-green-300 rounded-md hover:bg-green-100 transition-colors"
          >
            <CheckCircle className="w-4 h-4 lg:mr-2" />
            <span className="hidden lg:inline text-xs">Approve</span>
          </button>
        )}

        {/* Delete always visible */}
        <button
          onClick={() => handleDelete(job.id)}
          className="p-2 text-gray-600 hover:bg-gray-50 rounded-sm"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    );
  };

  // Calculate status counts
  const statusCounts = {
    all: jobs.length,
    pending: jobs.filter((j) => j.jobStatus === "pending").length,
    active: jobs.filter((j) => j.jobStatus === "active").length,
    rejected: jobs.filter((j) => j.jobStatus === "rejected").length,
    blocked: jobs.filter((j) => j.jobStatus === "blocked").length,
  };

  return (
    <div className="h-[200px] px-8 py-4 ">
      <div className="max-w-7xl w-full mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 font-outfit">
            Job Management
          </h1>
          <p className="text-gray-600 text-md mt-1">
            Review and moderate all job postings
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total Jobs</p>
            <p className="text-2xl font-bold text-gray-900">
              {statusCounts.all}
            </p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-700 mb-1">Pending</p>
            <p className="text-2xl font-bold text-amber-700">
              {statusCounts.pending}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm text-green-700 mb-1">Active</p>
            <p className="text-2xl font-bold text-green-700">
              {statusCounts.active}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-sm text-red-700 mb-1">Rejected</p>
            <p className="text-2xl font-bold text-red-700">
              {statusCounts.rejected}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-700 mb-1">Blocked</p>
            <p className="text-2xl font-bold text-gray-700">
              {statusCounts.blocked}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by job title or employer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Status Filter */}
            <div className="relative ">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="rejected">Rejected</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          </div>
        </div>

        {/* Jobs Table */}
        <div className=" h-[300px]  rounded-lg shadow-sm border border-gray-200">
          <div>
            <div className="max-h-[300px] overflow-auto ">
              <table className="w-full border-collapse bg-amber-50">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="sticky top-0 z-20 bg-gray-100 px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="sticky top-0 z-20 bg-gray-100 px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Employer Name
                    </th>
                    <th className="sticky top-0 z-20 bg-gray-100 px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Posted Date
                    </th>
                    <th className="sticky top-0 z-20 bg-gray-100 px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="sticky top-0 z-20 bg-gray-100 px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                 <tbody className="divide-y divide-gray-200">
                  {filteredJobs.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p className="text-lg font-medium">No jobs found</p>
                        <p className="text-sm">
                          Try adjusting your search or filters
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredJobs.map((job) => (
                      <tr
                        key={job.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Briefcase className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="font-medium text-gray-900">
                              {job.jobTitle}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">
                              {job.workPlaceName}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">
                          {new Date(job.postedDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(job.jobStatus)}
                        </td>
                        <td className="px-6 py-4">{getActionButtons(job)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobManagement;
