import { Navigate } from "react-router-dom";

// hooks
import useAuth from "../hooks/useAuth";
// routes

import { ROOT } from "../routes/paths";

// components
import LoadingScreen from "../components/LoadingScreen";

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to={ROOT} />;
  }

  return <>{children}</>;
}
