import React, { useState } from 'react';
import { Camera, MapPin, Phone, Mail, Calendar, Globe, GraduationCap, User, Briefcase, Check, Plus, X, ArrowRight, ArrowLeft } from 'lucide-react';

export default function WorkerProfileForm() {
  const [profileImage, setProfileImage] = useState(null);
  const [showSkillsSection, setShowSkillsSection] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
    phoneNumber: '',
    email: '',
    address: '',
    age: '',
    language: '',
    education: '',
    aboutDescription: '',
    skills: []
  });

  const [currentSkill, setCurrentSkill] = useState('');
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
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill('');
      if (errors.skills) {
        setErrors(prev => ({
          ...prev,
          skills: ''
        }));
      }
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const validatePersonalInfo = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
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
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (formData.age < 18 || formData.age > 100) {
      newErrors.age = 'Age must be between 18 and 100';
    }
    if (!formData.language.trim()) {
      newErrors.language = 'Language is required';
    }
    if (!formData.education.trim()) {
      newErrors.education = 'Education is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSkillsAndAbout = () => {
    const newErrors = {};

    if (!formData.aboutDescription.trim()) {
      newErrors.aboutDescription = 'About description is required';
    } else if (formData.aboutDescription.length < 50) {
      newErrors.aboutDescription = 'Description should be at least 50 characters';
    }
    if (formData.skills.length === 0) {
      newErrors.skills = 'Add at least one skill';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validatePersonalInfo()) {
      setShowSkillsSection(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setShowSkillsSection(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    if (validateSkillsAndAbout()) {
      console.log('Form submitted:', formData);
      alert('Profile setup complete! Your account is pending approval.');
    }
  };

  const educationLevels = [
    'Below 10th',
    '10th Pass',
    '12th Pass',
    'Diploma',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-28 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          
          {/* Header */}
          <div className="px-6 py-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Complete Your Worker Profile
            </h1>
            <p className="text-gray-600">
              {!showSkillsSection ? 'Fill in your personal details' : 'Add your skills and description'}
            </p>
          </div>

          {/* Form Content */}
          <div className="px-6 py-8">
            
            {/* Personal Information Section */}
            {!showSkillsSection && (
              <>
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
                            {formData.name ? formData.name.split(' ').map(n => n[0]).join('') : '?'}
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
                      <p className="text-sm text-gray-700 mb-1 font-medium">Upload your photo</p>
                      <p className="text-xs text-gray-500">JPG, PNG or GIF (max 5MB) - Optional</p>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
                  <div className="space-y-5">
                    {/* Row 1: Full Name, Languages Known */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="e.g., John Doe"
                          />
                        </div>
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Languages Known *
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="text"
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.language ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="e.g., English, Hindi"
                          />
                        </div>
                        {errors.language && (
                          <p className="mt-1 text-sm text-red-600">{errors.language}</p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Age, City, State */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Age *
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            min="18"
                            max="100"
                            className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.age ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="e.g., 25"
                          />
                        </div>
                        {errors.age && (
                          <p className="mt-1 text-sm text-red-600">{errors.age}</p>
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
                            placeholder="e.g., Mumbai"
                          />
                        </div>
                        {errors.city && (
                          <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.state ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="e.g., Maharashtra"
                        />
                        {errors.state && (
                          <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                        )}
                      </div>
                    </div>

                    {/* Row 3: Email, Phone Number */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                            placeholder="john.doe@example.com"
                          />
                        </div>
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>

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
                    </div>

                    {/* Row 4: Education, Address */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Education Level *
                        </label>
                        <div className="relative">
                          <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <select
                            name="education"
                            value={formData.education}
                            onChange={handleChange}
                            className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.education ? 'border-red-500' : 'border-gray-300'
                            }`}
                          >
                            <option value="">Select education level</option>
                            {educationLevels.map(level => (
                              <option key={level} value={level}>{level}</option>
                            ))}
                          </select>
                        </div>
                        {errors.education && (
                          <p className="mt-1 text-sm text-red-600">{errors.education}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address *
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.address ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="e.g., Street, Area"
                        />
                        {errors.address && (
                          <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                        )}
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> This information will be visible to employers when you apply for jobs.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white text-base font-semibold rounded-lg hover:bg-blue-700 transition shadow-md"
                >
                  Next
                  <ArrowRight size={20} />
                </button>
              </>
            )}

            {/* Skills & About Section */}
            {showSkillsSection && (
              <>
                {/* Skills Section */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Add Your Skills *
                    </label>
                    <div className="flex gap-2 mb-3">
                      <div className="relative flex-1">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          value={currentSkill}
                          onChange={(e) => setCurrentSkill(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., Carpentry, Plumbing, Electrical Work"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={addSkill}
                        className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                      >
                        <Plus size={20} />
                        Add
                      </button>
                    </div>
                    
                    {formData.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {formData.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="hover:bg-blue-100 rounded-full p-0.5 transition"
                            >
                              <X size={16} />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {errors.skills && (
                      <p className="mt-2 text-sm text-red-600">{errors.skills}</p>
                    )}
                  </div>
                </div>

                {/* About Worker */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">About You</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
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
                      placeholder="Write about your work experience, skills, and what makes you a great worker..."
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
                    <strong>Approval Required:</strong> Your profile will be reviewed by our team. You'll be able to apply for jobs once approved (usually within 24 hours).
                  </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleBack}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 text-base font-semibold rounded-lg hover:bg-gray-200 transition"
                  >
                    <ArrowLeft size={20} />
                    Previous
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white text-base font-semibold rounded-lg hover:bg-blue-700 transition shadow-md"
                  >
                    <Check size={20} />
                    Submit
                  </button>
                </div>
              </>
            )}
          </div>
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