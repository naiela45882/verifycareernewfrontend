export const THEME_STORAGE_KEY = "verifycareers-theme";

export const THEMES = {
  harbor: {
    id: "harbor",
    label: "Harbor",
    hint: "Light",
    ink: "#0e1a22",
    teal: "#1a768c",
    sun: "#f5ce6b",
    coral: "#ff7a59",
    paper: "#f7fbff",
    sand: "#eef4f6",
    dark: false,
  },
  midnight: {
    id: "midnight",
    label: "Midnight",
    hint: "Dark",
    ink: "#eef4f8",
    teal: "#4a9cad",
    sun: "#e8c66a",
    coral: "#ff9478",
    paper: "#141c24",
    sand: "#0d1419",
    dark: true,
  },
};

export const THEME_IDS = Object.keys(THEMES);
export const DEFAULT_THEME = "harbor";

const LEGACY_LIGHT_THEMES = new Set(["sandstone", "sand"]);

export function isValidTheme(id) {
  return THEME_IDS.includes(id);
}

/** @deprecated use THEME_STORAGE_KEY */
export const LEGACY_THEME_STORAGE_KEY = "verifycareers-landing-theme";

const CIVIC_THEME_KEY = "civic-theme";

export function migrateLegacyTheme(id) {
  if (!id) return DEFAULT_THEME;
  if (LEGACY_LIGHT_THEMES.has(id)) return DEFAULT_THEME;
  return isValidTheme(id) ? id : DEFAULT_THEME;
}

export function normalizeStoredThemes() {
  if (typeof window === "undefined") return;
  const keys = [THEME_STORAGE_KEY, LEGACY_THEME_STORAGE_KEY, CIVIC_THEME_KEY];
  for (const key of keys) {
    const raw = localStorage.getItem(key);
    if (!raw) continue;
    const next = migrateLegacyTheme(raw);
    if (next !== raw) {
      if (key === CIVIC_THEME_KEY) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, next);
      }
    }
  }
  if (!localStorage.getItem(THEME_STORAGE_KEY)) {
    localStorage.setItem(THEME_STORAGE_KEY, DEFAULT_THEME);
  }
}

export function readStoredTheme() {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const civic = localStorage.getItem(CIVIC_THEME_KEY);
  if (civic) {
    return migrateLegacyTheme(civic);
  }
  const stored =
    localStorage.getItem(THEME_STORAGE_KEY) ||
    localStorage.getItem(LEGACY_THEME_STORAGE_KEY);
  return migrateLegacyTheme(stored);
}
