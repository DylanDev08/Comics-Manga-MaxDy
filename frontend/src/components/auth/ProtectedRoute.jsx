import { Navigate, Outlet, useLocation } from "react-router-dom";

import LoadingScreen from "../common/LoadingScreen";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ requiredRole }) {
  const location = useLocation();
  const { status, isAuthenticated, user } = useAuth();

  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
