import React from "react";
import { Users, UserCheck, Eye, Calendar, CheckCircle, PauseCircle, XCircle, Layers } from "lucide-react";
import { NavLink } from "react-router-dom";

function EmployerDashboard() {
 const recentJobs = [
  { title: "Senior Software Engineer", applications: 45, posted: "2 days ago", status: "active" },
  { title: "Product Designer", applications: 32, posted: "5 days ago", status: "paused" },
  { title: "Marketing Manager", applications: 28, posted: "1 week ago", status: "closed" },
  { title: "Sales Representative", applications: 19, posted: "1 week ago", status: "active" },
];


  return (
    <div className="min-h-full   px-8 py-4">
      <div className="max-w-7xl w-full mx-auto  space-y-6">
        
        {/* Header */}
        <div className="flex sm:justify-between flex-col sm:flex-row gap-4 items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 font-outfit">Welcome Back, Adil</h1>
            <p className="text-gray-600 text-md mt-1">Here's your hiring overview</p>
          </div>
          <button className="bg-blue-600 ml-auto max-sm:block hidden text-white h-10 w-10 rounded-lg font-medium hover:bg-blue-700 transition-colors">+ </button>
          <NavLink to="/employer/post-job">
          <button className="hidden sm:block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            + Post New Job
          </button>
          </NavLink>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Active Jobs"
            value="12"
            icon={<Layers className="sm:w-8 sm:h-8 w-6 h-6" />}
            color="blue"
          />
          <StatCard
            title="Total Applications"
            value="186"
            icon={<Users className="sm:w-8 sm:h-8 w-6 h-6" />}
            color="purple"
          />
          <StatCard
            title="Candidates Hired"
            value="28"
            icon={<UserCheck className="sm:w-8 sm:h-8 w-6 h-6" />}
            color="green"
          />
        </div>

        {/* all Job Posts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Job Posts</h2>
          </div>

          <div className="divide-y divide-gray-200 ">
            {recentJobs.map((job, index) => (
              <div key={index} className="p-6   transition-colors">
                <div className="flex sm:items-left justify-between sm:flex-row flex-col  gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-blue-100/20  rounded-lg flex items-center justify-center flex-shrink-0">
                      <Layers className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <span
  className={`flex items-center gap-1 font-medium
    ${job.status === "active" ? "text-green-600" : ""}
    ${job.status === "paused" ? "text-amber-600" : ""}
    ${job.status === "closed" ? "text-red-600" : ""}
  `}
>
  {job.status === "active" && <CheckCircle className="w-4 h-4" />}
  {job.status === "paused" && <PauseCircle className="w-4 h-4" />}
  {job.status === "closed" && <XCircle className="w-4 h-4" />}

  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
</span>


                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {job.posted}
                        </span>
                        <span className="flex items-center gap-1 font-medium text-blue-600">
                          <Users className="w-4 h-4" />
                          {job.applications} applications
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  
                  <button className="flex w-fit items-center h-fit  gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-16">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                
                </div>
              </div>
            ))}
          </div>
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
      text: "text-blue-600"
    },
    purple: {
      bg: "bg-purple-50",
      iconBg: "bg-purple-500",
      text: "text-purple-600"
    },
    green: {
      bg: "bg-green-50",
      iconBg: "bg-green-500",
      text: "text-green-600"
    }
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

export default EmployerDashboard;