import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useAuthedFetch } from "./useAuthedFetch";

export function useUserProfile() {
  const { isLoaded, isSignedIn } = useAuth();
  const authedFetch = useAuthedFetch();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await authedFetch("/api/user/profile");
      const data = await res.json();
      if (data.success) {
        setProfile(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [authedFetch]);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      setLoading(!isLoaded);
      return;
    }
    fetchProfile();
  }, [fetchProfile, isLoaded, isSignedIn]);

  const updateCareerGoal = async (careerGoal) => {
    const res = await authedFetch("/api/user/career-goal", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ careerGoal }),
    });
    const data = await res.json();
    if (data.success) {
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              user: { ...prev.user, careerGoal: data.careerGoal },
            }
          : prev
      );
    }
    return data;
  };

  return { profile, loading, refetch: fetchProfile, updateCareerGoal };
}
