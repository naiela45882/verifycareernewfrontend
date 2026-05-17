import { Plus } from "lucide-react";

const BUILT_IN_SECTIONS = [
  { id: "contact", label: "Contact" },
  { id: "summary", label: "Summary" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
];

function tabClass(active) {
  return `rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
    active
      ? "bg-luxury-accent text-luxury-on-accent"
      : "text-luxury-body hover:bg-luxury-muted/50"
  }`;
}

export default function SectionNav({
  active,
  onSelect,
  customSections = [],
  onAddCustomSection,
}) {
  return (
    <nav className="flex flex-wrap items-center gap-1 border-b border-luxury-border pb-2">
      {BUILT_IN_SECTIONS.map((s) => (
        <button key={s.id} type="button" onClick={() => onSelect(s.id)} className={tabClass(active === s.id)}>
          {s.label}
        </button>
      ))}

      {customSections.map((sec) => {
        const key = `custom:${sec.id}`;
        const label = (sec.title || "").trim() || "Custom";
        const display = label.length > 14 ? `${label.slice(0, 14)}…` : label;
        return (
          <button key={key} type="button" onClick={() => onSelect(key)} className={tabClass(active === key)}>
            {display}
          </button>
        );
      })}

      {onAddCustomSection && (
        <button
          type="button"
          onClick={onAddCustomSection}
          className="inline-flex items-center gap-1 rounded-md border border-dashed border-luxury-border px-2.5 py-1.5 text-xs font-medium text-luxury-accent transition-colors hover:border-luxury-accent/50 hover:bg-luxury-muted/40"
        >
          <Plus className="h-3.5 w-3.5" />
          Add section
        </button>
      )}
    </nav>
  );
}
