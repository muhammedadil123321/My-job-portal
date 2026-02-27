import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Eye, Trash2 } from "lucide-react";
import { Briefcase, Calendar } from "lucide-react";

const API_URL = "http://localhost:5001/api/applications/my";

export default function ApplicationHistory() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;

    const fetchMyApplications = async (showLoader = false) => {
      try {
        if (showLoader) setLoading(true);

        const token = localStorage.getItem("token");

        const res = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setApplications(data.applications || []);
      } catch (error) {
        console.error(error);
      } finally {
        if (showLoader) setLoading(false);
      }
    };

    fetchMyApplications(true);

    interval = setInterval(() => {
      fetchMyApplications(false);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (appId) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5001/api/applications/${appId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setApplications(applications.filter((app) => app._id !== appId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return { badge: "bg-green-100 text-green-700" };
      case "rejected":
        return { badge: "bg-red-100 text-red-700" };
      default:
        return { badge: "bg-yellow-100 text-yellow-700" };
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "accepted":
        return "Accepted";
      case "rejected":
        return "Rejected";
      default:
        return "pending";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <Loader2 className="animate-spin text-gray-400" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Application History
          </h1>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-600 text-lg">No applications found</p>
            <p className="text-gray-500 mt-1">
              Start applying to jobs to see them here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => {
              const statusColor = getStatusColor(app.status);
              const statusLabel = getStatusLabel(app.status);
              const isConfirming = deleteConfirm === app._id;

              return (
                <div
                  key={app._id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all duration-200"
                >
                  {/* Top Section - Status, Title, Company, Details, Buttons */}
                  <div className="space-y-2">
                    {/* Status Badge */}
                    <div>
                      <span
                        className={`inline-block px-3 py-1 rounded text-xs font-semibold ${statusColor.badge}`}
                      >
                        {statusLabel}
                      </span>
                    </div>

                    {/* Job Title */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {app.jobSnapshot?.jobTitle ||
                          app.job?.jobTitle ||
                          "Job Title"}
                      </h2>
                    </div>

                    {/* Company Name */}
                    <div>
                      <p className="text-gray-700 font-medium">
                        {app.jobSnapshot?.workPlaceName ||
                          app.job?.workPlaceName ||
                          "Company Name"}
                      </p>
                    </div>

                    {/* Job Type and Applied Date */}
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex items-center gap-6 text-gray-600 text-sm">
                        <div className="flex items-center gap-2">
                          <Briefcase size={16} className="text-gray-900" />
                          <span>
                            {app.jobSnapshot?.jobType || app.job?.jobType}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-gray-900" />
                          <span>
                            Posted{" "}
                            {new Date(app.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons - Right Side */}
                      <div className="flex gap-3 ">
                        {isConfirming ? (
                          <>
                            <button
                              onClick={() => handleDelete(app._id)}
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded transition-colors"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 text-sm font-medium rounded transition-colors"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() =>
                                navigate(`/worker/applications/${app._id}`, {
                                  state: { application: app },
                                })
                              }
                              className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-200 hover:bg-blue-50 text-sm font-medium rounded transition-colors"
                            >
                              <Eye size={16} />
                              View
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(app._id)}
                              className="inline-flex items-center gap-2 px-4 py-2 text-red-600 border border-red-200 hover:bg-red-50 text-sm font-medium rounded transition-colors"
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
