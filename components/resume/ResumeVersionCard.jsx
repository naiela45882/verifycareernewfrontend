import { motion } from "framer-motion";
import {
  Pencil,
  Copy,
  Trash2,
  Maximize2,
  FileText,
} from "lucide-react";
import { cn } from "../../lib/cn";
import { resolveVersionStructured } from "../../lib/versionPreviewData";
import ClassicPreview from "./templates/classic/ClassicPreview";
import ScaledResumePreview from "./builder/ScaledResumePreview";

export default function ResumeVersionCard({
  version,
  onOpen,
  onEdit,
  onDuplicate,
  onDelete,
}) {
  const previewData = resolveVersionStructured(version);
  const dateLabel = version.updatedAt
    ? new Date(version.updatedAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-luxury-border/80 bg-luxury-surface shadow-soft transition-shadow duration-500 hover:border-luxury-accent/35 hover:shadow-bloom"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(145deg, color-mix(in srgb, var(--vc-teal) 22%, transparent), transparent 45%, color-mix(in srgb, var(--vc-sun) 12%, transparent))",
        }}
      />

      <button
        type="button"
        onClick={onOpen}
        className="relative block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-luxury-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-luxury-surface"
        aria-label={`Open preview of ${version.versionName}`}
      >
        <motion.div
          className="relative overflow-hidden bg-gradient-to-b from-luxury-muted/50 via-luxury-muted/30 to-luxury-muted/60 px-3 pb-2 pt-3"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        >
          <div className="mb-2 flex items-center justify-between gap-2 px-1">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-luxury-border/80 bg-luxury-surface/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-luxury-caption backdrop-blur-sm">
              <FileText className="h-3 w-3 text-luxury-accent" strokeWidth={2} />
              Classic
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-luxury-surface/90 px-2 py-1 text-[10px] font-medium text-luxury-body opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <Maximize2 className="h-3 w-3" />
              Preview
            </span>
          </div>

          <div className="relative mx-auto h-[min(42vw,300px)] max-h-[300px] w-full overflow-hidden rounded-lg ring-1 ring-black/[0.06]">
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_srgb,var(--vc-teal)_12%,transparent),transparent_65%)]"
              aria-hidden
            />
            <ScaledResumePreview variant="picker" className="!h-full !max-h-none">
              <motion.div
                className="resume-preview-paper w-[210mm] shadow-lg ring-1 ring-black/5"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <ClassicPreview data={previewData} />
              </motion.div>
            </ScaledResumePreview>
          </div>

          <div
            className="pointer-events-none absolute inset-x-4 bottom-3 h-12 rounded-b-lg bg-gradient-to-t from-luxury-muted/90 to-transparent"
            aria-hidden
          />
        </motion.div>
      </button>

      <motion.div
        className="relative border-t border-luxury-border/70 bg-luxury-surface/95 px-4 py-3.5 backdrop-blur-sm"
        initial={false}
      >
        <div className="mb-3 min-w-0">
          <h3 className="truncate font-display text-lg font-semibold tracking-tight text-luxury-ink">
            {version.versionName}
          </h3>
          <p className="mt-0.5 text-[11px] text-luxury-caption">Updated {dateLabel}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <CardAction icon={Maximize2} label="Open" onClick={onOpen} primary />
          <CardAction icon={Pencil} label="Edit" onClick={onEdit} />
          <CardAction icon={Copy} label="Copy" onClick={onDuplicate} />
          <CardAction icon={Trash2} label="Delete" onClick={onDelete} variant="danger" />
        </div>
      </motion.div>
    </motion.article>
  );
}

function CardAction({ icon: Icon, label, onClick, variant, primary }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-all duration-200",
        variant === "danger"
          ? "border border-luxury-coral/25 text-luxury-coral hover:bg-luxury-coral/10"
          : primary
            ? "border border-luxury-accent/40 bg-luxury-accent/10 text-luxury-accent hover:bg-luxury-accent/18"
            : "border border-luxury-border/80 text-luxury-body hover:border-luxury-accent/30 hover:text-luxury-ink"
      )}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
      {label}
    </button>
  );
}
