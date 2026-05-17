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

export function normalizeStructured(input) {
  const base = emptyResume();
  if (!input || typeof input !== "object") return base;

  const contact = input.contact || {};
  base.contact = {
    name: String(contact.name || "").trim(),
    email: String(contact.email || "").trim(),
    phone: String(contact.phone || "").trim(),
    location: String(contact.location || "").trim(),
    links: Array.isArray(contact.links)
      ? contact.links
          .filter((l) => l && l.url)
          .map((l) => ({
            label: String(l.label || l.url).trim(),
            url: String(l.url).trim(),
          }))
      : [],
  };

  base.summary = String(input.summary || "").trim();

  base.experience = Array.isArray(input.experience)
    ? input.experience.map((e) => ({
        company: String(e.company || "").trim(),
        title: String(e.title || "").trim(),
        location: String(e.location || "").trim(),
        startDate: String(e.startDate || "").trim(),
        endDate: String(e.endDate || "").trim(),
        current: Boolean(e.current),
        bullets: Array.isArray(e.bullets)
          ? e.bullets.map((b) => String(b).trim()).filter(Boolean)
          : [],
      }))
    : [];

  base.education = Array.isArray(input.education)
    ? input.education.map((e) => ({
        school: String(e.school || "").trim(),
        degree: String(e.degree || "").trim(),
        field: String(e.field || "").trim(),
        startDate: String(e.startDate || "").trim(),
        endDate: String(e.endDate || "").trim(),
        details: String(e.details || "").trim(),
      }))
    : [];

  if (Array.isArray(input.skills)) {
    base.skills = {
      categories: [{ name: "Skills", items: input.skills.map(String) }],
    };
  } else if (input.skills?.categories) {
    base.skills = {
      categories: input.skills.categories.map((cat) => ({
        name: String(cat.name || "Skills").trim(),
        items: Array.isArray(cat.items) ? cat.items.map(String) : [],
      })),
    };
  } else {
    base.skills = { categories: [{ name: "Skills", items: [] }] };
  }

  base.projects = Array.isArray(input.projects)
    ? input.projects.map((p) => ({
        name: String(p.name || "").trim(),
        url: String(p.url || "").trim(),
        bullets: Array.isArray(p.bullets)
          ? p.bullets.map((b) => String(b).trim()).filter(Boolean)
          : [],
      }))
    : [];

  base.certifications = Array.isArray(input.certifications)
    ? input.certifications.map((c) => ({
        name: String(c.name || "").trim(),
        issuer: String(c.issuer || "").trim(),
        date: String(c.date || "").trim(),
      }))
    : [];

  base.customSections = Array.isArray(input.customSections)
    ? input.customSections.map((s) => ({
        id: String(s.id || newCustomSectionId()),
        title: String(s.title || "").trim(),
        bullets: Array.isArray(s.bullets) && s.bullets.length
          ? s.bullets.map((b) => String(b).trim())
          : [""],
      }))
    : [];

  return base;
}
