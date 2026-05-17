import { TEMPLATES, getTemplate } from "../templates/registry";
import { hasStructuredContent } from "../../../lib/resumeSchema";
import { SAMPLE_RESUME_PREVIEW } from "../../../lib/sampleResumePreview";
import ScaledResumePreview from "./ScaledResumePreview";
import {
  builderLabel,
  builderPreviewFrame,
  builderPreviewChrome,
} from "./builderTheme";

export default function TemplatePickerWithPreview({
  selectedId,
  onSelect,
  structured,
  title = "Choose a template",
  subtitle,
  sampleLabel = "Sample content shown — your details will appear as you fill each section.",
}) {
  const previewData =
    structured && hasStructuredContent(structured) ? structured : SAMPLE_RESUME_PREVIEW;
  const showSampleNote = !hasStructuredContent(structured);
  const template = getTemplate(selectedId);
  const Preview = template.Preview;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,280px)_1fr]">
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-luxury-ink">{title}</p>
          {subtitle && <p className="mt-0.5 text-xs text-luxury-body">{subtitle}</p>}
        </div>
        <p className={builderLabel}>Layout</p>
        <div className="space-y-2">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelect(t.id)}
              className={`w-full rounded-lg border px-3 py-2.5 text-left transition-colors ${
                selectedId === t.id
                  ? "border-luxury-accent bg-luxury-accent/12 ring-1 ring-luxury-accent/60"
                  : "border-luxury-border bg-luxury-muted/25 hover:border-luxury-accent/40 hover:bg-luxury-muted/40"
              }`}
            >
              <span className="block text-sm font-medium text-luxury-ink">{t.name}</span>
              <span className="mt-0.5 block text-[11px] text-luxury-body">{t.description}</span>
            </button>
          ))}
        </div>
        {showSampleNote && (
          <p className="text-[11px] leading-relaxed text-luxury-caption">{sampleLabel}</p>
        )}
      </div>

      <div className={builderPreviewFrame}>
        <p className={builderPreviewChrome}>
          {template.name} preview
          {showSampleNote ? " · sample" : ""}
        </p>
        <ScaledResumePreview>
          <div className="resume-preview-paper w-[210mm] shadow-lg ring-1 ring-black/5">
            <Preview data={previewData} />
          </div>
        </ScaledResumePreview>
      </div>
    </div>
  );
}
