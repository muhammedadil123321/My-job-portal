import { Outlet } from "react-router-dom";
import { useState } from 'react';
import EmployerNavbar from "../components/Navbar/EmployerNavbar";
import EmployerSidebar from "../components/Slidebar/EmployerSidebar";

const EmployerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col bg-white">
      {/* NAVBAR: Fixed height */}
      <div className="shrink-0">
        <EmployerNavbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      {/* BODY AREA */}
      <div className="flex flex-1 overflow-hidden ">
        {/* SIDEBAR */}
        <EmployerSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />

        {/* MAIN CONTENT: Scrollable */}
        <main className="flex-1 overflow-y-auto p-6 bg-blue-100/10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployerLayout;