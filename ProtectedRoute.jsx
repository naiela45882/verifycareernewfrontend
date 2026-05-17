import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

export default function ProtectedRoute() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-bg">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/?auth=sign-in" replace />;
  }

  return <Outlet />;
}
