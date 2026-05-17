import { useCallback, useMemo, useState } from "react";
import { useAuthedFetch } from "./useAuthedFetch";

async function parseResponse(res) {
  const data = await res.json();
  if (!res.ok || data.success === false) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export function useResumeAPI() {
  const authedFetch = useAuthedFetch();
  const [loading, setLoading] = useState(false);

  const withLoading = useCallback(async (fn) => {
    setLoading(true);
    try {
      return await fn();
    } finally {
      setLoading(false);
    }
  }, []);

  const getPrimary = useCallback(async () => {
    const res = await authedFetch("/api/resume/primary");
    const data = await parseResponse(res);
    return data.primary;
  }, [authedFetch]);

  const savePrimary = useCallback(
    async (text) => {
      const res = await authedFetch("/api/resume/primary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await parseResponse(res);
      return data.primary;
    },
    [authedFetch]
  );

  const updatePrimary = useCallback(
    async (text) => {
      const res = await authedFetch("/api/resume/primary", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await parseResponse(res);
      return data.primary;
    },
    [authedFetch]
  );

  const listVersions = useCallback(async () => {
    const res = await authedFetch("/api/resume/versions");
    const data = await parseResponse(res);
    return data.versions;
  }, [authedFetch]);

  const createVersion = useCallback(
    async ({ versionName, text, structured, selectedTemplateId }) => {
      const res = await authedFetch("/api/resume/versions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ versionName, text, structured, selectedTemplateId }),
      });
      const data = await parseResponse(res);
      return data.version;
    },
    [authedFetch]
  );

  const updateVersion = useCallback(
    async (id, payload) => {
      const res = await authedFetch(`/api/resume/versions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await parseResponse(res);
      return data.version;
    },
    [authedFetch]
  );

  const deleteVersion = useCallback(
    async (id) => {
      const res = await authedFetch(`/api/resume/versions/${id}`, {
        method: "DELETE",
      });
      await parseResponse(res);
    },
    [authedFetch]
  );

  const tailorResume = useCallback(
    async ({ jobDescription, primaryResumeText }) => {
      return withLoading(async () => {
        const res = await authedFetch("/api/resume/tailor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobDescription, primaryResumeText }),
        });
        return parseResponse(res);
      });
    },
    [authedFetch, withLoading]
  );

  const getFeedback = useCallback(
    async (resumeText) => {
      return withLoading(async () => {
        const res = await authedFetch("/api/resume/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resumeText: resumeText || undefined }),
        });
        return parseResponse(res);
      });
    },
    [authedFetch, withLoading]
  );

  const saveStructured = useCallback(
    async ({ structured, selectedTemplateId, parseSource }) => {
      const res = await authedFetch("/api/resume/structured", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ structured, selectedTemplateId, parseSource }),
      });
      const data = await parseResponse(res);
      return data.primary;
    },
    [authedFetch]
  );

  const parseResumeText = useCallback(
    async (text) => {
      const res = await authedFetch("/api/resume/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      return parseResponse(res);
    },
    [authedFetch]
  );

  const parseResumeFile = useCallback(
    async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      const res = await authedFetch("/api/resume/parse-file", {
        method: "POST",
        body: formData,
      });
      return parseResponse(res);
    },
    [authedFetch]
  );

  /** Unified import: file → CVParse, text → local parser. Saves to MongoDB. */
  const importResume = useCallback(
    async ({ file, text } = {}) => {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await authedFetch("/api/resume/import", {
          method: "POST",
          body: formData,
        });
        return parseResponse(res);
      }
      const trimmed = typeof text === "string" ? text.trim() : "";
      if (!trimmed) {
        throw new Error("Provide a file or resume text to import");
      }
      const res = await authedFetch("/api/resume/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed }),
      });
      return parseResponse(res);
    },
    [authedFetch]
  );

  const scoreResume = useCallback(
    async ({ structured, jobDescription }) => {
      const res = await authedFetch("/api/resume/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ structured, jobDescription }),
      });
      return parseResponse(res);
    },
    [authedFetch]
  );

  return useMemo(
    () => ({
      loading,
      getPrimary,
      savePrimary,
      updatePrimary,
      saveStructured,
      parseResumeText,
      parseResumeFile,
      importResume,
      scoreResume,
      listVersions,
      createVersion,
      updateVersion,
      deleteVersion,
      tailorResume,
      getFeedback,
    }),
    [
      loading,
      getPrimary,
      savePrimary,
      updatePrimary,
      saveStructured,
      parseResumeText,
      parseResumeFile,
      importResume,
      scoreResume,
      listVersions,
      createVersion,
      updateVersion,
      deleteVersion,
      tailorResume,
      getFeedback,
    ]
  );
}
