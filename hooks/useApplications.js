import { useCallback, useEffect, useState } from "react";
import { useAuthedFetch } from "./useAuthedFetch";

async function parseResponse(res) {
  const data = await res.json();
  if (!res.ok || data.success === false) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export function useApplications(filters = {}) {
  const authedFetch = useAuthedFetch();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.status) params.set("status", filters.status);
      if (filters.search) params.set("search", filters.search);
      if (filters.sort) params.set("sort", filters.sort);

      const qs = params.toString();
      const res = await authedFetch(`/api/applications${qs ? `?${qs}` : ""}`);
      const data = await parseResponse(res);
      setApplications(data.applications || []);
    } catch {
      setApplications([]);
    } finally {
      setLoading(false);
    }
  }, [authedFetch, filters.status, filters.search, filters.sort]);

  useEffect(() => {
    load();
  }, [load]);

  const createApplication = useCallback(
    async (payload) => {
      const res = await authedFetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await parseResponse(res);
      await load();
      return data.application;
    },
    [authedFetch, load]
  );

  const updateApplication = useCallback(
    async (id, payload) => {
      const res = await authedFetch(`/api/applications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await parseResponse(res);
      await load();
      return data.application;
    },
    [authedFetch, load]
  );

  const deleteApplication = useCallback(
    async (id) => {
      const res = await authedFetch(`/api/applications/${id}`, { method: "DELETE" });
      await parseResponse(res);
      await load();
    },
    [authedFetch, load]
  );

  const getApplication = useCallback(
    async (id) => {
      const res = await authedFetch(`/api/applications/${id}`);
      const data = await parseResponse(res);
      return data.application;
    },
    [authedFetch]
  );

  return {
    applications,
    loading,
    reload: load,
    createApplication,
    updateApplication,
    deleteApplication,
    getApplication,
  };
}

export function useApplicationCount() {
  const authedFetch = useAuthedFetch();
  const [count, setCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await authedFetch("/api/applications");
        const data = await parseResponse(res);
        if (!cancelled) setCount(data.applications?.length ?? 0);
      } catch {
        if (!cancelled) setCount(0);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [authedFetch]);

  return count;
}
