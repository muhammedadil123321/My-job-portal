import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Phone,
  Globe,
  Calendar,
  GraduationCap,
  Edit2,
} from "lucide-react";



export default function WorkerProfile() {

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("about");
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Prevent state updates after component unmounts
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        // Use the same port as your backend server (default 5000 in server.js)
        const response = await fetch("http://localhost:5001/api/worker-profile/me", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        // Handle authentication failure
        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        // Handle profile not found (redirect to create profile)
        if (response.status === 404) {
          navigate("/worker/profile-form");
          return;
        }

        // Handle other HTTP errors
        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.status}`);
        }

        const data = await response.json();

        // Only update state if component is still mounted
        if (isMountedRef.current) {
          setProfileData(data);
        }
      } catch (err) {
        if (isMountedRef.current) {
          setError(err.message);
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    // Cleanup function
    return () => {
      isMountedRef.current = false;
    };
  }, [navigate]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div 
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
            role="status"
            aria-label="Loading profile"
          ></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen pt-28 pb-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-medium">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Safeguard: should not happen, but prevent rendering without data
  if (!profileData) {
    return null;
  }

  const addressLocation = [
    profileData.area,
    profileData.district,
    profileData.state,
  ]
    .filter(Boolean)
    .join(", ")
    .concat(profileData.pincode ? ` - ${profileData.pincode}` : "");

  return (
    <div className="min-h-screen pt-28 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          {/* Header Section */}
          <div className="px-4 sm:px-6 lg:px-8 py-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                {/* Profile Image */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center overflow-hidden border-2 border-gray-200">
                    {profileData.profileImage ? (
                      <img
                        src={profileData.profileImage}
                        alt={`${profileData.fullName}'s profile`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-bold text-white">
                        {profileData.fullName
                          ? profileData.fullName
                              .split(" ")
                              .slice(0, 2)
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                          : "W"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Worker Details */}
                <div className="flex-grow">
                  <h1 className="text-2xl font-semibold text-gray-900 mb-3">
                    {profileData.fullName || "Worker"}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-600 mb-3">
                    {addressLocation && (
                      <span className="flex items-center gap-2">
                        <MapPin size={18} className="text-gray-400" />
                        {addressLocation}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <div className="flex-shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => navigate("/worker/profile/edit")}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition"
                  aria-label="Edit profile"
                >
                  <Edit2 size={16} />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Personal Details - 6 Cards */}
          <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Phone Number */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Phone size={16} className="text-blue-600" />
                  <p className="text-xs text-gray-500 font-semibold uppercase">
                    Phone
                  </p>
                </div>
                <p className="text-sm text-gray-900 font-medium">
                  {profileData.phoneNumber || "N/A"}
                </p>
              </div>

           

              {/* Address */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={16} className="text-blue-600" />
                  <p className="text-xs text-gray-500 font-semibold uppercase">
                    Address
                  </p>
                </div>
                <p className="text-sm text-gray-900 font-medium">
                  {addressLocation || "N/A"}
                </p>
              </div>

              {/* Age */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={16} className="text-blue-600" />
                  <p className="text-xs text-gray-500 font-semibold uppercase">
                    Age
                  </p>
                </div>
                <p className="text-sm text-gray-900 font-medium">
                  {profileData.age ? `${profileData.age} years` : "N/A"}
                </p>
              </div>

              {/* Languages */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Globe size={16} className="text-blue-600" />
                  <p className="text-xs text-gray-500 font-semibold uppercase">
                    Languages
                  </p>
                </div>
                <p className="text-sm text-gray-900 font-medium">
                  {profileData.languages && profileData.languages.length > 0
                    ? profileData.languages.join(", ")
                    : "N/A"}
                </p>
              </div>

              {/* Education */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap size={16} className="text-blue-600" />
                  <p className="text-xs text-gray-500 font-semibold uppercase">
                    Education
                  </p>
                </div>
                <p className="text-sm text-gray-900 font-medium">
                  {profileData.education || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-4 sm:px-6 lg:px-8 border-b border-gray-200 overflow-x-auto">
            <div className="flex gap-6 min-w-max" role="tablist">
              <button
                onClick={() => setActiveTab("about")}
                role="tab"
                aria-selected={activeTab === "about"}
                aria-controls="about-panel"
                className={`py-4 text-sm font-medium border-b-2 transition ${
                  activeTab === "about"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                About Worker
              </button>

              <button
                onClick={() => setActiveTab("skills")}
                role="tab"
                aria-selected={activeTab === "skills"}
                aria-controls="skills-panel"
                className={`py-4 text-sm font-medium border-b-2 transition ${
                  activeTab === "skills"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Skills
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "about" && (
            <div 
              id="about-panel"
              role="tabpanel"
              className="px-4 sm:px-6 lg:px-8 py-6"
            >
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {profileData.about || "No information provided."}
              </p>
            </div>
          )}

          {activeTab === "skills" && (
            <div 
              id="skills-panel"
              role="tabpanel"
              className="px-4 sm:px-6 lg:px-8 py-6"
            >
              {profileData.skills && profileData.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-md text-sm font-medium border border-blue-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No skills added yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}