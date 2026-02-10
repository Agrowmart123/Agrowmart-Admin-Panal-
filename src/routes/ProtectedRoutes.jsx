// Suvarna

import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../api/authService";

export default function ProtectedRoute({ children, requiresSuperAdmin = false }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiresSuperAdmin && user.role !== "SUPER_ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}