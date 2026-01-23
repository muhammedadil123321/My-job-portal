import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Camera,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  GraduationCap,
  Save,
  X,
  Plus,
} from "lucide-react";

export default function EditWorkerProfile() {
  const { workerProfile, updateWorkerProfile } = useContext(ProfileContext);

  const [formData, setFormData] = useState(null);
  const [newSkill, setNewSkill] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // id comes from URLs

  useEffect(() => {
    if (!Array.isArray(workerProfile)) return;

    const user = workerProfile.find((item) => item.id === Number(id));

    if (user) {
      setFormData({
        ...user,
        skills: user.skills || [],
        about: user.about || "",
      });
    }
  }, [id, workerProfile]);

  // ✅ Loading guard
  if (!formData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading edit profile...</p>
      </div>
    );
  }

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

 const handleSave = () => {
  const updatedWorkers = workerProfile.map(worker =>
    worker.id === formData.id
      ? {
          ...formData,
          profile: profileImage || worker.profile,
        }
      : worker
  );

  updateWorkerProfile(updatedWorkers);
  navigate(`/worker/profile/${formData.id}`);
};


const handleCancel = () => {
  navigate(`/worker/profile/${formData.id}`);
};


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
                    {profileImage || formData.profile ? (
                      <img
                        src={profileImage || formData.profile}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-semibold text-gray-600">
                        {formData.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")}
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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="text-2xl font-semibold text-gray-900 border-b-2 border-blue-600 focus:outline-none mb-3 w-full"
                  />

                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-gray-400" />
                      <input
                        type="text"
                        name="city"
                        value={`${formData.city}`}
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
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
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
                  value={formData.email}
                  onChange={handleChange}
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
                <input
                  type="text"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-600 text-sm text-gray-900 font-medium"
                />
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
              About Worker
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
                onKeyPress={handleKeyPress}
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
          </div>
        </div>
      </div>
    </div>
  );
}
