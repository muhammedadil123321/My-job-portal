import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import UserNavbar from "../components/Navbar/UserNavbar";

const UserLayout = () => {
  return (
    <>
      {/* Top Navigation */}
      <UserNavbar />

      {/* Page Content */}
      <main className="min-h-screen">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default UserLayout;
