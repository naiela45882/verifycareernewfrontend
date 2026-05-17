import { formatDateRange, getSkillItems } from "../shared/formatters";
import { CustomSectionsBlocks } from "../shared/CustomSectionsBlocks";

/** Modern template uses a fixed dark header — part of the resume design, not app chrome. */
const MODERN_HEADER = "bg-[#1e293b] px-8 py-6 text-white";
const MODERN_SKILL_TAG = "rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-800";

export default function ModernPreview({ data }) {
  const { contact, summary, experience, education, skills, projects, certifications, customSections } =
    data || {};
  const skillItems = getSkillItems(skills);

  return (
    <div className="mx-auto max-w-[210mm] text-[11px] leading-relaxed shadow-sm">
      <header className={MODERN_HEADER}>
        {contact?.name && <h1 className="text-2xl font-light tracking-wide">{contact.name}</h1>}
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-200">
          {contact?.email && <span>{contact.email}</span>}
          {contact?.phone && <span>{contact.phone}</span>}
          {contact?.location && <span>{contact.location}</span>}
        </div>
        {contact?.links?.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-300">
            {contact.links.map((l, i) => (
              <span key={i}>{l.label || l.url}</span>
            ))}
          </div>
        )}
      </header>

      <div className="p-8">
        {summary && (
          <section className="mb-5">
            <h2 className="resume-preview-heading mb-1 border-b-2 border-gray-800 pb-0.5 text-sm font-semibold">
              Profile
            </h2>
            <p className="resume-preview-muted whitespace-pre-wrap">{summary}</p>
          </section>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-5 md:col-span-2">
            {experience?.length > 0 && (
              <section>
                <h2 className="resume-preview-heading mb-2 border-b-2 border-gray-800 pb-0.5 text-sm font-semibold">
                  Experience
                </h2>
                {experience.map((exp, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between font-semibold">
                      <span>{exp.title}</span>
                      <span className="resume-preview-muted text-xs font-normal">
                        {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                      </span>
                    </div>
                    <p className="resume-preview-muted">
                      {exp.company}
                      {exp.location ? ` · ${exp.location}` : ""}
                    </p>
                    <ul className="mt-1 list-none space-y-0.5 pl-0">
                      {(exp.bullets || []).filter(Boolean).map((b, bi) => (
                        <li key={bi} className="before:mr-2 before:content-['▸']">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            )}

            {projects?.length > 0 && (
              <section>
                <h2 className="resume-preview-heading mb-2 border-b-2 border-gray-800 pb-0.5 text-sm font-semibold">
                  Projects
                </h2>
                {projects.map((p, i) => (
                  <div key={i} className="mb-2">
                    <p className="font-semibold">{p.name}</p>
                    <ul className="mt-1 space-y-0.5">
                      {(p.bullets || []).filter(Boolean).map((b, bi) => (
                        <li key={bi} className="resume-preview-muted">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            )}
          </div>

          <div className="space-y-5">
            {skillItems.length > 0 && (
              <section>
                <h2 className="resume-preview-heading mb-2 text-sm font-semibold">Skills</h2>
                <div className="flex flex-wrap gap-1.5">
                  {skillItems.map((s, i) => (
                    <span key={i} className={MODERN_SKILL_TAG}>
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {education?.length > 0 && (
              <section>
                <h2 className="resume-preview-heading mb-2 text-sm font-semibold">Education</h2>
                {education.map((edu, i) => (
                  <div key={i} className="mb-2">
                    <p className="font-medium">{edu.school}</p>
                    <p className="resume-preview-muted">{edu.degree}</p>
                    <p className="resume-preview-muted text-xs">
                      {formatDateRange(edu.startDate, edu.endDate, false)}
                    </p>
                  </div>
                ))}
              </section>
            )}

            {certifications?.length > 0 && (
              <section>
                <h2 className="resume-preview-heading mb-2 text-sm font-semibold">Certifications</h2>
                {certifications.map((c, i) => (
                  <p key={i} className="resume-preview-muted mb-1">
                    {c.name}
                  </p>
                ))}
              </section>
            )}
          </div>

          <CustomSectionsBlocks
            sections={customSections}
            headingClassName="resume-preview-heading mb-2 border-b-2 border-gray-800 pb-0.5 text-sm font-semibold"
            listClassName="mt-1 space-y-0.5"
          />
        </div>
      </div>
    </div>
  );
}
