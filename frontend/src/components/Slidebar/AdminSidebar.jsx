import React from "react";
import { LayoutDashboard, Users, Briefcase, X, BarChart3 } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import logoIcon from "../../assets/images/logoicon.png";

function AdminSidebar({ isOpen = true, onClose = () => {} }) {
  const location = useLocation();

  const menuItems = [
    {
      id: 1,
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
    },
    {
      id: 2,
      label: "Job Management",
      icon: Briefcase,
      path: "/admin/job-management",
    },
    {
      id: 3,
      label: "Worker Management",
      icon: Users,
      path: "/admin/worker-management",
    },
    {
      id: 4,
      label: "Employer Management",
      icon: BarChart3,
      path: "/admin/employer-management",
    },
  ];

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-gray-950 border-r border-gray-200 shadow-lg
          flex flex-col transition-transform duration-300 ease-in-out h-full
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Close Button - Mobile */}
        <div className="lg:hidden flex justify-end p-4 border-b border-gray-200">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Profile Section - Top */}
        <div className="pl-6 pr-6 pt-6 border-gray-200">
          <div className="flex items-center text-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img
                src={logoIcon}
                alt="Earnease logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white  tracking-tight">
                Admin Portal
              </h2>
              <p className="text-xs text-gray-200 mt-0.5 font-medium">
                Full control center
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.path);

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={onClose}
                  className={`
                    w-full group flex items-center gap-3 px-3 py-3 rounded-lg
                    transition-all duration-200 font-medium text-sm 
                    ${
                      isActive
                        ? "bg-gray-100 text-gray-950 shadow-sm"
                        : "text-gray-200 hover:bg-white/60 hover:text-gray-900"
                    }
                  `}
                >
                  {/* 3D Icon Container */}
                  <div
                    className={`
                      relative flex items-center justify-center
                      w-10 h-10 rounded-lg
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-blue-600"
                          : "bg-white group-hover:bg-blue-50"
                      }
                    `}
                    style={{
                      boxShadow: isActive
                        ? "0 4px 6px -1px rgba(59, 130, 246, 0.3), 0 2px 4px -1px rgba(59, 130, 246, 0.2), inset 0 -2px 4px rgba(0, 0, 0, 0.1)"
                        : "0 1px 3px rgba(0, 0, 0, 0.1), inset 0 -1px 2px rgba(0, 0, 0, 0.05)",
                      transform: isActive
                        ? "translateY(-1px)"
                        : "translateY(0)",
                    }}
                  >
                    {/* Top shine effect */}
                    <div
                      className={`
                        absolute inset-x-2 top-1 h-1 bg-white/30 rounded-full blur-sm
                        ${isActive ? "opacity-100" : "opacity-0"}
                      `}
                    />

                    <Icon
                      size={18}
                      className={`
                        relative z-10 transition-colors duration-200
                        ${
                          isActive
                            ? "text-white"
                            : "text-gray-950 group-hover:text-blue-600"
                        }
                      `}
                      strokeWidth={2}
                    />
                  </div>

                  {/* Label */}
                  <span className="flex-1 text-left font-semibold font-outfit">
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Footer - Admin Portal Info - Shows on all screen sizes */}
        <div className="px-4 py-4 border-t  border-gray-50 bg-gray-950 mt-auto">
          <div className="text-center">
            <p className="text-xs md:text-sm font-poppins font-semibold text-white mb-1">
              Admin Portal
            </p>
            <p className="text-xs md:text-sm font-poppins text-gray-200">
              Version 1.0.0
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
