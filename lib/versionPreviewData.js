import { hasStructuredContent, normalizeStructured } from "./resumeSchema";

/** Minimal structured shape when only plain text exists */
export function structuredFromPlainText(text) {
  const lines = String(text || "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const name = lines[0] || "Resume";
  const contactLine = lines.find((l) => /@|phone|tel:|\+?\d{7,}/i.test(l)) || "";
  const summary = lines.slice(1, 5).join(" ").slice(0, 420);

  return normalizeStructured({
    contact: {
      name,
      email: contactLine.includes("@") ? contactLine : "",
    },
    summary,
    experience: lines.slice(5, 12).map((line) => ({
      title: line.slice(0, 80),
      bullets: [],
    })),
  });
}

export function resolveVersionStructured(version) {
  const structured = normalizeStructured(version?.structured);
  if (hasStructuredContent(structured)) return structured;
  if (version?.text?.trim()) return structuredFromPlainText(version.text);
  return structured;
}
