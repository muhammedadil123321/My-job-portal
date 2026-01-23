import React, { useState } from "react";
import {
  Eye,
  Check,
  X,
  Search,
  Filter,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Globe,
  Clock,
  GraduationCap,
} from "lucide-react";
import { INITIALCANDIDATES } from "../../jobDetails/jobCardDetails";
import workerAvatar from "../../assets/images/workeravathar.png";

export default function Candidates() {
  const [applicants, setApplicants] = useState(INITIALCANDIDATES);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const handleViewProfile = (applicant) => {
    setSelectedApplicant(applicant);
  };

  const handleAccept = (id) => {
    setApplicants(
      applicants.map((app) =>
        app.id === id ? { ...app, status: "accepted" } : app
      )
    );
  };

  const handleReject = (id) => {
    setApplicants(
      applicants.map((app) =>
        app.id === id ? { ...app, status: "rejected" } : app
      )
    );
  };

  const filteredApplicants = applicants.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: "bg-amber-100 text-amber-700 border border-amber-200",
      accepted: "bg-emerald-100 text-emerald-700 border border-emerald-200",
      rejected: "bg-rose-100 text-rose-700 border border-rose-200",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen  py-4 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2 font-outfit">
            Job Applicants
          </h1>
          <p className="text-slate-600 text-md">
            Review and manage candidate applications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">
                  Total Applicants
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {applicants.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">
                  Pending
                </p>
                <p className="text-3xl font-bold text-amber-600">
                  {applicants.filter((a) => a.status === "pending").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Filter className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">
                  Accepted
                </p>
                <p className="text-3xl font-bold text-emerald-600">
                  {applicants.filter((a) => a.status === "accepted").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Check className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">
                  Rejected
                </p>
                <p className="text-3xl font-bold text-rose-600">
                  {applicants.filter((a) => a.status === "rejected").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center">
                <X className="w-6 h-6 text-rose-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, position, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="flex items-center gap-3">
              <Filter className="text-slate-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-medium text-slate-700 transition-all"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-y-auto overflow-x-auto h-[410px]">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Applied Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredApplicants.map((applicant) => (
                  <tr
                    key={applicant.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={applicant.profile || workerAvatar}
                          alt={applicant.name}
                          className="w-12 h-12 rounded-full border-2 border-slate-200"
                        />
                        <div>
                          <div className="font-semibold text-slate-900">
                            {applicant.name}
                          </div>
                          <div className="text-sm text-slate-500">
                            {applicant.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">
                        {applicant.position}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-700">
                        {applicant.appliedDate}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(applicant.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        {/* VIEW – always visible */}
                        <button
                          onClick={() => handleViewProfile(applicant)}
                          className="flex-1 lg:flex-none inline-flex items-center justify-center px-2 py-2 text-sm font-medium text-blue-700 bg-gray-50 border border-gray-300 rounded-md hover:bg-blue-100 transition-colors"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4 lg:mr-2" />
                          <span className="hidden lg:inline text-xs">View</span>
                        </button>

                        {/* APPROVE – hidden only if already accepted */}
                        {applicant.status !== "accepted" && (
                          <button
                            onClick={() => handleAccept(applicant.id)}
                            className="flex-1 lg:flex-none inline-flex items-center justify-center px-2 py-2 text-sm font-medium text-green-700 bg-green-50 border border-green-300 rounded-md hover:bg-green-100 transition-colors"
                            title="Approve"
                          >
                            <Check className="w-4 h-4 lg:mr-2" />
                            <span className="hidden lg:inline text-xs">
                              Approve
                            </span>
                          </button>
                        )}

                        {/* REJECT – hidden only if already rejected */}
                        {applicant.status !== "rejected" && (
                          <button
                            onClick={() => handleReject(applicant.id)}
                            className="flex-1 lg:flex-none inline-flex items-center justify-center px-2 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-300 rounded-md hover:bg-red-100 transition-colors"
                            title="Reject"
                          >
                            <X className="w-4 h-4 lg:mr-2" />
                            <span className="hidden lg:inline text-xs">
                              Reject
                            </span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredApplicants.length === 0 && (
            <div className="text-center py-16">
              <User className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg font-medium">
                No applicants found
              </p>
              <p className="text-slate-400 text-sm mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Profile Header */}
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 p-8 rounded-t-2xl">
              <button
                onClick={() => setSelectedApplicant(null)}
                className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-6">
                <img
                  src={selectedApplicant.profile || workerAvatar}
                  alt={selectedApplicant.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-xl"
                />
                <div className="text-white">
                  <h2 className="text-3xl font-bold mb-1">
                    {selectedApplicant.name}
                  </h2>
                  <p className="text-blue-100 text-lg mb-3">
                    {selectedApplicant.city} , {selectedApplicant.state}
                  </p>
                  {getStatusBadge(selectedApplicant.status)}
                </div>
              </div>
            </div>

            {/* Profile Body */}
            <div className="p-8">
              {/* Information Grid - 3 rows, 2 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">
                        Phone Number
                      </label>
                      <p className="text-slate-900 font-semibold">
                        {selectedApplicant.phone}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">
                        Email
                      </label>
                      <p className="text-slate-900 font-semibold">
                        {selectedApplicant.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">
                        Address
                      </label>
                      <p className="text-slate-900 font-semibold text-sm">
                        {selectedApplicant.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">
                        Age
                      </label>
                      <p className="text-slate-900 font-semibold">
                        {selectedApplicant.age} years
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">
                        Language Spoken
                      </label>
                      <p className="text-slate-900 font-semibold">
                        {selectedApplicant.language}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">
                        Education
                      </label>
                      <p className="text-slate-900 font-semibold">
                        {selectedApplicant.education}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedApplicant.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-lg text-sm font-semibold border border-blue-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* About Me Section */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  About Me
                </h3>
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <p className="text-slate-700 leading-relaxed text-base">
                    {selectedApplicant.about}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
