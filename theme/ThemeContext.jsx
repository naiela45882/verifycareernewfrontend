import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import {
  THEMES,
  isValidTheme,
  normalizeStoredThemes,
  readStoredTheme,
} from "./themes";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    normalizeStoredThemes();
    return readStoredTheme();
  });

  const setTheme = useCallback((id) => {
    if (!isValidTheme(id)) return;
    setThemeState(id);
    localStorage.setItem("verifycareers-theme", id);
  }, []);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.classList.toggle("theme-dark", THEMES[theme].dark);
    root.style.colorScheme = THEMES[theme].dark ? "dark" : "light";
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      themeConfig: THEMES[theme],
      setTheme,
      themes: THEMES,
      isDark: THEMES[theme].dark,
    }),
    [theme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
