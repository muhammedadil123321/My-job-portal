import React, { useState } from "react";
import {
  User,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  Save,
  Calendar,
  GraduationCap,
  Briefcase,
  Plus,
  X,
  Globe,
  Award,
  Users,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function WorkerProfileForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    age: "",
    email: user?.email || "",
    phoneNumber: "",
    education: "",
    languages: [],
    skills: [],
    city: "",
    state: "",
    address: "",
  });

  const [currentLanguage, setCurrentLanguage] = useState("");
  const [currentSkill, setCurrentSkill] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const educationLevels = [
    "Secondary Education",
    "Higher Secondary Education",
    "Advanced Education",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const addLanguage = () => {
    if (
      currentLanguage.trim() &&
      !formData.languages.includes(currentLanguage.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        languages: [...prev.languages, currentLanguage.trim()],
      }));
      setCurrentLanguage("");
      if (errors.languages) {
        setErrors((prev) => ({
          ...prev,
          languages: "",
        }));
      }
    }
  };

  const removeLanguage = (languageToRemove) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang !== languageToRemove),
    }));
  };

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()],
      }));
      setCurrentSkill("");
      if (errors.skills) {
        setErrors((prev) => ({
          ...prev,
          skills: "",
        }));
      }
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Required";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Required";
    } else if (
      !/^[+]?[\d\s-()]{10,}$/.test(formData.phoneNumber.replace(/\s/g, ""))
    ) {
      newErrors.phoneNumber = "Invalid phone number";
    }

    if (!formData.age) {
      newErrors.age = "Required";
    } else if (formData.age < 18 || formData.age > 100) {
      newErrors.age = "Age must be 18-100";
    }

    if (!formData.education.trim()) {
      newErrors.education = "Required";
    }

    if (formData.languages.length === 0) {
      newErrors.languages = "Add at least one language";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (formData.skills.length === 0) {
      newErrors.skills = "Add at least one skill";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Required";
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

  const handleContinue = () => {
    // Mark step 1 fields as touched
    const step1Fields = [
      "fullName",
      "email",
      "phoneNumber",
      "age",
      "education",
      "languages",
    ];
    const newTouched = {};
    step1Fields.forEach((field) => {
      newTouched[field] = true;
    });
    setTouched((prev) => ({ ...prev, ...newTouched }));

    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // mark touched
    const step2Fields = ["skills", "city", "state", "address"];
    const newTouched = {};
    step2Fields.forEach((f) => (newTouched[f] = true));
    setTouched((prev) => ({ ...prev, ...newTouched }));

    if (!validateStep2()) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5001/api/worker-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to save profile");
        return;
      }

      alert("Worker profile saved successfully");
      navigate("/findjob");
    } catch (err) {
      alert("Server error");
    }
  };
  return (
    <div className="h-screen bg-gradient-to-br px-4 ">
      <div className="max-w-6xl mx-auto pt-10 ">
        {/* Unique Split Layout */}
        <div className="grid lg:grid-cols-5 gap-0 bg-white border-gray-200 border-1 rounded-3xl shadow-lg overflow-hidden">
          {/* Left Sidebar - Brand Section */}
          <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 lg:p-12 text-white relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

            <div className="relative z-10">
              {/* Logo/Icon */}
              <div className="mb-8">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                  <User size={32} className="text-white" />
                </div>
                <h1 className="text-3xl font-bold mb-2">
                  Complete Your Profile
                </h1>
                <p className="text-blue-100">
                  Set up your worker profile to find jobs
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      currentStep >= 1
                        ? "bg-white text-blue-600"
                        : "bg-white/20 text-white"
                    }`}
                  >
                    1
                  </div>
                  <div
                    className={`flex-1 h-1 rounded ${
                      currentStep >= 2 ? "bg-white" : "bg-white/20"
                    }`}
                  ></div>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      currentStep >= 2
                        ? "bg-white text-blue-600"
                        : "bg-white/20 text-white"
                    }`}
                  >
                    2
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span
                    className={
                      currentStep >= 1 ? "font-semibold" : "text-blue-100"
                    }
                  >
                    Personal Info
                  </span>
                  <span
                    className={
                      currentStep >= 2 ? "font-semibold" : "text-blue-100"
                    }
                  >
                    Skills & Location
                  </span>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-6 mt-12">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Find Jobs Easily</h3>
                    <p className="text-sm text-blue-100">
                      Browse and apply for jobs in your area
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      Connect with Employers
                    </h3>
                    <p className="text-sm text-blue-100">
                      Get hired by verified companies
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Build Your Career</h3>
                    <p className="text-sm text-blue-100">
                      Showcase your skills and experience
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="lg:col-span-3 p-8 lg:p-12">
            {/* Form Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {currentStep === 1
                  ? "Personal Information"
                  : "Skills & Location"}
              </h2>
              <p className="text-gray-600">
                {currentStep === 1
                  ? "Fill in your personal details to get started"
                  : "Add your skills and location to complete your profile"}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-8">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div>
                    <div className="space-y-5">
                      {/* Row 1: Full Name & Email */}
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Full Name (Display Only) */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name
                          </label>
                          <div className="relative">
                            <div className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl bg-blue-100 text-gray-900">
                              {formData.fullName || "Not provided"}
                            </div>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <User size={18} className="text-gray-400" />
                            </div>
                          </div>
                        </div>

                        {/* Email (Display Only) */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Addres
                          </label>
                          <div className="relative">
                            <div className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl bg-blue-100 text-gray-900">
                              {formData.email || "Not provided"}
                            </div>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <Mail size={18} className="text-gray-400" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Row 2: Contact Number & Age */}
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Phone */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Contact Number{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative group">
                            <input
                              type="tel"
                              name="phoneNumber"
                              value={formData.phoneNumber}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none transition-all text-gray-900 ${
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

                        {/* Age */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Age <span className="text-red-500">*</span>
                          </label>
                          <div className="relative group">
                            <input
                              type="number"
                              name="age"
                              value={formData.age}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              min="18"
                              max="100"
                              className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none transition-all text-gray-900 ${
                                touched.age && errors.age
                                  ? "border-red-500 bg-red-50"
                                  : "border-gray-200 focus:border-blue-500 bg-gray-50 group-hover:bg-white"
                              }`}
                              placeholder="e.g., 25"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <Calendar size={18} className="text-gray-400" />
                            </div>
                          </div>
                          {touched.age && errors.age && (
                            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                              <AlertCircle size={12} /> {errors.age}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Row 3: Education Level & Languages Known */}
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Education */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Education Level{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative group">
                            <select
                              name="education"
                              value={formData.education}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none transition-all text-gray-900 ${
                                touched.education && errors.education
                                  ? "border-red-500 bg-red-50"
                                  : "border-gray-200 focus:border-blue-500 bg-gray-50 group-hover:bg-white"
                              }`}
                            >
                              <option value="">Select education level</option>
                              {educationLevels.map((level) => (
                                <option key={level} value={level}>
                                  {level}
                                </option>
                              ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <GraduationCap
                                size={18}
                                className="text-gray-400"
                              />
                            </div>
                          </div>
                          {touched.education && errors.education && (
                            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                              <AlertCircle size={12} /> {errors.education}
                            </p>
                          )}
                        </div>

                        {/* Languages Known */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Languages Known{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="flex gap-2">
                            <div className="relative flex-1 group">
                              <input
                                type="text"
                                value={currentLanguage}
                                onChange={(e) =>
                                  setCurrentLanguage(e.target.value)
                                }
                                onKeyPress={(e) =>
                                  e.key === "Enter" &&
                                  (e.preventDefault(), addLanguage())
                                }
                                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 bg-gray-50 group-hover:bg-white transition-all text-gray-900"
                                placeholder="e.g., English, Hindi"
                              />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <Globe size={18} className="text-gray-400" />
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={addLanguage}
                              className="px-3 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition flex items-center gap-2 font-semibold"
                            >
                              <Plus size={18} />
                            </button>
                          </div>

                          {touched.languages && errors.languages && (
                            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                              <AlertCircle size={12} /> {errors.languages}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Languages Display */}
                      {formData.languages.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.languages.map((language, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200"
                            >
                              {language}
                              <button
                                type="button"
                                onClick={() => removeLanguage(language)}
                                className="hover:bg-blue-100 rounded-full p-0.5 transition"
                              >
                                <X size={14} />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Continue Button */}
                    <button
                      type="button"
                      onClick={handleContinue}
                      className="w-full sm:float-right sm:w-[100px] mt-16 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
                    >
                      Next
                      <ArrowRight size={20} />
                    </button>
                  </div>
                )}

                {/* Step 2: Skills & Location */}
                {currentStep === 2 && (
                  <div>
                    <div className="space-y-5">
                      {/* Row 1: Add Skills */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Your Skills <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2 mb-3">
                          <div className="relative flex-1 group">
                            <input
                              type="text"
                              value={currentSkill}
                              onChange={(e) => setCurrentSkill(e.target.value)}
                              onKeyPress={(e) =>
                                e.key === "Enter" &&
                                (e.preventDefault(), addSkill())
                              }
                              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 bg-gray-50 group-hover:bg-white transition-all text-gray-900"
                              placeholder="e.g., Carpentry, Plumbing, Electrical"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <Briefcase size={18} className="text-gray-400" />
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={addSkill}
                            className="px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition flex items-center gap-2 font-semibold"
                          >
                            <Plus size={18} />
                            Add
                          </button>
                        </div>

                        {formData.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-2">
                            {formData.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-200"
                              >
                                {skill}
                                <button
                                  type="button"
                                  onClick={() => removeSkill(skill)}
                                  className="hover:bg-green-100 rounded-full p-0.5 transition"
                                >
                                  <X size={14} />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}

                        {touched.skills && errors.skills && (
                          <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle size={12} /> {errors.skills}
                          </p>
                        )}
                      </div>

                      {/* Row 2: City & State */}
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* City */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            City <span className="text-red-500">*</span>
                          </label>
                          <div className="relative group">
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none transition-all text-gray-900 ${
                                touched.city && errors.city
                                  ? "border-red-500 bg-red-50"
                                  : "border-gray-200 focus:border-blue-500 bg-gray-50 group-hover:bg-white"
                              }`}
                              placeholder="e.g., Mumbai"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <MapPin size={18} className="text-gray-400" />
                            </div>
                          </div>
                          {touched.city && errors.city && (
                            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                              <AlertCircle size={12} /> {errors.city}
                            </p>
                          )}
                        </div>

                        {/* State */}
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
                              className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none transition-all text-gray-900 ${
                                touched.state && errors.state
                                  ? "border-red-500 bg-red-50"
                                  : "border-gray-200 focus:border-blue-500 bg-gray-50 group-hover:bg-white"
                              }`}
                              placeholder="e.g., Maharashtra"
                            />
                          </div>
                          {touched.state && errors.state && (
                            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                              <AlertCircle size={12} /> {errors.state}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Row 3: Address */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative group">
                          <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            rows={3}
                            className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none transition-all text-gray-900 resize-none ${
                              touched.address && errors.address
                                ? "border-red-500 bg-red-50"
                                : "border-gray-200 focus:border-blue-500 bg-gray-50 group-hover:bg-white"
                            }`}
                            placeholder="Street, Area, Landmark, PIN Code"
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
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-8">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
                      >
                        <Save size={20} />
                        Save Worker Profile
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Help Text */}
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
