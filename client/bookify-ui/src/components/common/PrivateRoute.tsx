// src/components/common/PrivateRoute.tsx
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    // ✅ if no token → redirect to login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
