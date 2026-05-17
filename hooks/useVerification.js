import { useCallback, useState } from "react";
import { useAuthedFetch } from "./useAuthedFetch";

export function useVerification() {
  const authedFetch = useAuthedFetch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeOfferLetter = useCallback(
    async (text) => {
      setLoading(true);
      setError(null);
      try {
        const res = await authedFetch("/api/trust/offer-letter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || "Verification failed");
        }
        return data;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [authedFetch]
  );

  const verifyRecruiter = useCallback(
    async (payload) => {
      setLoading(true);
      setError(null);
      try {
        const res = await authedFetch("/api/trust/recruiter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || "Recruiter verification failed");
        }
        return data;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [authedFetch]
  );

  const publishScan = useCallback(
    async (scanId, { anonymous = true } = {}) => {
      const res = await authedFetch(`/api/trust/history/${scanId}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ anonymous }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Could not publish scan");
      }
      return data;
    },
    [authedFetch]
  );

  return {
    loading,
    error,
    analyzeOfferLetter,
    verifyRecruiter,
    publishScan,
    publishAnonymously: publishScan,
  };
}
