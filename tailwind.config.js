/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,jsx}",
    "./landing/**/*.{js,jsx}",
    "./theme/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
        display: ['"Barlow Condensed"', '"Inter"', "system-ui", "sans-serif"],
        serif: ['"Fraunces"', "Georgia", "serif"],
      },
      colors: {
        luxury: {
          bg: "var(--sand)",
          surface: "var(--vc-surface)",
          muted: "var(--vc-muted)",
          border: "var(--vc-border)",
          ink: "var(--vc-ink)",
          body: "var(--vc-body)",
          caption: "var(--vc-caption)",
          accent: "var(--vc-teal)",
          "accent-hover": "var(--vc-teal-hover)",
          sun: "var(--vc-sun)",
          coral: "var(--vc-coral)",
          "on-accent": "var(--vc-on-accent)",
        },
      },
      backgroundColor: {
        "luxury-nav": "var(--vc-nav-bg)",
      },
      boxShadow: {
        soft: "0 1px 2px var(--vc-shadow), 0 4px 16px var(--vc-shadow)",
        elevated:
          "0 2px 4px var(--vc-shadow), 0 12px 40px var(--vc-shadow)",
        bloom:
          "0 4px 8px var(--vc-shadow), 0 16px 48px var(--vc-shadow)",
      },
      letterSpacing: {
        luxury: "-0.025em",
        wide: "0.08em",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      animation: {
        "ambient-drift": "ambient-drift 24s ease-in-out infinite",
      },
      keyframes: {
        "ambient-drift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(0, -8px)" },
        },
      },
    },
  },
  plugins: [],
};
