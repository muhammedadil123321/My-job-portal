import React, { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Briefcase,
  FileText,
  MapPin,
  CheckCircle,
  X,
  Plus,
  Target,
  AlertCircle,
} from "lucide-react";

// ErrorMessage Component
const ErrorMessage = ({ field, errors }) => {
  return errors[field] ? (
    <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
      <AlertCircle className="w-4 h-4" />
      {errors[field]}
    </div>
  ) : null;
};

export default function PostJob() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    workPlaceName: "",
    jobType: "",
    workingTimeStart: "",
    workingTimeEnd: "",
    salaryMin: "",
    salaryMax: "",
    salaryType: "",
    jobSummary: "",
    responsibilities: [""],
    requiredSkills: [],
    city: "",
    state: "",
    district: "",
    workplaceAddress: "",
  });

  const [currentSkill, setCurrentSkill] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleResponsibilityChange = (index, value) => {
    const newResponsibilities = [...formData.responsibilities];
    newResponsibilities[index] = value;
    setFormData({ ...formData, responsibilities: newResponsibilities });
    if (errors.responsibilities) {
      setErrors({ ...errors, responsibilities: "" });
    }
  };

  const addResponsibility = () => {
    setFormData({
      ...formData,
      responsibilities: [...formData.responsibilities, ""],
    });
  };

  const removeResponsibility = (index) => {
    const newResponsibilities = formData.responsibilities.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, responsibilities: newResponsibilities });
  };

  const addSkill = () => {
    if (
      currentSkill.trim() &&
      !formData.requiredSkills.includes(currentSkill.trim())
    ) {
      setFormData({
        ...formData,
        requiredSkills: [...formData.requiredSkills, currentSkill.trim()],
      });
      setCurrentSkill("");
      if (errors.requiredSkills) {
        setErrors({ ...errors, requiredSkills: "" });
      }
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      requiredSkills: formData.requiredSkills.filter(
        (skill) => skill !== skillToRemove
      ),
    });
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.workPlaceName.trim())
        newErrors.workPlaceName = "Workplace name is required";
      if (!formData.jobTitle.trim())
        newErrors.jobTitle = "Job title is required";
      if (!formData.jobType)
        newErrors.jobType = "Job type is required";
      if (!formData.workingTimeStart)
        newErrors.workingTimeStart = "Start time is required";
      if (!formData.workingTimeEnd)
        newErrors.workingTimeEnd = "End time is required";
      if (!formData.salaryType)
        newErrors.salaryType = "Payment period is required";
      if (!formData.salaryMin)
        newErrors.salaryMin = "Minimum salary is required";
      if (!formData.salaryMax)
        newErrors.salaryMax = "Maximum salary is required";
      if (
        formData.salaryMin &&
        formData.salaryMax &&
        parseFloat(formData.salaryMin) > parseFloat(formData.salaryMax)
      ) {
        newErrors.salaryMin =
          "Minimum salary cannot be greater than maximum salary";
      }
    }

    if (currentStep === 2) {
      if (!formData.jobSummary.trim())
        newErrors.jobSummary = "Job summary is required";
      const filledResponsibilities = formData.responsibilities.filter((r) =>
        r.trim()
      );
      if (filledResponsibilities.length === 0)
        newErrors.responsibilities = "At least one responsibility is required";
      if (formData.requiredSkills.length === 0)
        newErrors.requiredSkills = "At least one skill is required";
    }

    if (currentStep === 3) {
      if (!formData.city.trim())
        newErrors.city = "City is required";
      if (!formData.state.trim())
        newErrors.state = "State is required";
      if (!formData.district.trim())
        newErrors.district = "District is required";
      if (!formData.workplaceAddress.trim())
        newErrors.workplaceAddress = "Workplace address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      if (step < 3) setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setErrors({});
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not authorized. Please log in again.");
      return;
    }

    // ✅ FLAT payload — every key matches your Mongoose schema exactly
    // ❌ Before (WRONG): nested objects workingTime:{}, salary:{}, location:{}
    // ✅ After  (CORRECT): flat fields workingTimeStart, salaryMin, city, etc.
    const payload = {
      workPlaceName:    formData.workPlaceName,
      jobTitle:         formData.jobTitle,
      jobSummary:       formData.jobSummary,
      responsibilities: formData.responsibilities.filter((r) => r.trim() !== ""),
      requiredSkills:   formData.requiredSkills,
      jobType:          formData.jobType,
      workingTimeStart: formData.workingTimeStart,
      workingTimeEnd:   formData.workingTimeEnd,
      salaryMin:        parseFloat(formData.salaryMin),
      salaryMax:        parseFloat(formData.salaryMax),
      salaryType:       formData.salaryType,
      city:             formData.city,
      state:            formData.state,
      district:          formData.district,
      workplaceAddress: formData.workplaceAddress,
    };

    try {
      setIsLoading(true);

      const response = await fetch("http://localhost:5001/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          alert("Session expired or unauthorized. Please log in again.");
          return;
        }
        throw new Error(data?.message || "Failed to post job. Please try again.");
      }

      alert("Job posted successfully!");

      // Reset form to initial state
      setFormData({
        jobTitle: "",
        workPlaceName: "",
        jobType: "",
        workingTimeStart: "",
        workingTimeEnd: "",
        salaryMin: "",
        salaryMax: "",
        salaryType: "",
        jobSummary: "",
        responsibilities: [""],
        requiredSkills: [],
        city: "",
        state: "",
        district: "",
        workplaceAddress: "",
      });
      setErrors({});
      setStep(1);
    } catch (error) {
      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, title: "Basic Information", icon: Briefcase },
    { number: 2, title: "Job Description", icon: FileText },
    { number: 3, title: "Location Details", icon: MapPin },
  ];

  const getSalaryPlaceholder = (salaryType) => {
    switch (salaryType) {
      case "monthly":
        return "Enter monthly salary";
      case "daily":
        return "Enter daily wage";
      case "hourly":
        return "Enter hourly rate";
      default:
        return "Enter salary";
    }
  };

  return (
    <div className="min-h-full bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Post a New Job
          </h1>
          <p className="text-gray-600 text-md">
            Complete the form below to create your job listing
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <React.Fragment key={s.number}>
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                        step >= s.number
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-white border-gray-300 text-gray-400"
                      }`}
                    >
                      {step > s.number ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <p
                      className={`mt-2 text-sm font-medium ${
                        step >= s.number ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {s.title}
                    </p>
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 transition-all ${
                        step > s.number ? "bg-blue-600" : "bg-gray-300"
                      }`}
                      style={{ maxWidth: "120px" }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200 px-8 py-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {step === 1 && "Basic Information"}
              {step === 2 && "Job Description"}
              {step === 3 && "Location Details"}
            </h2>
          </div>

          <div className="p-8">
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Workplace Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="workPlaceName"
                      value={formData.workPlaceName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.workPlaceName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="e.g. TVS Ltd"
                    />
                    <ErrorMessage field="workPlaceName" errors={errors} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.jobTitle ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="e.g. Delivery Boy"
                    />
                    <ErrorMessage field="jobTitle" errors={errors} />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-base font-medium text-gray-900 mb-4">
                    Working Hours
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="jobType"
                        value={formData.jobType}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.jobType ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Select job type</option>
                        <option value="part-time">Part-time</option>
                        <option value="hourly">Hourly</option>
                        <option value="weekend-time">Weekend-time</option>
                        <option value="season-time">Season-Time</option>
                      </select>
                      <ErrorMessage field="jobType" errors={errors} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        name="workingTimeStart"
                        value={formData.workingTimeStart}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.workingTimeStart ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      <ErrorMessage field="workingTimeStart" errors={errors} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        name="workingTimeEnd"
                        value={formData.workingTimeEnd}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.workingTimeEnd ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      <ErrorMessage field="workingTimeEnd" errors={errors} />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-base font-medium text-gray-900 mb-4">
                    Salary Range
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Period <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="salaryType"
                        value={formData.salaryType}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.salaryType ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Select payment period</option>
                        <option value="monthly">Monthly</option>
                        <option value="daily">Daily</option>
                        <option value="hourly">Hourly</option>
                      </select>
                      <ErrorMessage field="salaryType" errors={errors} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Salary <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="salaryMin"
                        value={formData.salaryMin}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.salaryMin ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder={getSalaryPlaceholder(formData.salaryType)}
                      />
                      <ErrorMessage field="salaryMin" errors={errors} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Maximum Salary <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="salaryMax"
                        value={formData.salaryMax}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.salaryMax ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder={getSalaryPlaceholder(formData.salaryType)}
                      />
                      <ErrorMessage field="salaryMax" errors={errors} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Job Description */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Summary <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="jobSummary"
                    value={formData.jobSummary}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                      errors.jobSummary ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Provide a comprehensive overview of the position..."
                  />
                  <ErrorMessage field="jobSummary" errors={errors} />
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <label className="block text-sm font-medium text-gray-900 mb-4">
                    Key Responsibilities <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-3">
                    {formData.responsibilities.map((resp, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-10 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {index + 1}.
                          </span>
                        </div>
                        <input
                          type="text"
                          value={resp}
                          onChange={(e) =>
                            handleResponsibilityChange(index, e.target.value)
                          }
                          placeholder="Enter responsibility..."
                          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {formData.responsibilities.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeResponsibility(index)}
                            className="flex-shrink-0 p-2 text-gray-400 hover:text-red-600"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <ErrorMessage field="responsibilities" errors={errors} />
                  <button
                    type="button"
                    onClick={addResponsibility}
                    className="mt-4 flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Add Another Responsibility
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <label className="block text-sm font-medium text-gray-900 mb-4">
                    Required Skills <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-3 mb-4">
                    <input
                      type="text"
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addSkill())
                      }
                      placeholder="Type a skill and press Enter"
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="px-6 py-2.5 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                  <ErrorMessage field="requiredSkills" errors={errors} />

                  {formData.requiredSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {formData.requiredSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium border border-gray-300"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="hover:text-gray-900"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-md border border-gray-200">
                      <Target className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                      <p className="text-gray-500 text-sm">No skills added yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Work Location */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="e.g. San Francisco"
                    />
                    <ErrorMessage field="city" errors={errors} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      District <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.district ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="e.g. Ernakulam"
                    />
                    <ErrorMessage field="district" errors={errors} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.state ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="e.g. California"
                    />
                    <ErrorMessage field="state" errors={errors} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Workplace Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="workplaceAddress"
                    value={formData.workplaceAddress}
                    onChange={handleChange}
                    rows="3"
                    className={`w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                      errors.workplaceAddress ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter the complete workplace address"
                  />
                  <ErrorMessage field="workplaceAddress" errors={errors} />
                </div>

                {formData.workplaceAddress && (
                  <div className="border-t border-gray-200 pt-6">
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Location Preview
                    </label>
                    <div className="w-full h-80 bg-gray-100 rounded-md overflow-hidden border border-gray-300">
                      <iframe
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(
                          formData.workplaceAddress
                        )}&output=embed`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        title="Job Location Map"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className={`flex items-center px-5 py-2.5 rounded-md font-medium ${
                  step === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Previous
              </button>

              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`flex items-center px-6 py-2.5 rounded-md font-medium text-white transition-colors ${
                    isLoading
                      ? "bg-green-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  {isLoading ? "Posting..." : "Post Job"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}