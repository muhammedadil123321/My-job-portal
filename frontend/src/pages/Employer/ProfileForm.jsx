import React, { useState, useEffect } from "react";
import {
  Building2,
  AlertCircle,
  Phone,
  MapPin,
  Save,
  User,
  Briefcase,
  Shield,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function EmployerProfileForm() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    businessName: "",   // company name — user must type this manually
    phoneNumber: "",
    district: "",
    state: "",
    address: "",
    aboutCompany: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [apiError, setApiError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsFetching(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5001/api/employer-profile/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          // Profile exists — fill from EmployerProfile model only
          const data = await res.json();
          const profile = data.profile || data;
          setFormData({
            businessName: profile.businessName || "",
            phoneNumber: profile.phoneNumber || "",
            district: profile.district || "",
            state: profile.state || "",
            address: profile.address || "",
            aboutCompany: profile.aboutCompany || "",
          });
        }
        // 404 = no profile yet → all fields stay empty ""
        // user.name is NEVER used here — businessName must be typed by the user

      } catch (err) {
        setApiError("Network error. Please check your connection.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setApiError("");
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Required";
    } else if (formData.businessName.trim().length < 2) {
      newErrors.businessName = "At least 2 characters";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Required";
    } else if (
      !/^[+]?[\d\s\-()]{10,}$/.test(formData.phoneNumber.replace(/\s/g, ""))
    ) {
      newErrors.phoneNumber = "Invalid phone number";
    }

    if (!formData.district.trim()) {
      newErrors.district = "Required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "Required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Required";
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Enter complete address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setSubmitSuccess(false);

    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (!validateForm()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setApiError("You are not authenticated. Please log in again.");
      return;
    }

    setIsLoading(true);

    try {
      // Only EmployerProfile fields are sent — user.name is never included
      const res = await fetch("http://localhost:5001/api/employer-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          businessName: formData.businessName.trim(),
          phoneNumber: formData.phoneNumber.trim(),
          district: formData.district.trim(),
          state: formData.state.trim(),
          address: formData.address.trim(),
          aboutCompany: formData.aboutCompany.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setSubmitSuccess(true);
        // Tell EmployerNavbar to re-fetch employerProfile so it shows businessName correctly
        window.dispatchEvent(new Event("employer:profileUpdated"));
        setTimeout(() => {
          navigate("/employer");
        }, 1200);
      } else {
        if (res.status === 401) {
          setApiError("Session expired. Please log in again.");
        } else if (res.status === 400 || res.status === 422) {
          if (data.errors && typeof data.errors === "object") {
            setErrors((prev) => ({ ...prev, ...data.errors }));
          } else {
            setApiError(data.message || "Validation failed. Please check your inputs.");
          }
        } else {
          setApiError(data.message || "Something went wrong. Please try again.");
        }
      }
    } catch (err) {
      setApiError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-blue-600">
          <Loader2 size={40} className="animate-spin" />
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br px-4">
      <div className="max-w-6xl mx-auto pt-10">
        <div className="grid lg:grid-cols-5 gap-0 bg-white border-gray-200 border-1 rounded-3xl shadow-lg overflow-hidden">

          {/* Left Sidebar */}
          <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

            <div className="relative z-10">
              <div className="mb-8">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                  <Building2 size={32} className="text-white" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
                <p className="text-blue-100">Set up your business profile to start hiring</p>
              </div>

              <div className="space-y-6 mt-12">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Post Jobs Easily</h3>
                    <p className="text-sm text-blue-100">Create and manage job listings in minutes</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Find Qualified Talent</h3>
                    <p className="text-sm text-blue-100">Access a pool of skilled job seekers</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Verified & Secure</h3>
                    <p className="text-sm text-blue-100">Your business profile will be verified</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/20"></div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="lg:col-span-3 p-8 lg:p-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Profile Setup</h2>
              <p className="text-gray-600">Provide your business details for verification</p>
            </div>

            {apiError && (
              <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                <p className="text-sm font-medium">{apiError}</p>
              </div>
            )}

            {submitSuccess && (
              <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
                <CheckCircle size={18} className="flex-shrink-0" />
                <p className="text-sm font-medium">Profile saved! Redirecting to dashboard...</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-5">

                {/* Row 1: Business Name & Contact Number */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Business Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isLoading}
                        className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none transition-all text-gray-900 disabled:opacity-60 disabled:cursor-not-allowed ${
                          touched.businessName && errors.businessName
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 focus:border-blue-500 bg-gray-50 group-hover:bg-white"
                        }`}
                        placeholder="e.g., Falafel Rabia"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <Building2 size={18} className="text-gray-400" />
                      </div>
                    </div>
                    {touched.businessName && errors.businessName && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.businessName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isLoading}
                        className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none transition-all text-gray-900 disabled:opacity-60 disabled:cursor-not-allowed ${
                          touched.phoneNumber && errors.phoneNumber
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 focus:border-blue-500 bg-gray-50 group-hover:bg-white"
                        }`}
                        placeholder="+91 XXXXX XXXXX"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <Phone size={18} className="text-gray-400" />
                      </div>
                    </div>
                    {touched.phoneNumber && errors.phoneNumber && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: District & State */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      District <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isLoading}
                        className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none transition-all text-gray-900 disabled:opacity-60 disabled:cursor-not-allowed ${
                          touched.district && errors.district
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 focus:border-blue-500 bg-gray-50 group-hover:bg-white"
                        }`}
                        placeholder="e.g., Tirur"
                      />
                    </div>
                    {touched.district && errors.district && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.district}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isLoading}
                        className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none transition-all text-gray-900 disabled:opacity-60 disabled:cursor-not-allowed ${
                          touched.state && errors.state
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 focus:border-blue-500 bg-gray-50 group-hover:bg-white"
                        }`}
                        placeholder="e.g., Kerala"
                      />
                    </div>
                    {touched.state && errors.state && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.state}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 3: Business Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Business Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isLoading}
                      rows={3}
                      className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none transition-all text-gray-900 resize-none disabled:opacity-60 disabled:cursor-not-allowed ${
                        touched.address && errors.address
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-blue-500 bg-gray-50 group-hover:bg-white"
                      }`}
                      placeholder="Street, Building, Area, City, PIN Code"
                    />
                    <div className="absolute top-3.5 right-3 pointer-events-none">
                      <MapPin size={18} className="text-gray-400" />
                    </div>
                  </div>
                  {touched.address && errors.address && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.address}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || submitSuccess}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Saving...
                    </>
                  ) : submitSuccess ? (
                    <>
                      <CheckCircle size={20} />
                      Saved!
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      Save Business Profile
                    </>
                  )}
                </button>

              </div>
            </form>
          </div>
        </div>

        <div className="text-center mt-6 mb-8">
          <p className="text-gray-600 text-sm">
            Need assistance?{" "}
            <a href="#" className="text-blue-600 font-semibold hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}