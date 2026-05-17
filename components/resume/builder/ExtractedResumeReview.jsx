import { getSkillItems } from "../templates/shared/formatters";
import { builderCard, builderCardInset } from "./builderTheme";

function SectionBlock({ title, children, empty }) {
  if (empty) return null;
  return (
    <div className={builderCardInset}>
      <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-luxury-caption">
        {title}
      </h4>
      {children}
    </div>
  );
}

export default function ExtractedResumeReview({ structured }) {
  const { contact, summary, experience, education, skills, projects, certifications } = structured;
  const skillItems = getSkillItems(skills);

  return (
    <div className={`${builderCard} space-y-3`}>
      <div>
        <p className="text-sm font-medium text-luxury-ink">Extracted content</p>
        <p className="mt-0.5 text-xs text-luxury-body">
          Review what we pulled from your resume. You can edit everything after choosing a template.
        </p>
      </div>

      <SectionBlock title="Contact" empty={!contact?.name && !contact?.email && !contact?.phone}>
        <p className="text-sm font-medium text-luxury-ink">{contact?.name || "—"}</p>
        <p className="text-xs text-luxury-body">
          {[contact?.email, contact?.phone, contact?.location].filter(Boolean).join(" · ") ||
            "No contact details detected"}
        </p>
      </SectionBlock>

      <SectionBlock title="Summary" empty={!summary}>
        <p className="whitespace-pre-wrap text-sm text-luxury-body line-clamp-4">{summary}</p>
      </SectionBlock>

      <SectionBlock title="Experience" empty={!experience?.length}>
        <ul className="space-y-2">
          {experience.map((exp, i) => (
            <li key={i} className="text-sm">
              <span className="font-medium text-luxury-ink">
                {[exp.title, exp.company].filter(Boolean).join(" — ") || "Role"}
              </span>
              {(exp.startDate || exp.endDate) && (
                <span className="ml-2 text-xs text-luxury-caption">
                  {exp.startDate}
                  {exp.endDate || exp.current ? ` – ${exp.current ? "Present" : exp.endDate}` : ""}
                </span>
              )}
              {exp.bullets?.length > 0 && (
                <p className="mt-0.5 text-xs text-luxury-body">{exp.bullets.length} bullet(s)</p>
              )}
            </li>
          ))}
        </ul>
      </SectionBlock>

      <SectionBlock title="Skills" empty={!skillItems.length}>
        <p className="text-sm text-luxury-body">{skillItems.join(", ")}</p>
      </SectionBlock>

      <SectionBlock title="Education" empty={!education?.length}>
        <ul className="space-y-1 text-sm text-luxury-body">
          {education.map((edu, i) => (
            <li key={i}>
              {[edu.degree, edu.school].filter(Boolean).join(", ") || edu.details || "Entry"}
            </li>
          ))}
        </ul>
      </SectionBlock>

      <SectionBlock title="Projects" empty={!projects?.length}>
        <ul className="space-y-1 text-sm text-luxury-body">
          {projects.map((p, i) => (
            <li key={i}>{p.name || "Untitled project"}</li>
          ))}
        </ul>
      </SectionBlock>

      {certifications?.length > 0 && (
        <SectionBlock title="Certifications">
          <ul className="space-y-1 text-sm text-luxury-body">
            {certifications.map((c, i) => (
              <li key={i}>{c.name}</li>
            ))}
          </ul>
        </SectionBlock>
      )}
    </div>
  );
}
