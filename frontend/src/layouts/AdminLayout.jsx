import { Outlet } from "react-router-dom";
import { useState } from 'react';
import AdminNavbar from "../components/Navbar/AdminNavbar";
import AdminSidebar from "../components/Slidebar/AdminSidebar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col bg-gray-50">
      {/* ADMIN NAVBAR */}
      

      {/* BODY AREA */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
        <AdminNavbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          <div className="p-6 ">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;