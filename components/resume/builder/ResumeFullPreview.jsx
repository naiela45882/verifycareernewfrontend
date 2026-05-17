import TemplatePicker from "./TemplatePicker";

/**
 * Full-height live resume preview (A4 width, scrollable, no clipped max-height).
 */
export default function ResumeFullPreview({ selectedTemplateId, onTemplateChange, children }) {
  return (
    <div className="flex min-h-[min(100%,calc(100vh-10rem))] flex-col overflow-hidden rounded-xl border border-luxury-border bg-luxury-muted/30 shadow-soft lg:min-h-[calc(100vh-11rem)]">
      <div className="flex shrink-0 flex-col gap-3 border-b border-luxury-border bg-luxury-surface px-4 py-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-luxury-ink">Live preview</h2>
          <p className="text-[11px] text-luxury-caption">Full document — scroll to see every section</p>
        </div>
        <div className="w-full sm:max-w-sm">
          <TemplatePicker selectedId={selectedTemplateId} onSelect={onTemplateChange} compact />
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-auto bg-luxury-muted/25 p-4 sm:p-8">
        <div className="mx-auto w-full min-w-[min(100%,210mm)] max-w-[210mm] pb-8">
          <div className="resume-preview-paper min-h-[297mm] w-full shadow-lg ring-1 ring-black/5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
