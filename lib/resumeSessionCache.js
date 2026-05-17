const FEEDBACK_KEY = "vc:resume-feedback";

export function setFeedbackCache(data) {
  try {
    sessionStorage.setItem(
      FEEDBACK_KEY,
      JSON.stringify({ data, at: Date.now() })
    );
  } catch {
    /* ignore quota / private mode */
  }
}

/** @param {number} maxAgeMs default 30 minutes */
export function getFeedbackCache(maxAgeMs = 30 * 60 * 1000) {
  try {
    const raw = sessionStorage.getItem(FEEDBACK_KEY);
    if (!raw) return null;
    const { data, at } = JSON.parse(raw);
    if (Date.now() - at > maxAgeMs) return null;
    return data;
  } catch {
    return null;
  }
}
