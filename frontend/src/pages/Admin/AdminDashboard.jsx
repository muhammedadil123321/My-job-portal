import React from "react";
import {
  Users,
  Briefcase,
  Building2,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalEmployers: 0,
    totalWorkers: 0,
    totalJobs: 0,
    pendingJobs: 0,
    activeJobs: 0,
    rejectedJobs: 0,
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5001/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          setStats(data.stats);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);
 
  if (loading) {
  return <div className="p-8">Loading dashboard...</div>;
}

  return (
    <div className="min-h-full px-8 py-4">
      <div className="max-w-7xl w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex sm:justify-between flex-col sm:flex-row gap-4 items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 font-outfit">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 text-md mt-1">
              Overview of platform statistics
            </p>
          </div>
        </div>

        {/* Stats Cards - 2 Rows, 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Row 1 */}
          <StatCard
            title="Total Employers"
            value={stats?.totalEmployers || 0}
            icon={<Building2 className="sm:w-8 sm:h-8 w-6 h-6" />}
            color="blue"
          />

          <StatCard
            title="Total Workers"
            value={stats?.totalWorkers || 0}
            icon={<Users className="sm:w-8 sm:h-8 w-6 h-6" />}
            color="purple"
          />

          <StatCard
            title="Total Jobs"
            value={stats?.totalJobs || 0}
            icon={<Briefcase className="sm:w-8 sm:h-8 w-6 h-6" />}
            color="green"
          />

          <StatCard
            title="Pending Job Posts"
            value={stats?.pendingJobs || 0}
            icon={<Clock className="sm:w-8 sm:h-8 w-6 h-6" />}
            color="amber"
          />

          <StatCard
            title="Active Jobs"
            value={stats?.activeJobs || 0}
            icon={<CheckCircle className="sm:w-8 sm:h-8 w-6 h-6" />}
            color="emerald"
          />

          <StatCard
            title="Rejected Jobs"
            value={stats?.rejectedJobs || 0}
            icon={<XCircle className="sm:w-8 sm:h-8 w-6 h-6" />}
            color="red"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const colors = {
    blue: {
      bg: "bg-blue-50",
      iconBg: "bg-blue-500",
      text: "text-blue-600",
    },
    purple: {
      bg: "bg-purple-50",
      iconBg: "bg-purple-500",
      text: "text-purple-600",
    },
    green: {
      bg: "bg-green-50",
      iconBg: "bg-green-500",
      text: "text-green-600",
    },
    amber: {
      bg: "bg-amber-50",
      iconBg: "bg-amber-500",
      text: "text-amber-600",
    },
    emerald: {
      bg: "bg-emerald-50",
      iconBg: "bg-emerald-500",
      text: "text-emerald-600",
    },
    red: {
      bg: "bg-red-50",
      iconBg: "bg-red-500",
      text: "text-red-600",
    },
  };

  const colorSet = colors[color];

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-md font-medium mb-3">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`${colorSet.iconBg} p-2 rounded-lg`}>
          <div className="text-white">{icon}</div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
