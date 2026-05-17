import { useTheme } from "../../theme/ThemeContext";
import { THEME_IDS } from "../../theme/themes";

export default function LandingThemePills({ className = "hidden lg:flex" }) {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className={`lp-theme-pills flex ${className}`} role="tablist" aria-label="Color theme">
      {THEME_IDS.map((id) => {
        const active = theme === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => setTheme(id)}
            className={`lp-theme-pill ${active ? "lp-theme-pill--active" : ""}`}
          >
            {themes[id].label.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
