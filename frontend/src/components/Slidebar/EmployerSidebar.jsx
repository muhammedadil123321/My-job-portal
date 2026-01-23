import React from 'react';
import { LayoutDashboard, Plus, Users, Briefcase, Building2, X } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

function EmployerSidebar({ isOpen = true, onClose = () => {} }) {
  const location = useLocation();

  const menuItems = [
    { 
      id: 1, 
      label: "Dashboard", 
      icon: LayoutDashboard, 
      path: "/employer"
    },
    { 
      id: 2, 
      label: "Post New Job", 
      icon: Plus, 
      path: "/employer/post-job"
    },
    { 
      id: 3, 
      label: "Manage Jobs", 
      icon: Briefcase, 
      path: "/employer/manage-jobs"
    },
    { 
      id: 4, 
      label: "Applicants", 
      icon: Users, 
      path: "/employer/applicants"
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
          w-64 bg-white border-r border-gray-200 shadow-lg
          flex flex-col transition-transform duration-300 ease-in-out h-full
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
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
                    ${isActive
                      ? 'bg-gray-50 text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
                    }
                  `}
                >
                  {/* 3D Icon Container */}
                  <div
                    className={`
                      relative flex items-center justify-center
                      w-10 h-10 rounded-lg
                      transition-all duration-200
                      ${isActive
                        ? 'bg-blue-600'
                        : 'bg-white group-hover:bg-blue-50'
                      }
                    `}
                    style={{
                      boxShadow: isActive 
                        ? '0 4px 6px -1px rgba(59, 130, 246, 0.3), 0 2px 4px -1px rgba(59, 130, 246, 0.2), inset 0 -2px 4px rgba(0, 0, 0, 0.1)'
                        : '0 1px 3px rgba(0, 0, 0, 0.1), inset 0 -1px 2px rgba(0, 0, 0, 0.05)',
                      transform: isActive ? 'translateY(-1px)' : 'translateY(0)'
                    }}
                  >
                    {/* Top shine effect */}
                    <div
                      className={`
                        absolute inset-x-2 top-1 h-1 bg-white/30 rounded-full blur-sm
                        ${isActive ? 'opacity-100' : 'opacity-0'}
                      `}
                    />
                    
                    <Icon
                      size={18}
                      className={`
                        relative z-10 transition-colors duration-200
                        ${isActive
                          ? 'text-white'
                          : 'text-gray-600 group-hover:text-blue-600'
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

        {/* Footer - Employer Portal - Shows on all screen sizes */}
        <div className="px-4 py-4 border-t border-gray-200 bg-white mt-auto">
          <div className="text-center">
            <p className="text-xs md:text-sm font-poppins font-semibold text-gray-900 mb-1">Employer Portal</p>
            <p className="text-xs md:text-sm font-poppins text-gray-500">Manage hiring & recruitment</p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default EmployerSidebar;