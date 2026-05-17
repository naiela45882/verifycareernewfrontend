import { useEffect, useRef, useState } from "react";
import { Check, Palette } from "lucide-react";
import { useTheme } from "../theme/ThemeContext";
import { THEME_IDS } from "../theme/themes";
import { cn } from "../lib/cn";

export default function ThemeSwitcher({ variant = "app", className }) {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onEscape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  const triggerClass =
    variant === "landing"
      ? "nav-underline flex items-center gap-2 text-luxury-body hover:text-luxury-ink transition-colors duration-300 py-1"
      : "flex items-center gap-1.5 text-sm font-medium text-luxury-body hover:text-luxury-ink transition-colors duration-300 py-1.5 px-2 rounded-lg hover:bg-luxury-muted/60";

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={triggerClass}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select color theme"
      >
        <Palette className="w-3.5 h-3.5 opacity-60 shrink-0" strokeWidth={1.5} />
        <span className={variant === "landing" ? "hidden xl:inline" : "hidden sm:inline"}>
          {themes[theme].label}
        </span>
        <span className={variant === "landing" ? "xl:hidden" : "sm:hidden"}>Theme</span>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Color themes"
          className="absolute top-full right-0 mt-2 surface-card rounded-xl py-2 min-w-[200px] shadow-elevated z-[100]"
        >
          {THEME_IDS.map((id) => {
            const t = themes[id];
            const active = theme === id;
            return (
              <button
                key={id}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  setTheme(id);
                  setOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-200",
                  active
                    ? "text-luxury-ink bg-luxury-muted/80"
                    : "text-luxury-body hover:text-luxury-ink hover:bg-luxury-muted/50"
                )}
              >
                <span className="flex -space-x-1">
                  <span className="theme-swatch" style={{ background: t.paper }} aria-hidden />
                  <span className="theme-swatch" style={{ background: t.teal }} aria-hidden />
                  <span className="theme-swatch" style={{ background: t.sun }} aria-hidden />
                </span>
                <span className="flex-1 font-medium">{t.label}</span>
                {active && (
                  <Check className="w-4 h-4 text-luxury-accent shrink-0" strokeWidth={1.5} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
