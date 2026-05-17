import { X, Download } from "lucide-react";
import { motion } from "framer-motion";
import { resolveVersionStructured } from "../../lib/versionPreviewData";
import ClassicPreview from "./templates/classic/ClassicPreview";
import { downloadResumePdf } from "./export/downloadPdf";
import toast from "react-hot-toast";

export default function ResumeVersionPreviewModal({ version, onClose }) {
  if (!version) return null;

  const previewData = resolveVersionStructured(version);

  const handleExport = async () => {
    try {
      await downloadResumePdf({
        structured: previewData,
        templateId: version.selectedTemplateId || "classic",
      });
      toast.success("PDF downloaded");
    } catch (err) {
      toast.error(err.message || "Export failed");
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-luxury-ink/55 p-4 backdrop-blur-md"
      onClick={onClose}
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-luxury-border/80 bg-luxury-surface shadow-bloom"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="version-preview-title"
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-70"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in srgb, var(--vc-teal) 18%, transparent), transparent 50%, color-mix(in srgb, var(--vc-sun) 10%, transparent))",
          }}
        />

        <header className="relative flex shrink-0 items-center justify-between gap-3 border-b border-luxury-border/80 bg-luxury-surface/95 px-5 py-4">
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-luxury-accent">
              Classic template
            </p>
            <h2 id="version-preview-title" className="truncate font-display text-xl font-semibold text-luxury-ink">
              {version.versionName}
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 rounded-lg border border-luxury-border px-3 py-2 text-[12px] font-medium text-luxury-body hover:border-luxury-accent/35 hover:text-luxury-ink"
            >
              <Download className="h-4 w-4" />
              Export PDF
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-luxury-border p-2 text-luxury-caption hover:bg-luxury-muted/50 hover:text-luxury-ink"
              aria-label="Close preview"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="relative min-h-0 flex-1 overflow-auto bg-gradient-to-b from-luxury-muted/40 to-luxury-muted/20 p-6 sm:p-10">
          <div className="mx-auto w-full max-w-[210mm]">
            <div className="resume-preview-paper shadow-bloom ring-1 ring-black/8">
              <ClassicPreview data={previewData} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
