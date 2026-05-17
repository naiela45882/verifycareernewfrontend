import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useAuthedFetch } from "./useAuthedFetch";
import { normalizeId } from "../lib/normalizeId";

const TRUST_BASE = "/api/trust";

export function useTrust() {
  const authedFetch = useAuthedFetch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeOfferLetter = useCallback(
    async (text) => {
      setLoading(true);
      setError(null);
      try {
        const res = await authedFetch(`${TRUST_BASE}/offer-letter`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || "Scan failed");
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
        const res = await authedFetch(`${TRUST_BASE}/recruiter`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || "Signal check failed");
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
      const res = await authedFetch(`${TRUST_BASE}/history/${scanId}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ anonymous }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Could not publish signal");
      }
      return data;
    },
    [authedFetch]
  );

  const lookup = useCallback(
    async (params) => {
      const qs = new URLSearchParams(params).toString();
      const res = await authedFetch(`${TRUST_BASE}/lookup?${qs}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Lookup failed");
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
    lookup,
  };
}

export function useTrustHistory({ page = 1, limit = 12, enabled = true } = {}) {
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
        `${TRUST_BASE}/history?page=${page}&limit=${limit}`
      );
      const data = await res.json();
      if (data.success) {
        setScans(data.scans ?? []);
        setPagination(data.pagination ?? { page, limit, total: 0, pages: 1 });
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [authedFetch, page, limit]);

  useEffect(() => {
    if (!enabled) return;
    fetchHistory();
  }, [enabled, fetchHistory]);

  const deleteScan = useCallback(
    async (scanId) => {
      const res = await authedFetch(`${TRUST_BASE}/history/${scanId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete");
      }
      await fetchHistory();
    },
    [authedFetch, fetchHistory]
  );

  return { scans, pagination, loading, error, refetch: fetchHistory, deleteScan };
}

export function useTrustScan(scanId) {
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
      const res = await authedFetch(`${TRUST_BASE}/history/${id}`);
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

export function useSignalsFeed(filter = "all") {
  const authedFetch = useAuthedFetch();
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await authedFetch(`${TRUST_BASE}/signals/feed?filter=${filter}`);
        const data = await res.json();
        if (!cancelled && data.success) setSignals(data.signals ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [authedFetch, filter]);

  return { signals, loading };
}

export function useSignal(signalId) {
  const authedFetch = useAuthedFetch();
  const [signal, setSignal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSignal = useCallback(async () => {
    if (!signalId) return;
    try {
      setLoading(true);
      setError(null);
      const res = await authedFetch(`${TRUST_BASE}/signals/${signalId}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Signal not found");
      }
      setSignal(data.signal);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [authedFetch, signalId]);

  useEffect(() => {
    fetchSignal();
  }, [fetchSignal]);

  return { signal, loading, error, refetch: fetchSignal };
}

export function useCompanyTrust() {
  const authedFetch = useAuthedFetch();
  const [loading, setLoading] = useState(false);

  const search = useCallback(
    async (q) => {
      if (!q || q.length < 2) return [];
      const res = await authedFetch(
        `${TRUST_BASE}/companies/search?q=${encodeURIComponent(q)}`
      );
      const data = await res.json();
      if (!res.ok || !data.success) return [];
      return data.companies ?? [];
    },
    [authedFetch]
  );

  const getCompany = useCallback(
    async (idOrSlug) => {
      const res = await authedFetch(`${TRUST_BASE}/companies/${idOrSlug}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Company not found");
      }
      return data.company;
    },
    [authedFetch]
  );

  const claimCompany = useCallback(
    async (id) => {
      setLoading(true);
      try {
        const res = await authedFetch(`${TRUST_BASE}/companies/${id}/claim`, {
          method: "POST",
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || "Claim failed");
        return data.company;
      } finally {
        setLoading(false);
      }
    },
    [authedFetch]
  );

  const rateCompany = useCallback(
    async (id, rating, review = "") => {
      const res = await authedFetch(`${TRUST_BASE}/companies/${id}/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, review }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Rating failed");
      return data.company;
    },
    [authedFetch]
  );

  return { search, getCompany, claimCompany, rateCompany, loading };
}
