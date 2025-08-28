import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import type { JSX } from "react";

interface PrivateRouteProps {
  children: JSX.Element;
}
const PublicOnlyRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/profile" replace />;
  }
  return children;
};

export default PublicOnlyRoute;
