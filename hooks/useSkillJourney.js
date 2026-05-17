import { useCallback, useEffect, useState } from "react";
import { useAuthedFetch } from "./useAuthedFetch";

async function parseResponse(res) {
  const data = await res.json();
  if (!res.ok || data.success === false) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export function useSkillJourney() {
  const authedFetch = useAuthedFetch();
  const [journey, setJourney] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await authedFetch("/api/skill-journey");
      const data = await parseResponse(res);
      setJourney(data.journey);
    } catch {
      setJourney(null);
    } finally {
      setLoading(false);
    }
  }, [authedFetch]);

  useEffect(() => {
    load();
  }, [load]);

  const startJourney = useCallback(
    async (payload) => {
      const res = await authedFetch("/api/skill-journey/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await parseResponse(res);
      setJourney(data.journey);
      return data.journey;
    },
    [authedFetch]
  );

  const addRoadmapItem = useCallback(
    async (payload) => {
      const res = await authedFetch("/api/skill-journey/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      await parseResponse(res);
      await load();
    },
    [authedFetch, load]
  );

  const updateRoadmapItem = useCallback(
    async (id, payload) => {
      const res = await authedFetch(`/api/skill-journey/roadmap/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      await parseResponse(res);
      await load();
    },
    [authedFetch, load]
  );

  const deleteRoadmapItem = useCallback(
    async (id) => {
      const res = await authedFetch(`/api/skill-journey/roadmap/${id}`, {
        method: "DELETE",
      });
      await parseResponse(res);
      await load();
    },
    [authedFetch, load]
  );

  const addProgressNote = useCallback(
    async (text) => {
      const res = await authedFetch("/api/skill-journey/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await parseResponse(res);
      setJourney(data.journey);
      return data.journey;
    },
    [authedFetch]
  );

  return {
    journey,
    loading,
    reload: load,
    startJourney,
    addRoadmapItem,
    updateRoadmapItem,
    deleteRoadmapItem,
    addProgressNote,
  };
}
