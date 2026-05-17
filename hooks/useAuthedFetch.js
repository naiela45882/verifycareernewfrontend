import { useCallback } from "react";
import { useAuth } from "@clerk/clerk-react";
import { authFetch } from "../lib/api";

export function useAuthedFetch() {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  return useCallback(
    async (path, options = {}) => {
      if (!isLoaded) {
        throw new Error("Auth is still loading");
      }
      if (!isSignedIn) {
        throw new Error("You must be signed in");
      }

      const token = await getToken();
      if (!token) {
        throw new Error("Could not get session token — try signing out and back in");
      }

      return authFetch(path, options, () => Promise.resolve(token));
    },
    [getToken, isLoaded, isSignedIn]
  );
}
