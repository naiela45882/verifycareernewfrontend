export const DEFAULT_STRUCTURED = {
  contact: {
    name: "",
    email: "",
    phone: "",
    location: "",
    links: [],
  },
  summary: "",
  experience: [],
  education: [],
  skills: { categories: [{ name: "Skills", items: [] }] },
  projects: [],
  certifications: [],
  customSections: [],
};

export function newCustomSectionId() {
  return `cs_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function emptyCustomSection(title = "") {
  return {
    id: newCustomSectionId(),
    title,
    bullets: [""],
  };
}

export function isCustomSectionKey(key) {
  return typeof key === "string" && key.startsWith("custom:");
}

export function customSectionIdFromKey(key) {
  return key.replace(/^custom:/, "");
}

export function emptyExperience() {
  return {
    company: "",
    title: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    bullets: [""],
  };
}

export function emptyEducation() {
  return {
    school: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    details: "",
  };
}

export function emptyProject() {
  return { name: "", url: "", bullets: [""] };
}

export function emptyCertification() {
  return { name: "", issuer: "", date: "" };
}

export function emptyResume() {
  return JSON.parse(JSON.stringify(DEFAULT_STRUCTURED));
}

export function hasStructuredContent(structured) {
  if (!structured) return false;
  const c = structured.contact || {};
  if (c.name || c.email || c.phone || c.location) return true;
  if (structured.summary) return true;
  if (structured.experience?.length) return true;
  if (structured.education?.length) return true;
  const items =
    structured.skills?.categories?.flatMap((cat) => cat.items || []) || [];
  if (items.length) return true;
  if (structured.projects?.length) return true;
  if (structured.certifications?.length) return true;
  if (structured.customSections?.some((s) => s.title || s.bullets?.some(Boolean))) return true;
  return false;
}

function normStr(value, trim) {
  const s = String(value ?? "");
  return trim ? s.trim() : s;
}

/**
 * @param {object} input
 * @param {{ trim?: boolean }} [options] — trim=false while typing (preserves spaces); trim=true on load/save
 */
export function normalizeStructured(input, { trim = true } = {}) {
  const base = emptyResume();
  if (!input || typeof input !== "object") return base;

  const contact = input.contact || {};
  base.contact = {
    name: normStr(contact.name, trim),
    email: normStr(contact.email, trim),
    phone: normStr(contact.phone, trim),
    location: normStr(contact.location, trim),
    links: Array.isArray(contact.links)
      ? contact.links
          .filter((l) => {
            if (!l) return false;
            if (trim) {
              return normStr(l.url, true) || normStr(l.label, true);
            }
            return String(l.url ?? "") !== "" || String(l.label ?? "") !== "";
          })
          .map((l) => ({
            label: normStr(l.label, trim) || normStr(l.url, trim),
            url: normStr(l.url, trim),
          }))
      : [],
  };

  base.summary = normStr(input.summary, trim);

  base.experience = Array.isArray(input.experience)
    ? input.experience.map((e) => ({
        company: normStr(e.company, trim),
        title: normStr(e.title, trim),
        location: normStr(e.location, trim),
        startDate: normStr(e.startDate, trim),
        endDate: normStr(e.endDate, trim),
        current: Boolean(e.current),
        bullets: Array.isArray(e.bullets)
          ? trim
            ? e.bullets.map((b) => normStr(b, true)).filter(Boolean)
            : e.bullets.map((b) => String(b ?? ""))
          : [],
      }))
    : [];

  base.education = Array.isArray(input.education)
    ? input.education.map((e) => ({
        school: normStr(e.school, trim),
        degree: normStr(e.degree, trim),
        field: normStr(e.field, trim),
        startDate: normStr(e.startDate, trim),
        endDate: normStr(e.endDate, trim),
        details: normStr(e.details, trim),
      }))
    : [];

  if (Array.isArray(input.skills)) {
    base.skills = {
      categories: [{ name: "Skills", items: input.skills.map(String) }],
    };
  } else if (input.skills?.categories) {
    base.skills = {
      categories: input.skills.categories.map((cat) => ({
        name: normStr(cat.name || "Skills", trim),
        items: Array.isArray(cat.items) ? cat.items.map(String) : [],
      })),
    };
  } else {
    base.skills = { categories: [{ name: "Skills", items: [] }] };
  }

  base.projects = Array.isArray(input.projects)
    ? input.projects.map((p) => ({
        name: normStr(p.name, trim),
        url: normStr(p.url, trim),
        bullets: Array.isArray(p.bullets)
          ? trim
            ? p.bullets.map((b) => normStr(b, true)).filter(Boolean)
            : p.bullets.map((b) => String(b ?? ""))
          : [],
      }))
    : [];

  base.certifications = Array.isArray(input.certifications)
    ? input.certifications.map((c) => ({
        name: normStr(c.name, trim),
        issuer: normStr(c.issuer, trim),
        date: normStr(c.date, trim),
      }))
    : [];

  base.customSections = Array.isArray(input.customSections)
    ? input.customSections.map((s) => ({
        id: String(s.id || newCustomSectionId()),
        title: normStr(s.title, trim),
        bullets: Array.isArray(s.bullets) && s.bullets.length
          ? trim
            ? s.bullets.map((b) => normStr(b, true))
            : s.bullets.map((b) => String(b ?? ""))
          : [""],
      }))
    : [];

  return base;
}
