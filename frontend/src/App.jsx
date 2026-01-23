import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

/* Layouts */
import UserLayout from "../src/layouts/UserLayout";
import AuthLayout from "../src/layouts/AuthLayout";
import EmployerLayout from "../src/layouts/EmployerLayout";

/* User or job seeker Pages  */
import Home from "./pages/User/Home";
import About from "./pages/User/About";
import FindJob from "./pages/User/FindJob";
import SavedJobs from "./pages/User/SavedJobs";

/* Auth Pages */
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ViewJobDetails from "./pages/User/ViewJobDetails";

import EmployerDashboard from "./pages/Employer/EmployerDashboard";
import PostJob from "./pages/Employer/PostJob";
import ManageJobs from "./pages/Employer/ManageJobs";
import Candidates from "./pages/Employer/Candidates";
import ViewPostJobDetails from "./pages/Employer/ViewPostJobDetails";
import EditPostJob from "./pages/Employer/EditPostJob";
import ProfileForm from "./pages/Employer/ProfileForm";

import WorkerProfile from "./pages/User/WorkerProfile";
import EditWorkerProfile from "./pages/User/EditWorkerProfile";
import WorkerProfileForm from "./pages/User/WorkerProfileForm";
import EmployerProfile from "./pages/Employer/EmployerProfile";
import EditEmployerProfile from "./pages/Employer/EditEmployerProfile";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import JobManagement from "./pages/Admin/JobManagement";
import WorkerManagement from "./pages/Admin/WorkerManagement";
import EmployerManagement from "./pages/Admin/EmployerManagement";
import AdminViewPostJob from "./pages/Admin/AdminViewPostJob";
import AdminViewProfile from "./pages/Admin/AdminViewProfile";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out",
      once: true,
    });
  }, []);

  return (
    <div className="overflow-x-hidden scroll-smooth">
      <Routes>
        {/* AUTH ROUTES (no navbar/footer) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* USER ROUTES (with navbar/footer) */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/findjob" element={<FindJob />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/view-job/:id" element={<ViewJobDetails />} />

          <Route path="/worker/profile/:id" element={<WorkerProfile />} />
          <Route path="/worker/profile/edit/:id" element={<EditWorkerProfile />} />

          <Route path="/worker/profile-form" element={<WorkerProfileForm />} />
        </Route>

        {/* Emplyer ROUTES (with navbar/footer) */}
        <Route path="/employer" element={<EmployerLayout />}>
          <Route index element={<EmployerDashboard />} />
          <Route path="/employer/post-job" element={<PostJob />} />
          <Route path="/employer/manage-jobs" element={<ManageJobs />} />
          <Route path="/employer/applicants" element={<Candidates />} />
          <Route path="/employer/profile/:id" element={<EmployerProfile />} />
          <Route
            path="/employer/profile/edit/:id"
            element={<EditEmployerProfile />}
          />
          <Route path="/employer/profile-form" element={<ProfileForm />} />
          {/* <Route path="/employer/manage-jobs/view-job/:id" element={<ViewPostJobDetails/>} /> */}
          <Route
            path="manage-jobs/view-job/:id"
            element={<ViewPostJobDetails />}
          />
          <Route path="manage-jobs/edit-job/:id" element={<EditPostJob />} />
        </Route>

        {/* Admin ROUTES (with navbar/footer) */}
        <Route path="/admin" element={<AdminLayout/>}>
             <Route index element={<AdminDashboard/>} />
          <Route path="/admin/job-management" element={<JobManagement />} />
          <Route path="/admin/worker-management" element={<WorkerManagement />} />
          <Route path="/admin/employer-management" element={<EmployerManagement />} />
           <Route path="/admin/job-management/view-postjob/:id" element={<AdminViewPostJob />} />
          <Route path="/admin/worker-management/view-profile/:id" element={<AdminViewProfile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
