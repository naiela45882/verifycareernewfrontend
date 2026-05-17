import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate, useSearchParams } from "react-router-dom";

/** Send authenticated users to the app home (dashboard) instead of staying on marketing. */
export function useSignedInLandingRedirect() {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    if (searchParams.get("auth")) return;
    navigate("/dashboard", { replace: true });
  }, [isLoaded, isSignedIn, navigate, searchParams]);
}
