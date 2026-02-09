import ProtectedRoute from "./routes/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
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

// When logged in → redirect "/" to "/findjob"
// When logged out → show normal Home page
const RootRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/findjob" replace />;
  }

  return <Home />;
};

// When logged in → stay on "/findjob"
// When logged out → redirect back to "/"
{
  /*const FindJobRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <FindJob />;
};*/
}

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
          {/* PUBLIC ROUTES WITH AUTH-AWARE BEHAVIOR */}
          <Route path="/" element={<RootRoute />} />
          <Route path="/about" element={<About />} />
          <Route path="/findjob" element={<FindJob />} />
          <Route path="/view-job/:id" element={<ViewJobDetails />} />

          {/* STUDENT ONLY ROUTES */}
          <Route
            path="/saved-jobs"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <SavedJobs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/worker/profile/:id"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <WorkerProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/worker/profile/edit/:id"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <EditWorkerProfile />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/worker/profile-form" element={<WorkerProfileForm />} />
        {/* STANDALONE EMPLOYER PROFILE FORM (no layout) */}
        <Route path="/employer/profile-form" element={<ProfileForm />} />

        {/* Emplyer ROUTES (with navbar/footer) */}
        <Route path="/employer" element={<EmployerLayout />}>
          <Route index element={<EmployerDashboard />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="applicants" element={<Candidates />} />
          <Route path="profile/:id" element={<EmployerProfile />} />
          <Route path="profile/edit/:id" element={<EditEmployerProfile />} />
          {/* <Route path="/employer/manage-jobs/view-job/:id" element={<ViewPostJobDetails/>} /> */}
          <Route
            path="manage-jobs/view-job/:id"
            element={<ViewPostJobDetails />}
          />
          <Route path="manage-jobs/edit-job/:id" element={<EditPostJob />} />
          {/* Unknown employer sub-routes should show 404 (not 403) */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin ROUTES (with navbar/footer) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="job-management" element={<JobManagement />} />
          <Route path="worker-management" element={<WorkerManagement />} />
          <Route path="employer-management" element={<EmployerManagement />} />
          <Route
            path="job-management/view-postjob/:id"
            element={<AdminViewPostJob />}
          />
          <Route
            path="worker-management/view-profile/:id"
            element={<AdminViewProfile />}
          />
          {/* Unknown admin sub-routes should show 404 (not 403) */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* 403 - Forbidden (logged in but wrong role) */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Any other unknown URL should show 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
