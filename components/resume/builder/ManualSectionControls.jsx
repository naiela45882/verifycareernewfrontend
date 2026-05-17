import { Plus } from "lucide-react";
import {
  emptyExperience,
  emptyEducation,
  emptyProject,
  emptyCertification,
} from "../../../lib/resumeSchema";
import { builderBtnGhost, builderLabel } from "./builderTheme";

const SECTION_ADDERS = [
  {
    id: "summary",
    label: "Summary",
    isEmpty: (s) => !s.summary?.trim(),
    apply: (s) => ({ ...s, summary: s.summary || "" }),
  },
  {
    id: "experience",
    label: "Experience entry",
    isEmpty: (s) => !s.experience?.length,
    apply: (s) => ({
      ...s,
      experience: [...(s.experience || []), emptyExperience()],
    }),
  },
  {
    id: "education",
    label: "Education entry",
    isEmpty: (s) => !s.education?.length,
    apply: (s) => ({
      ...s,
      education: [...(s.education || []), emptyEducation()],
    }),
  },
  {
    id: "skills",
    label: "Skills",
    isEmpty: (s) => {
      const items = s.skills?.categories?.flatMap((c) => c.items || []) || [];
      return !items.length;
    },
    apply: (s) => ({
      ...s,
      skills: { categories: [{ name: "Skills", items: [] }] },
    }),
  },
  {
    id: "projects",
    label: "Project",
    isEmpty: (s) => !s.projects?.length,
    apply: (s) => ({
      ...s,
      projects: [...(s.projects || []), emptyProject()],
    }),
  },
  {
    id: "certifications",
    label: "Certification",
    isEmpty: (s) => !s.certifications?.length,
    apply: (s) => ({
      ...s,
      certifications: [...(s.certifications || []), emptyCertification()],
    }),
  },
];

export default function ManualSectionControls({ structured, activeSection, onStructuredChange, onSectionChange }) {
  const addForActiveSection = () => {
    const config = SECTION_ADDERS.find((a) => a.id === activeSection);
    if (!config) return;
    onStructuredChange((prev) => config.apply(prev));
  };

  const addSection = (sectionId) => {
    const config = SECTION_ADDERS.find((a) => a.id === sectionId);
    if (!config) return;
    onStructuredChange((prev) => config.apply(prev));
    onSectionChange(sectionId);
  };

  const activeConfig = SECTION_ADDERS.find((a) => a.id === activeSection);

  return (
    <div className="space-y-3 rounded-lg border border-luxury-border/60 bg-luxury-muted/20 p-3">
      <p className={builderLabel}>Add sections manually</p>
      <div className="flex flex-wrap gap-2">
        {SECTION_ADDERS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => addSection(item.id)}
            className="inline-flex items-center gap-1 rounded-md border border-luxury-border bg-luxury-surface px-2.5 py-1.5 text-xs font-medium text-luxury-ink transition-colors hover:border-luxury-accent/40 hover:bg-luxury-muted/40"
          >
            <Plus className="h-3 w-3 text-luxury-accent" />
            {item.label}
          </button>
        ))}
      </div>
      {activeConfig && activeSection !== "contact" && (
        <button type="button" onClick={addForActiveSection} className={`${builderBtnGhost} text-sm`}>
          + Add another {activeConfig.label.toLowerCase()} in this section
        </button>
      )}
    </div>
  );
}
