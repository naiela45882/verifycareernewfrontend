function formatDateRange(start, end, current) {
  if (!start && !end) return "";
  if (current) return `${start || ""} – Present`.trim();
  if (start && end) return `${start} – ${end}`;
  return start || end || "";
}

export function structuredToPlainText(structured) {
  if (!structured) return "";

  const lines = [];
  const { contact, summary, experience, education, skills, projects, certifications } =
    structured;

  if (contact?.name) lines.push(contact.name);
  const contactBits = [contact?.email, contact?.phone, contact?.location].filter(Boolean);
  if (contactBits.length) lines.push(contactBits.join(" | "));
  if (contact?.links?.length) {
    contact.links.forEach((l) => {
      if (l?.url) lines.push(`${l.label || l.url}: ${l.url}`);
    });
  }
  if (lines.length) lines.push("");

  if (summary) {
    lines.push("SUMMARY", summary, "");
  }

  if (experience?.length) {
    lines.push("EXPERIENCE");
    experience.forEach((exp) => {
      const header = [exp.title, exp.company].filter(Boolean).join(" — ");
      if (header) lines.push(header);
      const meta = [exp.location, formatDateRange(exp.startDate, exp.endDate, exp.current)]
        .filter(Boolean)
        .join(" | ");
      if (meta) lines.push(meta);
      (exp.bullets || []).forEach((b) => lines.push(`- ${b}`));
      lines.push("");
    });
  }

  if (education?.length) {
    lines.push("EDUCATION");
    education.forEach((edu) => {
      const header = [edu.degree, edu.field, edu.school].filter(Boolean).join(", ");
      if (header) lines.push(header);
      const dates = formatDateRange(edu.startDate, edu.endDate, false);
      if (dates) lines.push(dates);
      if (edu.details) lines.push(edu.details);
      lines.push("");
    });
  }

  const skillItems =
    skills?.categories?.flatMap((cat) =>
      (cat.items || []).length ? [`${cat.name}: ${cat.items.join(", ")}`] : []
    ) || [];
  if (skillItems.length) {
    lines.push("SKILLS", ...skillItems, "");
  }

  if (projects?.length) {
    lines.push("PROJECTS");
    projects.forEach((p) => {
      const header = [p.name, p.url].filter(Boolean).join(" — ");
      if (header) lines.push(header);
      (p.bullets || []).forEach((b) => lines.push(`- ${b}`));
      lines.push("");
    });
  }

  if (certifications?.length) {
    lines.push("CERTIFICATIONS");
    certifications.forEach((c) => {
      const line = [c.name, c.issuer, c.date].filter(Boolean).join(" — ");
      if (line) lines.push(line);
    });
  }

  return lines.join("\n").trim();
}
