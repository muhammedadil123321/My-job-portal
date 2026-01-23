import React, { useState } from 'react';
import { Camera, MapPin, Phone, Mail, Briefcase, Check } from 'lucide-react';

export default function ProfileForm() {
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    shopName: '',
    businessCategory: '',
    city: '',
    phoneNumber: '',
    email: '',
    aboutDescription: ''
  });

  const [errors, setErrors] = useState({});

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
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.shopName.trim()) {
      newErrors.shopName = 'Business name is required';
    }
    if (!formData.businessCategory.trim()) {
      newErrors.businessCategory = 'Business category is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[+]?[\d\s-()]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.aboutDescription.trim()) {
      newErrors.aboutDescription = 'Company description is required';
    } else if (formData.aboutDescription.length < 50) {
      newErrors.aboutDescription = 'Description should be at least 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Profile setup complete! Your account is pending approval.');
      // Here you would typically send data to your backend
    }
  };

  const businessCategories = [
    'Technology',
    'Healthcare',
    'Education',
    'Retail',
    'Manufacturing',
    'Construction',
    'Finance',
    'Hospitality',
    'Transportation',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          
          {/* Header */}
          <div className="px-6 py-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Complete Your Employer Profile
            </h1>
            <p className="text-gray-600">
              Fill in your business details to start posting jobs
            </p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="px-6 py-8">
            
            {/* Profile Picture Section */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h2>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-semibold text-gray-600">
                        {formData.shopName.charAt(0) || '?'}
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
                <div>
                  <p className="text-sm text-gray-700 mb-1 font-medium">Upload your company logo</p>
                  <p className="text-xs text-gray-500">JPG, PNG or GIF (max 5MB) - Optional</p>
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business/Company Name *
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="shopName"
                      value={formData.shopName}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.shopName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., TechVista Solutions"
                    />
                  </div>
                  {errors.shopName && (
                    <p className="mt-1 text-sm text-red-600">{errors.shopName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Category *
                  </label>
                  <select
                    name="businessCategory"
                    value={formData.businessCategory}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.businessCategory ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a category</option>
                    {businessCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.businessCategory && (
                    <p className="mt-1 text-sm text-red-600">{errors.businessCategory}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Bangalore"
                    />
                  </div>
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="contact@company.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> This contact information will be visible to job seekers when you post jobs.
                  </p>
                </div>
              </div>
            </div>

            {/* About Company */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">About Your Company</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Description *
                </label>
                <textarea
                  name="aboutDescription"
                  value={formData.aboutDescription}
                  onChange={handleChange}
                  maxLength={250}
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                    errors.aboutDescription ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Write a brief description about your company, what you do, and what makes you unique..."
                />
                <div className="flex justify-between items-center mt-2">
                  <p className={`text-sm ${formData.aboutDescription.length < 50 ? 'text-gray-500' : 'text-green-600'}`}>
                    {formData.aboutDescription.length}/250 characters (minimum 50)
                  </p>
                </div>
                {errors.aboutDescription && (
                  <p className="mt-1 text-sm text-red-600">{errors.aboutDescription}</p>
                )}
              </div>
            </div>

            {/* Approval Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-amber-800">
                <strong>Approval Required:</strong> Your profile will be reviewed by our team. You'll be able to post jobs once approved (usually within 24 hours).
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white text-base font-semibold rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              <Check size={20} />
              Complete Profile Setup
            </button>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help? <a href="#" className="text-blue-600 hover:underline font-medium">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
}