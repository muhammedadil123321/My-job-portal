import React, { useEffect, useState } from "react";
import { Menu, X, Bell, User, Settings, LogOut, ChevronDown, Home, Briefcase, Clock, BookmarkIcon } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logoIcon from "../../assets/images/logoicon.png";
import { useAuth } from "../../context/AuthContext";

function UserNavbar() {
  const { isAuthenticated, role, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const toggleMenu = () => setIsOpen(!isOpen);

  // Sample notifications data
  const [notifications] = useState([
    {
      id: 1,
      text: "Your application for Software Developer position has been reviewed",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      text: "New job posting matches your profile",
      time: "5 hours ago",
      unread: true,
    },
    {
      id: 3,
      text: "Reminder: Complete your profile to increase visibility",
      time: "1 day ago",
      unread: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    if (!isHomePage) {
      setShowNav(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 60) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 backdrop-blur 
        ${showNav || isOpen ? "bg-white shadow-lg" : "bg-transparent"}
        py-2.5 px-6 md:px-16 lg:px-24 xl:px-32
      `}
    >
      <div className="flex items-center justify-between w-full">
        {/* LEFT SECTION - Logo with Sidebar Toggle */}
        <div className="flex items-center gap-4">
          {/* Sidebar Toggle - Only for authenticated users on mobile */}
          {isAuthenticated && (
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className={`md:hidden transition ${
                showNav || isOpen ? "text-gray-900" : "text-white"
              }`}
            >
              {showSidebar ? <X size={26} /> : <Menu size={26} />}
            </button>
          )}

          {/* LOGO */}
          <div
            className={`flex items-center gap-2 transition-colors ${
              showNav || isOpen ? "text-gray-900" : "text-white"
            }`}
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <img
                src={logoIcon}
                alt="Earnease logo"
                className="w-full h-full object-contain"
              />
            </div>

            <span
              className={`font-outfit text-2xl font-bold transition-colors duration-300 bg-linear-to-r bg-clip-text text-transparent ${
                showNav || isOpen
                  ? "from-blue-900 to-gray-950"
                  : "from-blue-400 via-white to-gray-100"
              }`}
            >
              Earnease
            </span>
          </div>
        </div>

        {/* DESKTOP MENU */}
        <div
          className={`hidden md:flex items-center gap-8 font-semibold
            ${showNav ? "text-gray-900" : "text-white"}
          `}
        >
          {!isAuthenticated && (
            <>
              {/* For Student – Dropdown */}
              <div className="relative group flex items-center gap-1 cursor-pointer">
                <NavLink
                  to="/"
                  className="block py-1 hover:translate-x-1 hover:text-blue-600 transition"
                >
                  For Student
                </NavLink>

                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform duration-300 group-hover:rotate-180
                    ${showNav ? "stroke-gray-900" : "stroke-white"}
                  `}
                >
                  <path
                    d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div
                  className="absolute top-10 left-0 min-w-[180px]
                    bg-white text-gray-700 font-normal
                    rounded-lg shadow-lg p-4
                    opacity-0 invisible -translate-y-3
                    group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                    transition-all duration-300 z-50"
                >
                  <NavLink
                    to="/signup"
                    className="block py-1 hover:translate-x-1 hover:text-blue-600 transition"
                  >
                    Register to Apply
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="block py-1 hover:translate-x-1 hover:text-blue-600 transition"
                  >
                    Login to Apply
                  </NavLink>
                </div>
              </div>

              {/* For Employer – Dropdown */}
              <div className="relative group flex items-center gap-1 cursor-pointer">
                <span className="block py-1 hover:translate-x-1 hover:text-blue-600 transition">
                  For Employer
                </span>

                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform duration-300 group-hover:rotate-180
                    ${showNav ? "stroke-gray-900" : "stroke-white"}
                  `}
                >
                  <path
                    d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div
                  className="absolute top-10 left-0 min-w-[180px]
                    bg-white text-gray-700 font-normal
                    rounded-lg shadow-lg p-4
                    opacity-0 invisible -translate-y-3
                    group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                    transition-all duration-300 z-50"
                >
                  <NavLink
                    to="/signup"
                    className="block py-1 hover:translate-x-1 hover:text-blue-600 transition"
                  >
                    Register to Post
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="block py-1 hover:translate-x-1 hover:text-blue-600 transition"
                  >
                    Login to Post
                  </NavLink>
                </div>
              </div>

              <NavLink
                to="/about"
                className="block py-1 hover:translate-x-1 hover:text-blue-600 transition"
              >
                About
              </NavLink>
              <NavLink
                to="/findjob"
                className="block py-1 hover:translate-x-1 hover:text-blue-600 transition"
              >
                Find Jobs
              </NavLink>
            </>
          )}

          
        </div>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-4">
          {!isAuthenticated ? (
            <NavLink
              to="/login"
              className={`transition px-6 py-2.5 font-semibold rounded-sm ${
                showNav
                  ? "text-white bg-blue-700 hover:bg-blue-800 border-blue-600 border-2"
                  : "text-white border-2 border-blue-800 bg-blue-700 hover:bg-blue-800"
              }`}
            >
              Login
            </NavLink>
          ) : (
            <>
              {/* NOTIFICATIONS */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowProfileMenu(false);
                  }}
                  className="relative p-2.5 text-gray-700 bg-blue-50 hover:bg-blue-100 shadow-sm border-gray-100 border hover:text-gray-900 rounded-full transition"
                >
                  <Bell size={22} strokeWidth={2} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {showNotifications && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowNotifications(false)}
                    />
                    <div className="absolute right-0 top-full mt-3 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                      {/* Header */}
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

                      {/* Notification List */}
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
                                <p
                                  className={`text-sm leading-relaxed ${
                                    notif.unread
                                      ? "text-gray-900 font-medium"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {notif.text}
                                </p>
                                <p className="text-xs text-gray-500 mt-1.5">
                                  {notif.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="px-5 py-3 bg-gray-50 text-center border-t border-gray-100">
                        <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* PROFILE MENU */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowProfileMenu(!showProfileMenu);
                    setShowNotifications(false);
                  }}
                  className="flex items-center gap-3 pr-2 py-2 hover:bg-gray-50 rounded-lg transition group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-semibold text-gray-900 leading-tight">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500">
                     {user?.email || "user@example.com"}
                    </p>
                  </div>
                  <ChevronDown
                    size={16}
                    className="text-gray-500 hidden lg:block group-hover:text-gray-700"
                  />
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowProfileMenu(false)}
                    />
                    <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                      {/* User Info */}
                      <div className="px-4 py-5 bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-gray-900 truncate">
                              {user?.name || "User"}
                            </p>
                            <p className="text-sm text-gray-600 truncate">
                              {user?.email || "user@example.com"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <NavLink
                          to={
                            role === "student"
                              ? `/worker/profile/${user?.id}`
                              : `/employer/profile/${user?.id}`
                          }
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition font-medium"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <User size={18} />
                          <span className="text-sm">My Profile</span>
                        </NavLink>
                        
                        {role === "student" && (
                          <>
                            <NavLink
                              to="/student/history"
                              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition font-medium"
                              onClick={() => setShowProfileMenu(false)}
                            >
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                              <span className="text-sm">My History</span>
                            </NavLink>
                            
                            <NavLink
                              to="/saved-jobs"
                              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition font-medium"
                              onClick={() => setShowProfileMenu(false)}
                            >
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                              </svg>
                              <span className="text-sm">Saved Jobs</span>
                            </NavLink>
                          </>
                        )}
                        
                        <NavLink
                          to={
                            role === "student"
                              ? "/worker/settings"
                              : "/employer/settings"
                          }
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition font-medium"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <Settings size={18} />
                          <span className="text-sm">Account Settings</span>
                        </NavLink>
                      </div>

                      {/* Logout */}
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
            </>
          )}
        </div>

        {/* MOBILE TOGGLE - Only show when NOT authenticated */}
        {!isAuthenticated && (
          <button
            onClick={toggleMenu}
            className={`md:hidden transition ${
              showNav || isOpen ? "text-gray-900" : "text-white"
            }`}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        )}
      </div>

      {/* MOBILE MENU - Only for non-authenticated users */}
      {isOpen && !isAuthenticated && (
        <div className="md:hidden mt-6 bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="flex flex-col">
            {/* For Student */}
            <div className="px-6 py-4 border-b border-gray-200">
              <p className="font-semibold text-gray-900 mb-3">For Student</p>

              <NavLink
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-sm text-gray-700 hover:text-blue-600"
              >
                Register to Apply
              </NavLink>

              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-sm text-gray-700 hover:text-blue-600"
              >
                Login to Apply
              </NavLink>
            </div>

            {/* For Employer */}
            <div className="px-6 py-4 border-b border-gray-200">
              <p className="font-semibold text-gray-900 mb-3">For Employer</p>

              <NavLink
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-sm text-gray-700 hover:text-blue-600"
              >
                Register to Post
              </NavLink>

              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-sm text-gray-700 hover:text-blue-600"
              >
                Login to Post
              </NavLink>
            </div>

            {/* Common Links */}
            <div className="px-6 py-4 border-b border-gray-200">
              <NavLink
                to="/findjob"
                onClick={() => setIsOpen(false)}
                className="block py-2 font-semibold text-gray-900 hover:text-blue-600"
              >
                Find Jobs
              </NavLink>

              <NavLink
                to="/about"
                onClick={() => setIsOpen(false)}
                className="block py-2 font-semibold text-gray-900 hover:text-blue-600"
              >
                About
              </NavLink>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE SIDEBAR - Only for authenticated users */}
      {isAuthenticated && (
        <>
          {/* Overlay */}
          {showSidebar && (
            <div
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowSidebar(false)}
            />
          )}

          {/* Sidebar */}
          <div
            className={`md:hidden fixed top-0 left-0 min-h-screen w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
              showSidebar ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Sidebar Header */}
            <div className="px-6 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="flex items-center justify-between mb-4">
                
                <button
                  onClick={() => setShowSidebar(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition"
                >
                  <X size={24} />
                </button>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  <p className="font-semibold text-white">
                    {user?.name || "User"}
                  </p>
                  <p className="text-sm text-blue-100">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar Menu Items */}
            <div className="flex  flex-col h-[calc(100vh-180px)]">
              <div className="flex-1 overflow-y-auto py-4">
                <NavLink
                  to="/findjob"
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-6 py-4 transition ${
                      isActive
                        ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`
                  }
                  onClick={() => setShowSidebar(false)}
                >
                  <Home size={22} strokeWidth={2} />
                  <span className="font-medium">Home</span>
                </NavLink>

               

                {role === "student" && (
                  <>
                    <NavLink
                      to="/student/history"
                      className={({ isActive }) =>
                        `flex items-center gap-4 px-6 py-4 transition ${
                          isActive
                            ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`
                      }
                      onClick={() => setShowSidebar(false)}
                    >
                      <Clock size={22} strokeWidth={2} />
                      <span className="font-medium">My History</span>
                    </NavLink>

                    <NavLink
                      to="/saved-jobs"
                      className={({ isActive }) =>
                        `flex items-center gap-4 px-6 py-4 transition ${
                          isActive
                            ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`
                      }
                      onClick={() => setShowSidebar(false)}
                    >
                      <BookmarkIcon size={22} strokeWidth={2} />
                      <span className="font-medium">Saved Jobs</span>
                    </NavLink>
                  </>
                )}

                <NavLink
                  to={
                    role === "student"
                      ? `/worker/profile/${user?.id}`
                      : `/employer/profile/${user?.id}`
                  }
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-6 py-4 transition ${
                      isActive
                        ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`
                  }
                  onClick={() => setShowSidebar(false)}
                >
                  <User size={22} strokeWidth={2} />
                  <span className="font-medium">My Profile</span>
                </NavLink>

                <NavLink
                  to={
                    role === "student"
                      ? "/worker/settings"
                      : "/employer/settings"
                  }
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-6 py-4 transition ${
                      isActive
                        ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`
                  }
                  onClick={() => setShowSidebar(false)}
                >
                  <Settings size={22} strokeWidth={2} />
                  <span className="font-medium">Settings</span>
                </NavLink>
              </div>

              {/* Logout Button at bottom */}
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
      )}
    </nav>
  );
}

export default UserNavbar;