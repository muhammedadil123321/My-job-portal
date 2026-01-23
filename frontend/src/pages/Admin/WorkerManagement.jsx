import { useState } from "react";
import { Eye } from "lucide-react";
import { INITIALCANDIDATES } from "../../jobDetails/jobCardDetails";
import { useNavigate } from "react-router-dom";
import workerAvatar from "../../assets/images/workeravathar.png";

export default function WorkerManagement() {
  // Dummy data - in real app, this would come from an API
  const navigate = useNavigate();
  const [workers] = useState(INITIALCANDIDATES);

  const isEmpty = workers.length === 0;

  return (
    <div className="h-full bg-gray-50 p-6 ">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Worker Management</h1>
        <p className="text-gray-600 mt-2">View and manage job applicants</p>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {isEmpty ? (
          // Empty State
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-gray-500 text-lg font-medium">
                No workers found
              </p>
              <p className="text-gray-400 text-sm mt-1">
                No applicants at the moment
              </p>
            </div>
          </div>
        ) : (
          // Table
          <div className="overflow-y-auto h-[416px]">
            <table className="w-full ">
              {/* Table Header */}
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-12">
                    No.
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Applicant
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Applied Position
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Applied Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-200">
                {workers.map((worker, index) => (
                  <tr
                    key={worker.id}
                    className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                    
                  >
                    {/* Serial Number Cell */}
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-600">
                        {index + 1}
                      </p>
                    </td>

                    {/* Applicant Cell */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={worker.profile ||workerAvatar}
                          alt={worker.name}
                          className="w-10 h-10 rounded-full object-cover bg-gray-200"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {worker.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email Cell */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{worker.email}</p>
                    </td>

                    {/* Applied Position Cell */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{worker.position}</p>
                    </td>

                    {/* Applied Date Cell */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">
                        {worker.appliedDate}
                      </p>
                    </td>

                    {/* Action Cell */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          navigate(
                            `/admin/worker-management/view-profile/${worker.id}`
                          )
                        }
                        className="flex-1 lg:flex-none inline-flex items-center justify-center px-2 py-2 text-sm font-medium text-blue-700 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        <Eye className="w-4 h-4 lg:mr-2" />
                        <span
                          className="hidden lg:inline text-xs"
                          
                        >
                          View{" "}
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
