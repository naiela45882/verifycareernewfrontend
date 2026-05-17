import { useCallback, useEffect, useRef, useState } from "react";
import { emptyResume, normalizeStructured, hasStructuredContent } from "../lib/resumeSchema";
import { useResumeAPI } from "./useResumeAPI";

const SAVE_DEBOUNCE_MS = 700;
const SCORE_DEBOUNCE_MS = 1200;

const IMPORT_SOURCES = new Set(["paste", "pdf", "docx", "image", "cvparse"]);
const WIZARD_STORAGE_KEY = "naiela:resume-wizard";

function readWizardState() {
  try {
    const raw = sessionStorage.getItem(WIZARD_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeWizardState(state) {
  if (!state) {
    sessionStorage.removeItem(WIZARD_STORAGE_KEY);
    return;
  }
  sessionStorage.setItem(WIZARD_STORAGE_KEY, JSON.stringify(state));
}

export const IMPORT_STEPS = [
  { id: "upload", label: "Upload" },
  { id: "review", label: "Review" },
  { id: "template", label: "Template" },
  { id: "preview", label: "Preview" },
  { id: "edit", label: "Edit & save" },
];

export const SCRATCH_STEPS = [
  { id: "template", label: "Template" },
  { id: "build", label: "Build" },
];

export function useResumeBuilder() {
  const api = useResumeAPI();
  const [structured, setStructured] = useState(emptyResume);
  const [selectedTemplateId, setSelectedTemplateId] = useState("classic");
  const [atsScore, setAtsScore] = useState(null);
  const [atsReport, setAtsReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [scoring, setScoring] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [importBanner, setImportBanner] = useState(null);
  const [lastParseSource, setLastParseSource] = useState("paste");
  const [hasExistingResume, setHasExistingResume] = useState(false);
  const [savedParseSource, setSavedParseSource] = useState("manual");

  /** entry | import | scratch */
  const [flow, setFlow] = useState("entry");
  const [importStep, setImportStep] = useState("upload");
  const [scratchStep, setScratchStep] = useState("template");
  const [autoSave, setAutoSave] = useState(false);

  const saveTimer = useRef(null);
  const scoreTimer = useRef(null);
  const structuredRef = useRef(structured);
  const templateRef = useRef(selectedTemplateId);
  const autoSaveRef = useRef(autoSave);

  structuredRef.current = structured;
  templateRef.current = selectedTemplateId;
  autoSaveRef.current = autoSave;

  const load = useCallback(async () => {
    setLoading(true);
    setSaveError(null);
    try {
      const primary = await api.getPrimary();
      let data = emptyResume();

      if (primary?.structured) {
        data = normalizeStructured(primary.structured);
      } else if (primary?.text) {
        const parsed = await api.parseResumeText(primary.text);
        data = normalizeStructured(parsed.structured);
      }

      setStructured(data);
      setSelectedTemplateId(primary?.selectedTemplateId || "classic");
      setAtsScore(primary?.lastAtsScore ?? null);
      setAtsReport(primary?.lastAtsReport ?? null);

      const hasContent = hasStructuredContent(data);
      setHasExistingResume(hasContent);
      setSavedParseSource(primary?.parseSource || "manual");

      const wizard = readWizardState();
      const wizardImport =
        wizard?.flow === "import" &&
        wizard?.step &&
        wizard.step !== "edit" &&
        wizard.step !== "upload";

      if (hasContent && wizardImport) {
        setFlow("import");
        setImportStep(wizard.step);
        setAutoSave(false);
      } else if (hasContent && wizard?.flow === "scratch" && wizard?.step === "template") {
        setFlow("scratch");
        setScratchStep("template");
        setAutoSave(false);
      } else {
        setFlow("entry");
        setImportStep("upload");
        setScratchStep("template");
        setAutoSave(false);
      }
    } catch (err) {
      setSaveError(err.message || "Failed to load resume");
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    load();
  }, [load]);

  const persist = useCallback(
    async (data, templateId, parseSource) => {
      setSaving(true);
      setSaveError(null);
      try {
        const primary = await api.saveStructured({
          structured: data,
          selectedTemplateId: templateId,
          parseSource,
        });
        setAtsScore(primary?.lastAtsScore ?? null);
        setAtsReport(primary?.lastAtsReport ?? null);
        return primary;
      } catch (err) {
        setSaveError(err.message || "Save failed");
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [api]
  );

  const runScore = useCallback(
    async (data, { silent = false } = {}) => {
      if (!silent) setScoring(true);
      try {
        const result = await api.scoreResume({ structured: data });
        setAtsScore(result.atsScore);
        setAtsReport(result.lastAtsReport);
        return result;
      } catch {
        /* scoring is best-effort */
      } finally {
        if (!silent) setScoring(false);
      }
    },
    [api]
  );

  const initialScored = useRef(false);
  useEffect(() => {
    if (loading || initialScored.current || !autoSave) return;
    if (hasStructuredContent(structured) && atsScore == null) {
      initialScored.current = true;
      runScore(structured, { silent: true });
    }
  }, [loading, structured, atsScore, runScore, autoSave]);

  const scheduleSaveAndScore = useCallback(() => {
    if (!autoSaveRef.current) return;

    if (saveTimer.current) clearTimeout(saveTimer.current);
    if (scoreTimer.current) clearTimeout(scoreTimer.current);

    saveTimer.current = setTimeout(async () => {
      try {
        await persist(structuredRef.current, templateRef.current);
      } catch {
        /* surfaced via saveError */
      }
    }, SAVE_DEBOUNCE_MS);

    scoreTimer.current = setTimeout(() => {
      runScore(structuredRef.current, { silent: true });
    }, SCORE_DEBOUNCE_MS);
  }, [persist, runScore]);

  const setStructuredLocal = useCallback((updater) => {
    setStructured((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      return normalizeStructured(next);
    });
  }, []);

  const updateStructured = useCallback(
    (updater) => {
      setStructuredLocal(updater);
      scheduleSaveAndScore();
    },
    [setStructuredLocal, scheduleSaveAndScore]
  );

  const setTemplate = useCallback(
    (templateId) => {
      setSelectedTemplateId(templateId);
      templateRef.current = templateId;
      scheduleSaveAndScore();
    },
    [scheduleSaveAndScore]
  );

  const setTemplateLocal = useCallback((templateId) => {
    setSelectedTemplateId(templateId);
    templateRef.current = templateId;
  }, []);

  const startImportFlow = useCallback(() => {
    setFlow("import");
    setImportStep("upload");
    setAutoSave(false);
    setImportBanner(null);
    initialScored.current = false;
    writeWizardState({ flow: "import", step: "upload" });
  }, []);

  const startScratchFlow = useCallback(() => {
    setFlow("scratch");
    setScratchStep("template");
    setAutoSave(false);
    setStructured(emptyResume());
    setSelectedTemplateId("classic");
    templateRef.current = "classic";
    setAtsScore(null);
    setAtsReport(null);
    setImportBanner(null);
    initialScored.current = false;
    writeWizardState({ flow: "scratch", step: "template" });
  }, []);

  const returnToEntry = useCallback(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    if (scoreTimer.current) clearTimeout(scoreTimer.current);
    setFlow("entry");
    setImportStep("upload");
    setScratchStep("template");
    setAutoSave(false);
    setImportBanner(null);
    writeWizardState(null);
  }, []);

  const continueEditing = useCallback(() => {
    if (IMPORT_SOURCES.has(savedParseSource)) {
      setFlow("import");
      setImportStep("edit");
    } else {
      setFlow("scratch");
      setScratchStep("build");
    }
    setAutoSave(true);
    writeWizardState(null);
  }, [savedParseSource]);

  const importFromText = useCallback(
    async (text) => {
      setImporting(true);
      try {
        const result = await api.importResume({ text });
        const normalized = normalizeStructured(result.structured);
        setStructuredLocal(normalized);
        setLastParseSource(result.parseSource || "paste");
        setImportBanner("Content extracted — pick a template to beautify your resume.");
        setImportStep("review");
        writeWizardState({ flow: "import", step: "review" });
        return normalized;
      } finally {
        setImporting(false);
      }
    },
    [api, setStructuredLocal]
  );

  /** Paste text in the editor without changing import/scratch flow steps. */
  const applyPastedText = useCallback(
    async (text) => {
      setImporting(true);
      try {
        const result = await api.importResume({ text });
        const normalized = normalizeStructured(result.structured);
        setStructuredLocal(normalized);
        setLastParseSource(result.parseSource || "paste");
        if (autoSaveRef.current) {
          if (saveTimer.current) clearTimeout(saveTimer.current);
          await persist(normalized, templateRef.current, "paste");
          await runScore(normalized);
        }
        return normalized;
      } finally {
        setImporting(false);
      }
    },
    [api, setStructuredLocal, persist, runScore]
  );

  const importFromFile = useCallback(
    async (file) => {
      setImporting(true);
      try {
        const result = await api.importResume({ file });
        const normalized = normalizeStructured(result.structured);
        setStructuredLocal(normalized);
        setLastParseSource(result.parseSource || "pdf");
        const label =
          file.type === "application/pdf"
            ? "PDF"
            : file.type?.includes("word") || file.name?.endsWith(".docx")
              ? "DOCX"
              : file.type?.startsWith("image/")
                ? "image"
                : "file";
        setImportBanner(`Imported from ${label} — review extracted content, then choose a template.`);
        setImportStep("review");
        writeWizardState({ flow: "import", step: "review" });
        return normalized;
      } finally {
        setImporting(false);
      }
    },
    [api, setStructuredLocal]
  );

  const advanceImportStep = useCallback((step) => {
    setImportStep(step);
    if (step !== "edit") {
      writeWizardState({ flow: "import", step });
    }
  }, []);

  const advanceScratchStep = useCallback((step) => {
    setScratchStep(step);
    if (step === "template") {
      writeWizardState({ flow: "scratch", step: "template" });
    } else {
      writeWizardState(null);
    }
  }, []);

  const beginScratchBuild = useCallback(async () => {
    setScratchStep("build");
    setAutoSave(true);
    initialScored.current = false;
    writeWizardState(null);
    try {
      await persist(structuredRef.current, templateRef.current, "manual");
    } catch {
      /* user can save manually */
    }
  }, [persist]);

  const confirmImportResume = useCallback(async () => {
    setImportStep("edit");
    setAutoSave(true);
    initialScored.current = false;
    writeWizardState(null);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    await persist(structuredRef.current, templateRef.current, lastParseSource);
    await runScore(structuredRef.current);
    setImportBanner(null);
    setHasExistingResume(true);
    setSavedParseSource(lastParseSource);
  }, [persist, runScore, lastParseSource]);

  const saveNow = useCallback(async () => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    return persist(structuredRef.current, templateRef.current);
  }, [persist]);

  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      if (scoreTimer.current) clearTimeout(scoreTimer.current);
    };
  }, []);

  return {
    structured,
    setStructured: updateStructured,
    setStructuredLocal,
    selectedTemplateId,
    setTemplate,
    setTemplateLocal,
    atsScore,
    atsReport,
    loading,
    importing,
    saving,
    scoring,
    saveError,
    importBanner,
    setImportBanner,
    flow,
    importStep,
    scratchStep,
    autoSave,
    hasExistingResume,
    savedParseSource,
    load,
    saveNow,
    importFromText,
    importFromFile,
    applyPastedText,
    runScore,
    startImportFlow,
    startScratchFlow,
    returnToEntry,
    continueEditing,
    advanceImportStep,
    advanceScratchStep,
    beginScratchBuild,
    confirmImportResume,
  };
}
