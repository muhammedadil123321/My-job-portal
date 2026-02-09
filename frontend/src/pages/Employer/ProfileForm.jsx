import React, { useState } from 'react';
import { Building2, AlertCircle, Check, Mail, Phone, MapPin, Save, User, Briefcase, Shield } from 'lucide-react';

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    businessName: '',
    state: '',
    district: '',
    address: '',
    email: '',
    phoneNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Required';
    } else if (formData.businessName.trim().length < 2) {
      newErrors.businessName = 'At least 2 characters';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'Required';
    }

    if (!formData.district.trim()) {
      newErrors.district = 'Required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Required';
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Enter complete address';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Required';
    } else if (!/^[+]?[\d\s-()]{10,}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Invalid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('✓ Business profile saved successfully! You can now start posting jobs.');
      setFormData({
        businessName: '',
        state: '',
        district: '',
        address: '',
        email: '',
        phoneNumber: ''
      });
      setErrors({});
      setTouched({});
    }
   
  };

  return (
    <div className=" bg-gradient-to-br  px-4">
      <div className="max-w-6xl mx-auto pt-16 ">
        
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
                  <Building2 size={32} className="text-white" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
                <p className="text-blue-100">Set up your business profile to start hiring</p>
              </div>

              {/* Features List */}
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

              {/* Stats */}
              <div className=" mt-12 pt-8 border-t border-white/20">
                
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="lg:col-span-3 p-8 lg:p-12">
            {/* Form Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Profile Setup</h2>
              <p className="text-gray-600">Provide your business details for verification</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                
                {/* Business Name & Email Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Business Name */}
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
                        className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none transition-all text-gray-900 ${
                          touched.businessName && errors.businessName
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 focus:border-blue-500 bg-gray-50 group-hover:bg-white'
                        }`}
                        placeholder="Your Company Name"
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

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Business Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none transition-all text-gray-900 ${
                          touched.email && errors.email
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 focus:border-blue-500 bg-gray-50 group-hover:bg-white'
                        }`}
                        placeholder="contact@company.com"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <Mail size={18} className="text-gray-400" />
                      </div>
                    </div>
                    {touched.email && errors.email && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone, District, State Row */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Phone */}
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
                        className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none transition-all text-gray-900 ${
                          touched.phoneNumber && errors.phoneNumber
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 focus:border-blue-500 bg-gray-50 group-hover:bg-white'
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

                  {/* District */}
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
                        className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none transition-all text-gray-900 ${
                          touched.district && errors.district
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 focus:border-blue-500 bg-gray-50 group-hover:bg-white'
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
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 focus:border-blue-500 bg-gray-50 group-hover:bg-white'
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

                {/* Address */}
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
                      rows={3}
                      className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none transition-all text-gray-900 resize-none ${
                        touched.address && errors.address
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 focus:border-blue-500 bg-gray-50 group-hover:bg-white'
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
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 group"
                >
                  <Save size={20} />
                  Save Business Profile
                </button>

             
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Help Text */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Need assistance? <a href="#" className="text-blue-600 font-semibold hover:underline">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
}