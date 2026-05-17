import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useAuthedFetch } from "./useAuthedFetch";

export function useResume() {
  const { isLoaded, isSignedIn } = useAuth();
  const authedFetch = useAuthedFetch();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResume = useCallback(async () => {
    try {
      setError(null);
      const res = await authedFetch("/api/resume/primary");
      const data = await res.json();
      if (data.success) {
        const primary = data.primary;
        setResume(
          primary
            ? {
                rawText: primary.text,
                lastAtsScore: primary.lastAtsScore,
                updatedAt: primary.updatedAt,
              }
            : null
        );
      }
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [authedFetch]);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      setLoading(!isLoaded);
      return;
    }
    fetchResume();
  }, [fetchResume, isLoaded, isSignedIn]);

  return {
    resume,
    loading,
    uploading: false,
    error,
    hasResume: Boolean(resume?.rawText),
    refetch: fetchResume,
  };
}
