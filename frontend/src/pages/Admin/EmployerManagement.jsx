import { useState } from "react";
import { INITIALEMPLOYER } from "../../jobDetails/jobCardDetails";
import EmployerAvatar from "../../assets/images/workeravathar.png";
import WorkerProfile from "../User/WorkerProfile";

export default function EmployerManagement() {
  const [employers] = useState(INITIALEMPLOYER);


  const isEmpty = employers.length === 0;

  return (
    <div className="h-full bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Employer Management</h1>
        <p className="text-gray-600 mt-2">View and manage employer job postings</p>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {isEmpty ? (
          // Empty State
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-gray-500 text-lg font-medium">
                No employers found
              </p>
              <p className="text-gray-400 text-sm mt-1">
                No job postings at the moment
              </p>
            </div>
          </div>
        ) : (
          // Table
          <div className="overflow-y-auto h-[416px]">
            <table className="w-full">
              {/* Table Header */}
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 sticky top-0">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-12">
                    No
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Employer Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Workplace Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Contact Info
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Hiring Position
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Posted Date
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-200">
                {employers.map((employer, index) => (
                  <tr
                    key={employer.id}
                    className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                  >
                    {/* Serial Number Cell */}
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-600">
                        {index + 1}
                      </p>
                    </td>

                    {/* Employer Name Cell */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={employer.profileImage || EmployerAvatar}
                          alt={employer.employerName}
                          className="w-10 h-10 rounded-full object-cover bg-gray-200"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {employer.employerName}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Workplace Name Cell */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700">
                        {employer.workPlaceName}
                      </p>
                    </td>

                    {/* Contact Info Cell */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm text-gray-600">{employer.contactNo}</p>
                        <p className="text-sm text-gray-600">{employer.email}</p>
                      </div>
                    </td>

                    {/* Hiring Position Cell */}
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                        {employer.hiringPosition}
                      </span>
                    </td>

                    {/* Posted Date Cell */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">
                        {employer.postedDate}
                      </p>
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