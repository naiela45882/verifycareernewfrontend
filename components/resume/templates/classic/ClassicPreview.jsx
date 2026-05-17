import { formatDateRange, getSkillItems } from "../shared/formatters";
import { CustomSectionsBlocks } from "../shared/CustomSectionsBlocks";

export default function ClassicPreview({ data }) {
  const { contact, summary, experience, education, skills, projects, certifications, customSections } =
    data || {};
  const skillItems = getSkillItems(skills);

  return (
    <div className="mx-auto max-w-[210mm] p-8 text-[11px] leading-relaxed shadow-sm">
      <header className="border-b border-gray-300 pb-3 text-center">
        {contact?.name && <h1 className="text-xl font-bold tracking-tight">{contact.name}</h1>}
        <p className="resume-preview-muted mt-1">
          {[contact?.email, contact?.phone, contact?.location].filter(Boolean).join(" · ")}
        </p>
        {contact?.links?.length > 0 && (
          <p className="resume-preview-muted mt-1">
            {contact.links.map((l) => l.url).filter(Boolean).join(" · ")}
          </p>
        )}
      </header>

      {summary && (
        <section className="mt-4">
          <h2 className="resume-preview-heading text-xs font-bold uppercase tracking-wider">Summary</h2>
          <p className="mt-1 whitespace-pre-wrap">{summary}</p>
        </section>
      )}

      {experience?.length > 0 && (
        <section className="mt-4">
          <h2 className="resume-preview-heading text-xs font-bold uppercase tracking-wider">Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} className="mt-2">
              <div className="flex justify-between gap-2 font-semibold">
                <span>{[exp.title, exp.company].filter(Boolean).join(" — ")}</span>
                <span className="resume-preview-muted shrink-0">
                  {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                </span>
              </div>
              {exp.location && <p className="resume-preview-muted">{exp.location}</p>}
              <ul className="mt-1 list-disc pl-4">
                {(exp.bullets || []).filter(Boolean).map((b, bi) => (
                  <li key={bi}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {education?.length > 0 && (
        <section className="mt-4">
          <h2 className="resume-preview-heading text-xs font-bold uppercase tracking-wider">Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="mt-2">
              <p className="font-semibold">
                {[edu.degree, edu.field, edu.school].filter(Boolean).join(", ")}
              </p>
              <p className="resume-preview-muted">
                {formatDateRange(edu.startDate, edu.endDate, false)}
                {edu.details ? ` — ${edu.details}` : ""}
              </p>
            </div>
          ))}
        </section>
      )}

      {skillItems.length > 0 && (
        <section className="mt-4">
          <h2 className="resume-preview-heading text-xs font-bold uppercase tracking-wider">Skills</h2>
          <p className="mt-1">{skillItems.join(" · ")}</p>
        </section>
      )}

      {projects?.length > 0 && (
        <section className="mt-4">
          <h2 className="resume-preview-heading text-xs font-bold uppercase tracking-wider">Projects</h2>
          {projects.map((p, i) => (
            <div key={i} className="mt-2">
              <p className="font-semibold">
                {p.name}
                {p.url ? ` — ${p.url}` : ""}
              </p>
              <ul className="mt-1 list-disc pl-4">
                {(p.bullets || []).filter(Boolean).map((b, bi) => (
                  <li key={bi}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {certifications?.length > 0 && (
        <section className="mt-4">
          <h2 className="resume-preview-heading text-xs font-bold uppercase tracking-wider">Certifications</h2>
          {certifications.map((c, i) => (
            <p key={i} className="mt-1">
              {[c.name, c.issuer, c.date].filter(Boolean).join(" — ")}
            </p>
          ))}
        </section>
      )}

      <CustomSectionsBlocks sections={customSections} />
    </div>
  );
}
