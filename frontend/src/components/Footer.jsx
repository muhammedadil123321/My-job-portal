import React from "react";
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import logoIcon from "../assets/images/logoicon.png";

export default function Footer() {
  return (
    <footer data-aos="fade-up" className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Job Portal Title & About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src={logoIcon}
                  alt="Earnease logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <h2 className="text-2xl font-bold bg-linear-to-r from-gray-100 to-blue-400 bg-clip-text text-transparent">
                Earnease
              </h2>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted platform for finding the perfect career opportunity.
              Connect with top employers and take your career to the next level.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-3 pt-2">
              <a href="#" className="group relative">
                <div className="absolute inset-0 bg-pink-500 blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-slate-900 p-2.5 rounded-lg hover:bg-linear-to-br hover:from-pink-500 hover:to-orange-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                  <Instagram className="w-5 h-5" />
                </div>
              </a>
              <a href="#" className="group relative">
                <div className="absolute inset-0 bg-blue-500 blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-slate-900 p-2.5 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                  <Facebook className="w-5 h-5" />
                </div>
              </a>
              <a href="#" className="group relative">
                <div className="absolute inset-0 bg-sky-400 blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-slate-900 p-2.5 rounded-lg hover:bg-sky-500 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                  <Twitter className="w-5 h-5" />
                </div>
              </a>
              <a href="#" className="group relative">
                <div className="absolute inset-0 bg-blue-600 blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-slate-800 p-2.5 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                  <Linkedin className="w-5 h-5" />
                </div>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-400 flex items-center space-x-2">
              <div className="w-1 h-6 bg-linear-to-b from-blue-400 to-cyan-300 rounded-full"></div>
              <span>Quick Links</span>
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                  Find Jobs
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                  Post a Job
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-400 flex items-center space-x-2">
              <div className="w-1 h-6 bg-linear-to-b from-blue-400 to-cyan-300 rounded-full"></div>
              <span>Support</span>
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-400 flex items-center space-x-2">
              <div className="w-1 h-6 bg-linear-to-b from-blue-400 to-cyan-300 rounded-full"></div>
              <span>Contact</span>
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:support@earnease.in"
                  className="flex items-start space-x-3 text-gray-300 hover:text-blue-400 transition-colors duration-200 group"
                >
                  <div className="relative mt-1">
                    <div className="absolute inset-0 bg-blue-500 blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                    <Mail className="w-5 h-5 relative transform group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-sm break-all">support@earnease.in</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+917012949560"
                  className="flex items-start space-x-3 text-gray-300 hover:text-blue-400 transition-colors duration-200 group"
                >
                  <div className="relative mt-1">
                    <div className="absolute inset-0 bg-green-500 blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                    <Phone className="w-5 h-5 relative transform group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-sm">+91 8891900699</span>
                </a>
              </li>
              <li>
                <div className="flex items-start space-x-3 text-gray-300 group">
                  <div className="relative mt-1">
                    <div className="absolute inset-0 bg-red-500 blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                    <MapPin className="w-5 h-5 relative transform group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-sm">Calicut, Kerala, India</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row  justify-center items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center">
              © 2025 EarnEase. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
