import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import { useNavigate, useParams } from "react-router-dom";
import { Camera, MapPin, Phone, Mail, Briefcase, Save, X } from 'lucide-react';

export default function EditEmployerProfile() {
  const { employerProfile, updateEmployerProfile } = useContext(ProfileContext);
  
  const [formData, setFormData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!Array.isArray(employerProfile) || employerProfile.length === 0) return;

    const employer = employerProfile.find((item) => item.id === Number(id));

    if (employer) {
      setFormData({
        ...employer,
        aboutDescription: employer.aboutDescription || ""
      });
      setProfileImage(employer.profileImage || null);
    }
  }, [id, employerProfile]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    const updateEmployers = employerProfile.map(employer=>
      employer.id === formData.id
      ?{
        ...formData,
        profileImage: profileImage || employer.profileImage,
      }
       : employer
    )
    
    updateEmployerProfile(updateEmployers);
    navigate(`/employer/profile/${formData.id}`);
  };

  const handleCancel = () => {
    navigate(`/employer/profile/${formData.id}`);
  };

  if (!formData) {
    return <div className="min-h-screen bg-gray-50 pt-28 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4">
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
                    {profileImage ? (
                      <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <span className="text-3xl font-semibold text-gray-600">
                        {formData.workPlaceName?.charAt(0) || "E"}
                      </span>
                    )}
                  </div>
                  <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 shadow-md transition">
                    <Camera size={16} className="text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Company Details */}
                <div className="flex-grow">
                  <input
                    type="text"
                    name="workPlaceName"
                    value={formData.workPlaceName || ""}
                    onChange={handleChange}
                    className="text-2xl font-semibold text-gray-900 border-b-2 border-blue-600 focus:outline-none mb-3 w-full"
                    placeholder="Company Name"
                  />
                  
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-gray-400" />
                      <input
                        type="text"
                        name="city"
                        value={formData.city || ""}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-600 text-sm w-full sm:w-auto"
                        placeholder="City"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-gray-400" />
                      <input
                        type="text"
                        name="state"
                        value={formData.state || ""}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-600 text-sm w-full sm:w-auto"
                        placeholder="State"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Save/Cancel Buttons */}
              <div className="flex-shrink-0 w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={handleCancel}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50 transition"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition"
                  >
                    <Save size={16} />
                    Save
                  </button>
                </div>
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
                <input
                  type="tel"
                  name="contactNo"
                  value={formData.contactNo || ""}
                  onChange={handleChange}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-600 text-sm text-gray-900 font-medium"
                />
              </div>

              {/* Email */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={16} className="text-blue-600" />
                  <p className="text-xs text-gray-500 font-semibold uppercase">
                    Email
                  </p>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-600 text-sm text-gray-900 font-medium"
                />
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="px-4 sm:px-6 lg:px-8 py-6 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
              About Employer
            </h3>
            <textarea
              name="aboutDescription"
              value={formData.aboutDescription || ""}
              onChange={handleChange}
              maxLength={250}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-gray-700 resize-none"
              placeholder="Write a brief description about your company..."
            />
            <p className="text-sm text-gray-500 mt-2">
              {(formData.aboutDescription || "").length}/250 characters
            </p>
          </div>

          {/* Job Stats Section (Read-only) */}
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
              Job Activity Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <p className="text-sm text-gray-600 font-medium mb-2">
                  Total Jobs Posted
                </p>
                <p className="text-4xl font-semibold text-gray-900">
                  {formData.jobStats?.totalJobsPosted || 0}
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <p className="text-sm text-gray-600 font-medium mb-2">
                  Active Jobs
                </p>
                <p className="text-4xl font-semibold text-gray-900">
                  {formData.jobStats?.activeJobs || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}