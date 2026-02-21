import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  MapPin,
  Phone,
  Globe,
  Calendar,
  GraduationCap,
  Save,
  X,
  Plus,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";


export default function EditWorkerProfile() {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
   
  // Profile form state (email removed — lives only in User model)
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    age: "",
    languages: [],
    skills: [],
    education: "",
    about: "",
    profileImage: "",
  });

  // UI state
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  
  // Skill/Language input state
  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  // Prevent state updates after unmount
  const isMountedRef = useRef(true);

  // Fetch existing profile data on mount
  useEffect(() => {
    isMountedRef.current = true;

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          "http://localhost:5001/api/worker-profile/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Handle auth failure
        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        // Handle profile not found
        if (response.status === 404) {
          navigate("/worker/profile-form");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();

        if (isMountedRef.current) {
          // email intentionally omitted — not part of WorkerProfile
          setFormData({
            fullName: data.fullName || "",
            phoneNumber: data.phoneNumber || "",
            address: data.address || "",
            city: data.city || "",
            state: data.state || "",
            age: data.age || "",
            languages: data.languages || [],
            skills: data.skills || [],
            education: data.education || "",
            about: data.about || "",
            profileImage: data.profileImage || "",
          });
          setProfileImagePreview(data.profileImage || null);
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

    return () => {
      isMountedRef.current = false;
    };
  }, [navigate]);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add skill
  const handleAddSkill = () => {
    const trimmedSkill = newSkill.trim();
    if (trimmedSkill && !formData.skills.includes(trimmedSkill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, trimmedSkill],
      }));
      setNewSkill("");
    }
  };

  // Remove skill
  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  // Add language
  const handleAddLanguage = () => {
    const trimmedLanguage = newLanguage.trim();
    if (trimmedLanguage && !formData.languages.includes(trimmedLanguage)) {
      setFormData((prev) => ({
        ...prev,
        languages: [...prev.languages, trimmedLanguage],
      }));
      setNewLanguage("");
    }
  };

  // Remove language
  const handleRemoveLanguage = (languageToRemove) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang !== languageToRemove),
    }));
  };

  // Handle Enter key for skills
  const handleSkillKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  // Handle Enter key for languages
  const handleLanguageKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddLanguage();
    }
  };

  // Save profile to backend
  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      // formData no longer contains email — safe to send as-is
      const response = await fetch(
        "http://localhost:5001/api/worker-profile/me",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // Handle auth failure
      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      // Get updated profile from backend
      const updatedProfile = await response.json();

      // Sync navbar with updated name/avatar only — email stays in AuthContext from login
      updateUser({
        name: updatedProfile.fullName,
        profileImage: updatedProfile.profileImage,
      });

      // Redirect to profile view page on success
      navigate("/worker/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    navigate("/worker/profile");
  };

  // Loading state
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

  // Error state
  if (error && !saving) {
    return (
      <div className="min-h-screen pt-28 pb-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-medium">Error: {error}</p>
          <button
            onClick={() => navigate("/worker/my-profile")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Back to Profile
          </button>
        </div>
      </div>
    );
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
                  <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center overflow-hidden border-2 border-gray-200">
                    {profileImagePreview ? (
                      <img
                        src={profileImagePreview}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-bold text-white">
                        {formData.fullName
                          ? formData.fullName
                              .split(" ")
                              .slice(0, 2)
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                          : "W"}
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

                {/* Worker Details */}
                <div className="flex-grow">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="text-2xl font-semibold text-gray-900 border-b-2 border-blue-600 focus:outline-none mb-3 w-full"
                  />

                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-gray-400" />
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-600 text-sm w-32"
                        placeholder="City"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-gray-400" />
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-600 text-sm w-32"
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
                    disabled={saving}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        Save
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Details - 5 Cards (email removed) */}
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
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-600 text-sm text-gray-900 font-medium"
                />
              </div>

              {/* Address */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={16} className="text-blue-600" />
                  <p className="text-xs text-gray-500 font-semibold uppercase">
                    Address
                  </p>
                </div>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Full address"
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-600 text-sm text-gray-900 font-medium"
                />
              </div>

              {/* Age */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={16} className="text-blue-600" />
                  <p className="text-xs text-gray-500 font-semibold uppercase">
                    Age
                  </p>
                </div>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age"
                  min="18"
                  max="100"
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-600 text-sm text-gray-900 font-medium"
                />
              </div>

              {/* Languages */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Globe size={16} className="text-blue-600" />
                  <p className="text-xs text-gray-500 font-semibold uppercase">
                    Languages
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex gap-1">
                    <input
                      type="text"
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                      onKeyPress={handleLanguageKeyPress}
                      placeholder="Add language"
                      className="flex-grow px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-600 text-sm"
                    />
                    <button
                      onClick={handleAddLanguage}
                      className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {formData.languages.map((lang, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium border border-blue-200 flex items-center gap-1"
                      >
                        {lang}
                        <button
                          onClick={() => handleRemoveLanguage(lang)}
                          className="hover:bg-blue-200 rounded-full p-0.5"
                        >
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap size={16} className="text-blue-600" />
                  <p className="text-xs text-gray-500 font-semibold uppercase">
                    Education
                  </p>
                </div>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-600 text-sm text-gray-900 font-medium"
                >
                  <option value="">Select education</option>
                  <option value="No formal education">
                    No formal education
                  </option>
                  <option value="School level (Up to 10th standard or equivalent)">
                    School level (Up to 10th standard or equivalent)
                  </option>
                  <option value="Higher secondary level (12th / Intermediate / PUC)">
                    Higher secondary level (12th / Intermediate / PUC)
                  </option>
                  <option value="Diploma / ITI">Diploma / ITI</option>
                  <option value="Degree or above">Degree or above</option>
                </select>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="px-4 sm:px-6 lg:px-8 py-6 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
              About Me
            </h3>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              maxLength={500}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-gray-700 resize-none"
              placeholder="Write a brief description about yourself..."
            />
            <p className="text-sm text-gray-500 mt-2">
              {formData.about.length}/500 characters
            </p>
          </div>

          {/* Skills Section */}
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
              Skills
            </h3>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleSkillKeyPress}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-gray-700"
                placeholder="Enter a skill"
              />
              <button
                onClick={handleAddSkill}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
              >
                <Plus size={18} />
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-md text-sm font-medium border border-blue-200 flex items-center gap-2"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:bg-blue-200 rounded-full p-0.5 transition"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>

            {error && saving && (
              <p className="mt-4 text-sm text-red-600">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}