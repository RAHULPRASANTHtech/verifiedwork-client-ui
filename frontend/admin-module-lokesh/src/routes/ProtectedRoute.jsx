import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../auth/authService";

const ProtectedRoute = ({ allowedRole, children }) => {
  const user = getCurrentUser();

  // Not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Role mismatch
  if (user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
