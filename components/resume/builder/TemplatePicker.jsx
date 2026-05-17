import { TEMPLATES } from "../templates/registry";
import { builderLabel } from "./builderTheme";

export default function TemplatePicker({ selectedId, onSelect }) {
  return (
    <div className="space-y-2">
      <p className={builderLabel}>Template</p>
      <div className="grid grid-cols-2 gap-2">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onSelect(t.id)}
            className={`rounded-lg border px-3 py-2.5 text-left transition-colors ${
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
    </div>
  );
}
