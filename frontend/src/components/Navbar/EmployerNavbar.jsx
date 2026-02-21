import React, { useState, useEffect } from "react";
import {
  Bell,
  Menu,
  X,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Briefcase,
  Home,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import logoIcon from "../../assets/images/logoicon.png";
import { useAuth } from "../../context/AuthContext";

function EmployerNavbar({ onMenuToggle }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [employerProfile, setEmployerProfile] = useState(null);

  const fetchEmployerProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

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

      if (!response.ok) return;

      const data = await response.json();
      setEmployerProfile(data);
    } catch (err) {
      // Silently fail
    }
  };

  useEffect(() => {
    fetchEmployerProfile();

    window.addEventListener("employer:profileUpdated", fetchEmployerProfile);

    return () => {
      window.removeEventListener("employer:profileUpdated", fetchEmployerProfile);
    };
  }, []);

  const notifications = [
    {
      id: 1,
      text: "New application for Frontend Developer position",
      time: "2 minutes ago",
      unread: true,
    },
    {
      id: 2,
      text: "Job posting 'Senior React Developer' has been approved",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      text: "5 new candidates viewed your company profile",
      time: "3 hours ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Avatar shared JSX — only uses employerProfile, never user.name
  const Avatar = ({ size }) => (
    <div
      className={`${size} rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md overflow-hidden`}
    >
      {employerProfile?.profileImage ? (
        <img
          src={employerProfile.profileImage}
          alt={employerProfile.businessName}
          className="w-full h-full object-cover"
        />
      ) : (
        <span>
          {employerProfile?.businessName
            ? employerProfile.businessName.charAt(0).toUpperCase()
            : "E"}
        </span>
      )}
    </div>
  );

  // Sidebar avatar uses white/20 bg instead of gradient
  const SidebarAvatar = () => (
    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
      {employerProfile?.profileImage ? (
        <img
          src={employerProfile.profileImage}
          alt={employerProfile?.businessName}
          className="w-full h-full object-cover"
        />
      ) : (
        <span>
          {employerProfile?.businessName
            ? employerProfile.businessName.charAt(0).toUpperCase()
            : "E"}
        </span>
      )}
    </div>
  );

  return (
    <nav className="w-full h-[72px] bg-white border-b border-gray-200">
      <div className="h-full flex items-center justify-between px-8 max-w-[1920px] mx-auto">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="lg:hidden p-2 hover:bg-gray-50 rounded-md transition text-gray-700"
          >
            {showSidebar ? <X size={24} /> : <Menu size={24} />}
          </button>

          <NavLink to="/employer/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src={logoIcon} alt="Earnease logo" className="w-full h-full object-contain" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-outfit text-2xl font-bold text-gray-900 leading-tight">
                Earnease
              </h1>
            </div>
          </NavLink>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              className="relative p-2.5 text-gray-700 bg-blue-50 hover:bg-blue-100 shadow-sm border border-gray-100 hover:text-gray-900 rounded-full transition"
            >
              <Bell size={22} strokeWidth={2} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                <div className="absolute right-0 top-full mt-3 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-gray-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`px-5 py-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition ${
                          notif.unread ? "bg-blue-50/30" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {notif.unread && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm leading-relaxed ${notif.unread ? "text-gray-900 font-medium" : "text-gray-700"}`}>
                              {notif.text}
                            </p>
                            <p className="text-xs text-gray-500 mt-1.5">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-5 py-3 bg-gray-50 text-center border-t border-gray-100">
                    <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
                      View all notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-3 pr-2 py-2 hover:bg-gray-50 rounded-lg transition group"
            >
              <Avatar size="w-10 h-10 text-sm" />

              <div className="hidden md:block text-left">
                {/* businessName only — never user.name */}
                <p className="text-sm font-semibold text-gray-900 leading-tight truncate max-w-[120px]">
                  {employerProfile?.businessName}
                </p>
                {/* email from AuthContext — this is correct, email lives in User model */}
                <p className="text-xs text-gray-500 truncate max-w-[120px]">
                  {user?.email}
                </p>
              </div>
              <ChevronDown size={16} className="text-gray-500 hidden md:block group-hover:text-gray-700" />
            </button>

            {showProfileMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />
                <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">

                  {/* Dropdown header — businessName + email, never user.name */}
                  <div className="px-4 py-5 bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <Avatar size="w-12 h-12 text-base" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 truncate">
                          {employerProfile?.businessName}
                        </p>
                        <p className="text-sm text-gray-600 truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <NavLink
                      to="/employer/profile"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition font-medium"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <User size={18} />
                      <span className="text-sm">My Profile</span>
                    </NavLink>
                    <NavLink
                      to="/employer/settings"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition font-medium"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <Settings size={18} />
                      <span className="text-sm">Account Settings</span>
                    </NavLink>
                  </div>

                  <div className="border-t border-gray-100 py-2">
                    <button
                      className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition font-semibold w-full"
                      onClick={handleLogout}
                    >
                      <LogOut size={18} />
                      <span className="text-sm">Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <>
        {showSidebar && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowSidebar(false)}
          />
        )}

        <div
          className={`lg:hidden fixed top-0 left-0 min-h-screen w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
            showSidebar ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="px-6 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <span className="font-outfit text-xl font-bold">Earnease</span>
              <button
                onClick={() => setShowSidebar(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Sidebar header — businessName + email, never user.name */}
            <div className="flex items-center gap-3">
              <SidebarAvatar />
              <div>
                <p className="font-semibold text-white">
                  {employerProfile?.businessName}
                </p>
                <p className="text-sm text-blue-100">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col h-[calc(100vh-180px)]">
            <div className="flex-1 overflow-y-auto py-4">
              <NavLink
                to="/employer/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-4 px-6 py-4 transition ${
                    isActive ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600" : "text-gray-700 hover:bg-gray-50"
                  }`
                }
                onClick={() => setShowSidebar(false)}
              >
                <Home size={22} strokeWidth={2} />
                <span className="font-medium">Dashboard</span>
              </NavLink>

              <NavLink
                to="/employer/jobs"
                className={({ isActive }) =>
                  `flex items-center gap-4 px-6 py-4 transition ${
                    isActive ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600" : "text-gray-700 hover:bg-gray-50"
                  }`
                }
                onClick={() => setShowSidebar(false)}
              >
                <Briefcase size={22} strokeWidth={2} />
                <span className="font-medium">My Jobs</span>
              </NavLink>

              <NavLink
                to="/employer/profile"
                className={({ isActive }) =>
                  `flex items-center gap-4 px-6 py-4 transition ${
                    isActive ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600" : "text-gray-700 hover:bg-gray-50"
                  }`
                }
                onClick={() => setShowSidebar(false)}
              >
                <User size={22} strokeWidth={2} />
                <span className="font-medium">My Profile</span>
              </NavLink>

              <NavLink
                to="/employer/settings"
                className={({ isActive }) =>
                  `flex items-center gap-4 px-6 py-4 transition ${
                    isActive ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600" : "text-gray-700 hover:bg-gray-50"
                  }`
                }
                onClick={() => setShowSidebar(false)}
              >
                <Settings size={22} strokeWidth={2} />
                <span className="font-medium">Settings</span>
              </NavLink>
            </div>

            <div className="border-t border-gray-200 bg-blue-50 p-4">
              <button
                onClick={() => {
                  setShowSidebar(false);
                  handleLogout();
                }}
                className="flex items-center gap-4 px-6 py-4 text-red-600 hover:bg-red-50 rounded-lg transition w-full font-medium"
              >
                <LogOut size={22} strokeWidth={2} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </>
    </nav>
  );
}

export default EmployerNavbar;