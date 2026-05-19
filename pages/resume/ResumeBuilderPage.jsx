import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, ChevronRight, Download, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import ResumePageHeader from "../../components/resume/ResumePageHeader";
import { ResumePageSkeleton } from "../../components/resume/LoadingSkeletons";
import ResumeBuilderLayout from "../../components/resume/builder/ResumeBuilderLayout";
import PasteAsTextPanel from "../../components/resume/builder/PasteAsTextPanel";
import TemplatePickerWithPreview from "../../components/resume/builder/TemplatePickerWithPreview";
import ScaledResumePreview from "../../components/resume/builder/ScaledResumePreview";
import ImportPanel from "../../components/resume/builder/ImportPanel";
import FlowEntryChooser from "../../components/resume/builder/FlowEntryChooser";
import FlowStepIndicator from "../../components/resume/builder/FlowStepIndicator";
import ExtractedResumeReview from "../../components/resume/builder/ExtractedResumeReview";
import { getTemplate } from "../../components/resume/templates/registry";
import { downloadResumePdf } from "../../components/resume/export/downloadPdf";
import { useResumeBuilder, IMPORT_STEPS, SCRATCH_STEPS } from "../../hooks/useResumeBuilder";
import { hasStructuredContent } from "../../lib/resumeSchema";
import {
  builderCard,
  builderBtnSecondary,
  builderBtnPrimary,
  builderBtnGhost,
  builderWarningBanner,
  builderPreviewFrame,
  builderPreviewChrome,
} from "../../components/resume/builder/builderTheme";
import BackendLoadingOverlay from "../../components/ui/BackendLoadingOverlay";
import ResumeSaveStatus from "../../components/resume/builder/ResumeSaveStatus";

function FlowBackBar({ label, onBack }) {
  if (!onBack) return null;
  return (
    <button type="button" onClick={onBack} className={`${builderBtnGhost} mb-4 flex items-center gap-1`}>
      <ArrowLeft className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

export default function ResumeBuilderPage() {
  const builder = useResumeBuilder();
  const [activeSection, setActiveSection] = useState("contact");
  const [exporting, setExporting] = useState(false);

  const template = getTemplate(builder.selectedTemplateId);
  const Preview = template.Preview;

  const handleImportText = async (text) => {
    try {
      await builder.importFromText(text);
      toast.success("Resume extracted — review the content");
    } catch (err) {
      toast.error(err.message || "Import failed");
    }
  };

  const handleImportFile = async (file) => {
    try {
      await builder.importFromFile(file);
      toast.success("File parsed — review extracted content");
    } catch (err) {
      toast.error(err.message || "Import failed");
    }
  };

  const handleExport = async () => {
    if (!hasStructuredContent(builder.structured)) {
      toast.error("Add resume content before exporting");
      return;
    }
    setExporting(true);
    try {
      await builder.saveNow();
      await downloadResumePdf({
        structured: builder.structured,
        templateId: builder.selectedTemplateId,
      });
      toast.success("PDF downloaded");
    } catch (err) {
      toast.error(err.message || "Export failed");
    } finally {
      setExporting(false);
    }
  };

  const handleConfirmImport = async () => {
    try {
      await builder.confirmImportResume();
      toast.success("Resume saved — keep editing or export PDF");
    } catch (err) {
      toast.error(err.message || "Save failed");
    }
  };

  const handleRetrySave = async () => {
    try {
      await builder.saveNow();
      toast.success("Resume saved");
    } catch (err) {
      toast.error(err.message || "Save failed");
    }
  };

  const handlePasteText = async (text) => {
    try {
      await builder.applyPastedText(text);
      toast.success("Resume text applied — review each section");
    } catch (err) {
      toast.error(err.message || "Could not parse pasted text");
    }
  };

  const backendOverlay = useMemo(() => {
    if (builder.loading) {
      return { visible: false, variant: "generic" };
    }
    if (builder.importing) {
      return { visible: true, variant: "import" };
    }
    if (
      (builder.saving || builder.scoring) &&
      builder.importStep === "preview"
    ) {
      return { visible: true, variant: "process" };
    }
    if (builder.scoring) {
      return { visible: true, variant: "score" };
    }
    return { visible: false, variant: "generic" };
  }, [
    builder.loading,
    builder.importing,
    builder.scoring,
    builder.saving,
    builder.importStep,
  ]);

  if (builder.loading) return <ResumePageSkeleton />;

  const showEditorActions =
    (builder.flow === "import" && builder.importStep === "edit") ||
    (builder.flow === "scratch" && builder.scratchStep === "build");

  const pageTitle =
    builder.flow === "entry"
      ? "Resume builder"
      : builder.flow === "import"
        ? "Import resume"
        : "Build from scratch";

  const pageDescription = showEditorActions
    ? "Your resume saves automatically as you type — no need to click Save."
    : builder.flow === "entry"
      ? "Import an existing resume or start fresh with a template."
      : builder.flow === "import"
        ? "Content first — structure what you have, then pick a template and polish."
        : "Template first — choose a layout, then fill each section with live preview.";

  return (
    <>
      <BackendLoadingOverlay visible={backendOverlay.visible} variant={backendOverlay.variant} />
      <div className="pb-10">
      <ResumePageHeader
        title={pageTitle}
        description={pageDescription}
        action={
          showEditorActions ? (
            <div className="flex flex-col items-end gap-2">
              <ResumeSaveStatus
                enabled={builder.autoSave}
                saving={builder.saving}
                savePending={builder.savePending}
                lastSavedAt={builder.lastSavedAt}
                saveError={builder.saveError}
                onRetry={handleRetrySave}
              />
              <button
                type="button"
                onClick={handleExport}
                disabled={exporting}
                className={builderBtnPrimary}
              >
                {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                Export PDF
              </button>
            </div>
          ) : null
        }
      />

      {builder.flow !== "entry" && (
        <div className="mb-4 flex flex-wrap gap-3 text-sm">
          <Link to="/resume/feedback" className="text-luxury-accent hover:underline">
            ATS feedback
          </Link>
          <Link to="/resume/tailor" className="text-luxury-accent hover:underline">
            Tailor to job
          </Link>
          <Link to="/resume/versions" className="text-luxury-accent hover:underline">
            Versions
          </Link>
        </div>
      )}

      {builder.importBanner && builder.flow === "import" && builder.importStep !== "edit" && (
        <div className={builderWarningBanner}>{builder.importBanner}</div>
      )}

      {builder.saveError && !showEditorActions && (
        <p className="mb-4 text-sm text-luxury-coral">{builder.saveError}</p>
      )}

      {/* ——— FLOW 0: Entry ——— */}
      {builder.flow === "entry" && (
        <FlowEntryChooser
          onImport={builder.startImportFlow}
          onScratch={builder.startScratchFlow}
          onContinue={builder.hasExistingResume ? builder.continueEditing : undefined}
          existingName={builder.structured?.contact?.name}
        />
      )}

      {/* ——— FLOW 1: Import resume ——— */}
      {builder.flow === "import" && (
        <>
          <FlowBackBar
            label={
              builder.importStep === "upload"
                ? "Back to start"
                : builder.importStep === "preview"
                  ? "Back to template"
                  : "Back"
            }
            onBack={
              builder.importStep === "upload"
                ? builder.returnToEntry
                : builder.importStep === "edit"
                  ? undefined
                  : builder.importStep === "review"
                    ? () => builder.advanceImportStep("upload")
                    : builder.importStep === "template"
                      ? () => builder.advanceImportStep("review")
                      : builder.importStep === "preview"
                        ? () => builder.advanceImportStep("template")
                        : undefined
            }
          />
          {builder.importStep !== "edit" && (
            <FlowStepIndicator steps={IMPORT_STEPS} currentId={builder.importStep} />
          )}

          {builder.importStep === "upload" && (
            <div className="mx-auto max-w-xl">
              <ImportPanel
                onPaste={handleImportText}
                onFile={handleImportFile}
                disabled={builder.saving || builder.importing}
                busy={builder.importing}
              />
            </div>
          )}

          {builder.importStep === "review" && (
            <div className="mx-auto max-w-2xl space-y-4">
              <ExtractedResumeReview structured={builder.structured} />
              <button
                type="button"
                onClick={() => builder.advanceImportStep("template")}
                className={`${builderBtnPrimary} w-full justify-center sm:w-auto`}
              >
                Continue to template
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {builder.importStep === "template" && (
            <div className="mx-auto max-w-5xl space-y-4">
              <div className={builderCard}>
                <TemplatePickerWithPreview
                  selectedId={builder.selectedTemplateId}
                  onSelect={builder.setTemplateLocal}
                  structured={builder.structured}
                  title="Choose a template"
                  subtitle="Your content stays the same — the template controls layout and styling."
                  sampleLabel="Preview uses your imported content."
                />
              </div>
              <button
                type="button"
                onClick={() => builder.advanceImportStep("preview")}
                className={builderBtnPrimary}
              >
                Preview resume
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {builder.importStep === "preview" && (
            <div className="mx-auto max-w-3xl space-y-4">
              <div className={builderPreviewFrame}>
                <p className={builderPreviewChrome}>
                  {template.name} template — confirm when it looks right
                </p>
                <div className="max-h-[75vh] overflow-y-auto bg-luxury-muted/20 p-4">
                  <div className="resume-preview-paper mx-auto max-w-[210mm] shadow-lg">
                    <Preview data={builder.structured} />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => builder.advanceImportStep("template")}
                  className={builderBtnSecondary}
                >
                  Change template
                </button>
                <button
                  type="button"
                  onClick={handleConfirmImport}
                  disabled={builder.saving}
                  className={builderBtnPrimary}
                >
                  {builder.saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  Confirm & save
                </button>
              </div>
            </div>
          )}

          {builder.importStep === "edit" && (
            <>
              <FlowBackBar label="Change approach" onBack={builder.returnToEntry} />
              <BuilderEditorGrid
                builder={builder}
                Preview={Preview}
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                onPasteText={handlePasteText}
              />
            </>
          )}
        </>
      )}

      {/* ——— FLOW 2: Build from scratch ——— */}
      {builder.flow === "scratch" && (
        <>
          <FlowBackBar
            label={builder.scratchStep === "template" ? "Back to start" : "Change template"}
            onBack={
              builder.scratchStep === "template"
                ? builder.returnToEntry
                : () => builder.advanceScratchStep("template")
            }
          />
          {builder.scratchStep === "template" && (
            <FlowStepIndicator steps={SCRATCH_STEPS} currentId="template" />
          )}

          {builder.scratchStep === "template" && (
            <div className="mx-auto max-w-5xl space-y-4">
              <div className={builderCard}>
                <TemplatePickerWithPreview
                  selectedId={builder.selectedTemplateId}
                  onSelect={builder.setTemplateLocal}
                  structured={builder.structured}
                  title="Pick your template first"
                  subtitle="Start with structure and design — then add your name, experience, and skills."
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  builder.beginScratchBuild();
                  toast.success("Fill in your sections — preview updates live");
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-700"
              >
                Start building
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {builder.scratchStep === "build" && (
            <>
              <FlowBackBar label="Change approach" onBack={builder.returnToEntry} />
              <FlowStepIndicator steps={SCRATCH_STEPS} currentId="build" />
              <BuilderEditorGrid
                builder={builder}
                Preview={Preview}
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                onPasteText={handlePasteText}
              />
            </>
          )}
        </>
      )}
    </div>
    </>
  );
}

function BuilderEditorGrid({ builder, Preview, activeSection, onSectionChange, onPasteText }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
      <div className={`${builderCard} flex min-h-[min(calc(100vh-12rem),780px)] flex-col`}>
        {builder.autoSave && (
          <p className="mb-3 rounded-lg border border-luxury-border/60 bg-luxury-muted/20 px-3 py-2 text-xs text-luxury-body">
            Autosave is on — your changes are stored to your account as you edit.
          </p>
        )}
        <PasteAsTextPanel
          onApply={onPasteText}
          disabled={builder.saving}
          busy={builder.importing}
        />
        <div className="min-h-0 flex-1">
          <ResumeBuilderLayout
            structured={builder.structured}
            activeSection={activeSection}
            onSectionChange={onSectionChange}
            onStructuredChange={builder.setStructured}
          />
        </div>
      </div>

      <div className={`${builderPreviewFrame} flex flex-col lg:sticky lg:top-4`}>
        <p className={builderPreviewChrome}>Live preview</p>
        <ScaledResumePreview variant="editor" className="rounded-b-xl">
          <div className="resume-preview-paper min-h-0 w-[210mm] shadow-lg ring-1 ring-black/5">
            <Preview data={builder.structured} />
          </div>
        </ScaledResumePreview>
      </div>
    </div>
  );
}

