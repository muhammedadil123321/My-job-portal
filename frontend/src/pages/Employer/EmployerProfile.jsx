import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import { useNavigate } from "react-router-dom";
import { MapPin, Phone, Mail, Briefcase, Edit2 } from "lucide-react";
import { useParams } from "react-router-dom";

export default function EmployerProfile() {
  const { employerProfile } = useContext(ProfileContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  const { id } = useParams(); 
  const [data,setData]=useState([]);

  useEffect(()=>{
    const employer=employerProfile.find(
      (item)=>item.id === Number(id)
    );
    if(employer){
      setData(employer)
    }
  },[id,employerProfile])
  return (
    <div className="h-full bg-white pt-16 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          {/* Header Section */}
          <div className="px-4 sm:px-6 lg:px-8 py-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                {/* Profile Image */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200">
                    {data.profileImage ? (
                      <img
                        src={data.profileImage }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-semibold text-gray-600">
                        {data?.workPlaceName
                          ? data.workPlaceName.charAt(0)
                          : "E"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Company Details */}
                <div className="flex-grow">
                  <h1 className="text-2xl font-semibold text-gray-900 mb-3">
                    {data.workPlaceName}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-600 mb-3">
                   
                    <span className="flex items-center gap-2">
                      <MapPin size={18} className="text-gray-400" />
                      {data.city}, {data.state}
                    </span>
                  </div>

                  
                </div>
              </div>

              {/* Edit Button */}
              <div className="flex-shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => navigate(`/employer/profile/edit/${id}`)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition"
                >
                  <Edit2 size={16} />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone Number */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Phone size={16} className="text-blue-600" />
                  <p className="text-xs text-gray-500 font-semibold uppercase">
                    Phone
                  </p>
                </div>
                <p className="text-sm text-gray-900 font-medium">
                  {data.contactNo}
                </p>
              </div>

              {/* Email */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={16} className="text-blue-600" />
                  <p className="text-xs text-gray-500 font-semibold uppercase">
                    Email
                  </p>
                </div>
                <p className="text-sm text-gray-900 font-medium">
                  {data.email}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-4 sm:px-6 lg:px-8 border-b border-gray-200 overflow-x-auto">
            <div className="flex gap-6 min-w-max">
              <button
                onClick={() => setActiveTab('about')}
                className={`py-4 text-sm font-medium border-b-2 transition ${
                  activeTab === 'about'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                About Employer
              </button>

              <button
                onClick={() => setActiveTab('jobs')}
                className={`py-4 text-sm font-medium border-b-2 transition ${
                  activeTab === 'jobs'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Job Activity Summary
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'about' && (
            <div className="px-4 sm:px-6 lg:px-8 py-6">
              <p className="text-gray-700 leading-relaxed">
                {data.aboutDescription}
              </p>
            </div>
          )}

          {activeTab === 'jobs' && (
            <div className="px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                  <p className="text-sm text-gray-600 font-medium mb-2">
                    Total Jobs Posted
                  </p>
                  <p className="text-4xl font-semibold text-gray-900">
                    {data.jobStats.totalJobsPosted}
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                  <p className="text-sm text-gray-600 font-medium mb-2">
                    Active Jobs
                  </p>
                  <p className="text-4xl font-semibold text-gray-900">
                    {data.jobStats.activeJobs}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}