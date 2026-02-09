import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = useAuth();

  // 1️⃣ Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ Logged in but wrong role
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3️⃣ Allowed
  return children;
};

export default ProtectedRoute;
