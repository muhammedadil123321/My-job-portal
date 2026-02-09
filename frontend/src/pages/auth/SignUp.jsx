import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Briefcase,
  UserCheck,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function SignUp() {
  const { login } = useAuth();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const { fullName, email, password } = formData;

    // Check empty fields
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required");
      return false;
    }

    // Validate full name (at least 2 characters)
    if (fullName.trim().length < 2) {
      setError("Full name must be at least 2 characters");
      return false;
    }

    // Validate email format
    if (!validateEmail(email.trim())) {
      setError("Please enter a valid email address");
      return false;
    }

    // Validate password (at least 6 characters)
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSignup = async (e) => {
  e.preventDefault();
  setError("");

  if (!validateForm()) return;
  setLoading(true);

  try {
    // 1️⃣ Register
    await axios.post("http://localhost:5001/api/auth/register", {
      name: formData.fullName.trim(),
      email: formData.email.trim(),
      password: formData.password,
      role,
    });

    // 2️⃣ Login
    const loginResponse = await axios.post(
      "http://localhost:5001/api/auth/login",
      {
        email: formData.email.trim(),
        password: formData.password,
      }
    );

    // ✅ FIXED HERE
    const { user: loggedInUser, token } = loginResponse.data;

    // 3️⃣ Update auth context
    login(loggedInUser, token);

    // 4️⃣ Clear form
    setFormData({ fullName: "", email: "", password: "" });

    // 5️⃣ Navigate to PROFILE FORM ONLY
    if (loggedInUser.role === "student") {
      navigate("/worker/profile-form");
    } else if (loggedInUser.role === "employer") {
      navigate("/employer/profile-form");
    } else {
      navigate("/");
    }

  } catch (error) {
    if (error.response) {
      setError(error.response.data?.message || "Registration failed");
    } else if (error.request) {
      setError("No response from server");
    } else {
      setError("Something went wrong");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Section — Decorative */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>

          <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
            <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
              <UserCheck className="w-16 h-16 text-white" />
            </div>

            <h1 className="text-4xl font-bold mb-4 text-center">
              Join Our Platform
            </h1>
            <p className="text-lg text-blue-100 max-w-md text-center">
              Create an account and start exploring local job opportunities or
              post jobs instantly.
            </p>

            <div className="mt-12 flex gap-3">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-white/70 rounded-full animate-pulse delay-100"></div>
              <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>

          {/* Decorative blurred circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>

        {/* Right Section — Signup Form */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl items-center justify-center mb-4">
              <UserCheck className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-4 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Create Your Account
            </h2>
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  disabled={loading}
                  className={`flex items-center justify-center gap-2 py-2 px-4 rounded-xl border-2 transition-all ${
                    role === "student"
                      ? "border-blue-600 bg-blue-50 text-blue-600 shadow-md"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <UserCheck className="w-5 h-5" />
                  <span className="font-medium">Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("employer")}
                  disabled={loading}
                  className={`flex items-center justify-center gap-2 py-2 px-4 rounded-xl border-2 transition-all ${
                    role === "employer"
                      ? "border-blue-600 bg-blue-50 text-blue-600 shadow-md"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <Briefcase className="w-5 h-5" />
                  <span className="font-medium">Employer</span>
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Enter your full name"
                  className="w-full pl-12 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Create a password"
                  className="w-full pl-12 pr-12 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:cursor-not-allowed"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mt-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600 mt-2">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="text-blue-700 hover:text-indigo-700 transition"
              >
                Login here
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
