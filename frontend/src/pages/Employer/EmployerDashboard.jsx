import React, { useContext, useMemo } from "react";
import {
  Users,
  UserCheck,
  Eye,
  Calendar,
  CheckCircle,
  XCircle,
  Layers,
  Clock,
  ShieldAlert,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { JobContext } from "../../context/JobContext";

// ─── Constants ────────────────────────────────────────────────────────────────

const VISIBLE_STATUSES = ["active", "pending", "rejected", "blocked"];

// ─── Relative Time Helper ─────────────────────────────────────────────────────

function getRelativeTime(dateStr) {
  const now = new Date();
  const past = new Date(dateStr);
  const diffMs = now - past;

  if (isNaN(past.getTime())) return "Unknown date";

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  if (weeks < 4) return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

function EmployerDashboard() {
  const { user } = useAuth();
  const { jobs } = useContext(JobContext);

  // Single source of truth — closed jobs excluded here
  const visibleJobs = useMemo(
    () => jobs.filter((job) => VISIBLE_STATUSES.includes(job.jobStatus)),
    [jobs]
  );

  const activeJobsCount = useMemo(
    () => visibleJobs.filter((job) => job.jobStatus === "active").length,
    [visibleJobs]
  );

  const totalApplications = useMemo(
    () => visibleJobs.reduce((sum, job) => sum + (job.applications || 0), 0),
    [visibleJobs]
  );

  const hiredCount = useMemo(
    () => visibleJobs.reduce((sum, job) => sum + (job.hired || 0), 0),
    [visibleJobs]
  );

  // 4 most recent visible jobs sorted by createdAt
  const recentJobs = useMemo(
    () =>
      [...visibleJobs]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4),
    [visibleJobs]
  );

  return (
    <div className="min-h-full px-8 py-4">
      <div className="max-w-7xl w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex sm:justify-between flex-col sm:flex-row gap-4 items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 font-outfit">
              Welcome Back, {user?.name || "User"}
            </h1>
            <p className="text-gray-600 text-md mt-1">
              Here's your hiring overview
            </p>
          </div>
          <button className="bg-blue-600 ml-auto max-sm:block hidden text-white h-10 w-10 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            +
          </button>
          <NavLink to="/employer/post-job">
            <button className="hidden sm:block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              + Post New Job
            </button>
          </NavLink>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Active Jobs"
            value={activeJobsCount}
            icon={<Layers className="sm:w-8 sm:h-8 w-6 h-6" />}
            color="blue"
          />
          <StatCard
            title="Total Applications"
            value={totalApplications}
            icon={<Users className="sm:w-8 sm:h-8 w-6 h-6" />}
            color="purple"
          />
          <StatCard
            title="Candidates Hired"
            value={hiredCount}
            icon={<UserCheck className="sm:w-8 sm:h-8 w-6 h-6" />}
            color="green"
          />
        </div>

        {/* Recent Job Posts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Job Posts
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {recentJobs.length === 0 ? (
              <p className="p-6 text-gray-500 text-sm">No jobs to display.</p>
            ) : (
              recentJobs.map((job) => <JobRow key={job._id} job={job} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Job Row ──────────────────────────────────────────────────────────────────

function JobRow({ job }) {
  const statusConfig = {
    active: {
      icon: <CheckCircle className="w-4 h-4" />,
      color: "text-green-600",
    },
    pending: { icon: <Clock className="w-4 h-4" />, color: "text-amber-600" },
    rejected: { icon: <XCircle className="w-4 h-4" />, color: "text-red-600" },
    blocked: {
      icon: <ShieldAlert className="w-4 h-4" />,
      color: "text-gray-500",
    },
  };

  const config = statusConfig[job.jobStatus] ?? statusConfig.pending;
  const postedDate = getRelativeTime(job.createdAt);

  return (
    <div className="p-6 transition-colors">
      <div className="flex sm:items-center justify-between sm:flex-row flex-col gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 bg-blue-100/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Layers className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-lg mb-2">
              {job.jobTitle}
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span
                className={`flex items-center gap-1 font-medium ${config.color}`}
              >
                {config.icon}
                {job.jobStatus.charAt(0).toUpperCase() + job.jobStatus.slice(1)}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {postedDate}
              </span>
            </div>
          </div>
        </div>

       <NavLink to={`manage-jobs/view-job/${job._id}`}>
  <button className="group flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-blue-500 hover:text-blue-600 hover:shadow-md transition-all duration-200">
    <Eye className="w-4 h-4 transition-transform group-hover:scale-110" />
    <span>View</span>
  </button>
</NavLink>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ title, value, icon, color }) {
  const colors = {
    blue: { iconBg: "bg-blue-500" },
    purple: { iconBg: "bg-purple-500" },
    green: { iconBg: "bg-green-500" },
  };

  const { iconBg } = colors[color];

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-md font-medium mb-3">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`${iconBg} p-2 rounded-lg`}>
          <div className="text-white">{icon}</div>
        </div>
      </div>
    </div>
  );
}

export default EmployerDashboard;
