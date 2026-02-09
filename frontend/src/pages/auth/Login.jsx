import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
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
    const { email, password } = formData;

    // Check empty fields
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return false;
    }

    // Validate email format
    if (!validateEmail(email.trim())) {
      setError("Please enter a valid email address");
      return false;
    }

    // Validate password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        {
          email: formData.email.trim(),
          password: formData.password,
        },
        {
          timeout: 10000, // 10 second timeout
        }
      );

      // Validate response structure
      if (!response.data || !response.data.token || !response.data.user) {
        setError("Invalid response from server. Please try again.");
        setLoading(false);
        return;
      }

      const { user, token } = response.data;

      // Validate user object has required fields
      if (!user.id || !user.role) {
        setError("Incomplete user data received. Please try again.");
        setLoading(false);
        return;
      }

      // Save auth globally
      login(user, token);

      // Reset form
      setFormData({ email: "", password: "" });

      // Redirect by role
      const role = user.role.toLowerCase();

      switch (role) {
        case "student":
          navigate("/findjob");
          break;
        case "employer":
          navigate("/employer");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          setError(`Unknown role: ${role}`);
          setLoading(false);
      }
    } catch (error) {
      setLoading(false);

      // Handle different error types
      if (error.response) {
        // Backend returned error response
        const message = error.response.data?.message || "Login failed";
        setError(message);
      } else if (error.request) {
        // Request made but no response
        setError("No response from server. Please check your connection.");
      } else if (error.code === "ECONNABORTED") {
        // Request timeout
        setError("Request timeout. Please try again.");
      } else {
        // Other errors
        setError(error.message || "Login failed. Please try again.");
      }
    }
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Side - Image (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
            <div className="mb-8">
              <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
                <Lock className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-center">
              Welcome to Our Platform
            </h1>
            <p className="text-lg text-center text-blue-100 max-w-md">
              Access your account and manage everything from one secure place.
              Your journey continues here.
            </p>
            <div className="mt-12 flex gap-3">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-white/70 rounded-full animate-pulse delay-100"></div>
              <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12">
          {/* Logo for mobile */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">Login to continue your journey</p>
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
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

            {/* Password Field */}
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
                  placeholder="Enter your password"
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

            {/* Forgot Password */}
            <div className="text-right text-sm">
              <a
                href="#"
                className="text-blue-700 hover:text-blue-800 transition-colors"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <NavLink
                to="/signup"
                className="text-blue-700 hover:text-blue-800 transition-colors"
              >
                Register here
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}