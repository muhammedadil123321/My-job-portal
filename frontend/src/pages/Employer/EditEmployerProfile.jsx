import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  MapPin,
  Phone,
  Save,
  X,
} from "lucide-react";

export default function EditEmployerProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: "",
    phoneNumber: "",
    district: "",
    state: "",
    address: "",
    aboutCompany: "",
    profileImage: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);

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

        const response = await fetch(
          "http://localhost:5001/api/employer-profile/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        if (response.status === 404) {
          navigate("/employer/profile-form");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();

        if (isMountedRef.current) {
          setFormData({
            businessName: data.businessName || "",
            phoneNumber: data.phoneNumber || "",
            district: data.district || "",
            state: data.state || "",
            address: data.address || "",
            aboutCompany: data.aboutCompany || "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        "http://localhost:5001/api/employer-profile/me",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      // No updateUser here — businessName is NOT user.name
      // EmployerNavbar will re-fetch fresh employerProfile via this event
      window.dispatchEvent(new Event("employer:profileUpdated"));

      navigate("/employer/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/employer/profile");
  };

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

  if (error && !saving) {
    return (
      <div className="min-h-screen pt-28 pb-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-medium">Error: {error}</p>
          <button
            onClick={() => navigate("/employer/profile")}
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
                        {formData.businessName
                          ? formData.businessName
                              .split(" ")
                              .slice(0, 2)
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                          : "E"}
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

                {/* Business Name & Location */}
                <div className="flex-grow">
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Business Name"
                    className="text-2xl font-semibold text-gray-900 border-b-2 border-blue-600 focus:outline-none mb-3 w-full"
                  />

                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-gray-400" />
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-600 text-sm w-32"
                        placeholder="District"
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

              {/* Save / Cancel Buttons */}
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

          {/* Contact Information Cards */}
          <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

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

            </div>
          </div>

          {/* About Company Section */}
          <div className="px-4 sm:px-6 lg:px-8 py-6 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
              About Company
            </h3>
            <textarea
              name="aboutCompany"
              value={formData.aboutCompany}
              onChange={handleChange}
              maxLength={500}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-gray-700 resize-none"
              placeholder="Write a brief description about your company..."
            />
            <p className="text-sm text-gray-500 mt-2">
              {formData.aboutCompany.length}/500 characters
            </p>
            {error && saving && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}