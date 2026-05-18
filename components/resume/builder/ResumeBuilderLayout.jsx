import SectionNav from "./SectionNav";
import ContactSection from "./ContactSection";
import SummarySection from "./SummarySection";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import CustomSectionEditor from "./CustomSectionEditor";
import {
  emptyCustomSection,
  isCustomSectionKey,
  customSectionIdFromKey,
} from "../../../lib/resumeSchema";

export default function ResumeBuilderLayout({
  structured,
  activeSection,
  onSectionChange,
  onStructuredChange,
}) {
  const customSections = structured.customSections || [];

  const patch = (field, value) => {
    onStructuredChange((prev) => ({ ...prev, [field]: value }));
  };

  const addCustomSection = () => {
    const section = emptyCustomSection();
    onStructuredChange((prev) => ({
      ...prev,
      customSections: [...(prev.customSections || []), section],
    }));
    onSectionChange(`custom:${section.id}`);
  };

  const updateCustomSection = (id, next) => {
    onStructuredChange((prev) => ({
      ...prev,
      customSections: (prev.customSections || []).map((s) => (s.id === id ? next : s)),
    }));
  };

  const removeCustomSection = (id) => {
    const remaining = customSections.filter((s) => s.id !== id);
    onStructuredChange((prev) => ({
      ...prev,
      customSections: (prev.customSections || []).filter((s) => s.id !== id),
    }));
    if (activeSection === `custom:${id}`) {
      onSectionChange(remaining.length ? `custom:${remaining[0].id}` : "contact");
    }
  };

  const renderSection = () => {
    if (isCustomSectionKey(activeSection)) {
      const id = customSectionIdFromKey(activeSection);
      const section = customSections.find((s) => s.id === id);
      if (!section) return null;
      return (
        <CustomSectionEditor
          section={section}
          onChange={(next) => updateCustomSection(id, next)}
          onRemove={() => removeCustomSection(id)}
        />
      );
    }

    switch (activeSection) {
      case "contact":
        return (
          <ContactSection
            contact={structured.contact}
            onChange={(contact) => patch("contact", contact)}
          />
        );
      case "summary":
        return (
          <SummarySection summary={structured.summary} onChange={(summary) => patch("summary", summary)} />
        );
      case "experience":
        return (
          <ExperienceSection
            experience={structured.experience ?? []}
            onChange={(experience) => patch("experience", experience)}
          />
        );
      case "education":
        return (
          <EducationSection
            education={structured.education}
            onChange={(education) => patch("education", education)}
          />
        );
      case "skills":
        return (
          <SkillsSection skills={structured.skills} onChange={(skills) => patch("skills", skills)} />
        );
      case "projects":
        return (
          <ProjectsSection
            projects={structured.projects}
            onChange={(projects) => patch("projects", projects)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <SectionNav
        active={activeSection}
        onSelect={onSectionChange}
        customSections={customSections}
        onAddCustomSection={addCustomSection}
      />
      <div className="min-h-[280px]">{renderSection()}</div>
    </div>
  );
}
