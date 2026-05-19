import { useCallback, useEffect, useMemo, useState } from "react";
import { structuredToPlainText } from "../lib/structuredToText";
import { hasStructuredContent } from "../lib/resumeSchema";
import { useResumeAPI } from "./useResumeAPI";

const BUILDER_SOURCE_ID = "builder";

function resumeLabelFromText(text, fallback = "Resume") {
  const firstLine = text?.trim().split("\n").find(Boolean);
  return firstLine && firstLine.length <= 60 ? firstLine : fallback;
}

/**
 * Loads resume builder output and saved versions for feedback / tailor flows.
 */
export function useResumeSources() {
  const api = useResumeAPI();
  const [loading, setLoading] = useState(true);
  const [sources, setSources] = useState([]);
  const [selectedId, setSelectedId] = useState(BUILDER_SOURCE_ID);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [primary, versions] = await Promise.all([
        api.getPrimary().catch(() => null),
        api.listVersions().catch(() => []),
      ]);

      const next = [];

      const builderText =
        primary?.text?.trim() ||
        (hasStructuredContent(primary?.structured)
          ? structuredToPlainText(primary.structured)
          : "");

      if (builderText) {
        const name =
          primary?.structured?.contact?.name?.trim() ||
          resumeLabelFromText(builderText, "Resume from builder");
        next.push({
          id: BUILDER_SOURCE_ID,
          label: name,
          description: "Your current resume in Resume Builder",
          text: builderText,
          structured: primary?.structured,
          templateId: primary?.selectedTemplateId || "classic",
        });
      }

      (versions || []).forEach((v) => {
        const text = v.text?.trim();
        if (!text) return;
        next.push({
          id: v.id,
          label: v.versionName,
          description: resumeLabelFromText(text, "Saved version"),
          text,
          structured: v.structured,
          templateId: v.selectedTemplateId || "classic",
        });
      });

      setSources(next);
      setSelectedId((prev) => (next.some((s) => s.id === prev) ? prev : next[0]?.id ?? ""));
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    load();
  }, [load]);

  const selected = useMemo(
    () => sources.find((s) => s.id === selectedId) ?? null,
    [sources, selectedId]
  );

  const resumeText = selected?.text ?? "";

  return {
    loading,
    sources,
    selectedId,
    setSelectedId,
    selected,
    resumeText,
    hasResume: sources.length > 0,
    reload: load,
  };
}
