/** Coerce Mongo/ObjectId/API values to a route-safe string id */
export function normalizeId(value) {
  if (value == null) return null;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed || trimmed === "undefined") return null;
    return trimmed;
  }
  if (typeof value === "object" && value.$oid) return String(value.$oid);
  if (typeof value.toString === "function") {
    const s = value.toString();
    if (!s || s === "[object Object]" || s === "undefined") return null;
    return s;
  }
  return null;
}
