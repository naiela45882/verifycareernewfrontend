import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useAuthedFetch } from "./useAuthedFetch";
import { toScamRisk } from "../lib/scamRisk";
import { normalizeId } from "../lib/normalizeId";

export function useVerificationHistory({ page = 1, limit = 12, enabled = true } = {}) {
  const { isLoaded, isSignedIn } = useAuth();
  const authedFetch = useAuthedFetch();
  const [scans, setScans] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit, total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await authedFetch(
        `/api/trust/history?page=${page}&limit=${limit}`
      );
      const data = await res.json();
      if (data.success) {
        setScans(data.scans ?? []);
        setPagination(data.pagination ?? { page, limit, total: 0, pages: 1 });
      }
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [authedFetch, page, limit]);

  useEffect(() => {
    if (!enabled || !isLoaded || !isSignedIn) {
      setLoading(!isLoaded);
      return;
    }
    fetchHistory();
  }, [enabled, fetchHistory, isLoaded, isSignedIn]);

  const stats = useMemo(() => {
    const totalScans = pagination.total || scans.length;
    const highRisk = scans.filter((s) => toScamRisk(s) >= 51).length;
    const safeOffers = scans.filter((s) => toScamRisk(s) < 26).length;
    const mediumRisk = scans.length - highRisk - safeOffers;

    return { totalScans, highRisk, safeOffers, mediumRisk };
  }, [scans, pagination.total]);

  const deleteScan = useCallback(
    async (scanId) => {
      const res = await authedFetch(`/api/trust/history/${scanId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete scan");
      }
      await fetchHistory();
    },
    [authedFetch, fetchHistory]
  );

  return {
    scans,
    pagination,
    loading,
    error,
    stats,
    refetch: fetchHistory,
    deleteScan,
  };
}

export function useVerificationScan(scanId) {
  const { isLoaded, isSignedIn } = useAuth();
  const authedFetch = useAuthedFetch();
  const [scan, setScan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchScan = useCallback(async () => {
    const id = normalizeId(scanId);
    if (!id) {
      setLoading(false);
      setError(new Error("Invalid scan id"));
      return;
    }
    if (!isLoaded) return;
    if (!isSignedIn) {
      setLoading(false);
      setError(new Error("You must be signed in"));
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await authedFetch(`/api/trust/history/${id}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Scan not found");
      }
      const raw = data.scan;
      setScan(
        raw
          ? {
              ...raw,
              id: normalizeId(raw.id) || normalizeId(raw._id) || id,
            }
          : null
      );
    } catch (err) {
      setError(err);
      setScan(null);
    } finally {
      setLoading(false);
    }
  }, [authedFetch, scanId, isLoaded, isSignedIn]);

  useEffect(() => {
    if (isLoaded) fetchScan();
  }, [isLoaded, fetchScan]);

  return { scan, loading: !isLoaded || loading, error, refetch: fetchScan };
}
