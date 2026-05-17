import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useAuthedFetch } from "./useAuthedFetch";

export function useUploadHistory() {
  const { isLoaded, isSignedIn } = useAuth();
  const authedFetch = useAuthedFetch();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = useCallback(async () => {
    try {
      setError(null);
      const res = await authedFetch("/api/upload/history");
      const data = await res.json();
      if (data.success) {
        setHistory(data.history ?? []);
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
    fetchHistory();
  }, [fetchHistory, isLoaded, isSignedIn]);

  const stats = useMemo(() => {
    const totalScans = history.length;
    const highRisk = history.filter(
      (item) => (item.response?.scamScore ?? 0) >= 70
    ).length;
    const safeOffers = history.filter(
      (item) => (item.response?.scamScore ?? 0) < 40
    ).length;
    const mediumRisk = totalScans - highRisk - safeOffers;
    const aiAnalyses = history.filter((item) => item.mode === "ai").length;

    return { totalScans, highRisk, safeOffers, mediumRisk, aiAnalyses };
  }, [history]);

  return { history, loading, error, stats, refetch: fetchHistory };
}
