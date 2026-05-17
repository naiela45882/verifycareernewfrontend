export function formatDateRange(start, end, current) {
  if (!start && !end) return "";
  if (current) return `${start || ""} – Present`.trim();
  if (start && end) return `${start} – ${end}`;
  return start || end || "";
}

export function getSkillItems(skills) {
  return skills?.categories?.flatMap((cat) => cat.items || []) || [];
}
