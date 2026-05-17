import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import EditorialLabel from "./EditorialLabel";
import { WORKSPACES } from "../landingContent";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "../animations";

const ACCENT = {
  teal: {
    icon: "var(--teal)",
    border: "color-mix(in srgb, var(--teal) 35%, var(--stone))",
    wash: "lp-module-card--teal",
  },
  coral: {
    icon: "var(--coral)",
    border: "color-mix(in srgb, var(--coral) 35%, var(--stone))",
    wash: "lp-module-card--coral",
  },
  sun: {
    icon: "var(--sun)",
    border: "color-mix(in srgb, var(--sun) 40%, var(--stone))",
    wash: "lp-module-card--sun",
  },
};

export default function ProductModulesSection() {
  return (
    <section
      id="platform"
      className="py-12 sm:py-16 px-6 sm:px-8 border-t border-[var(--stone)] scroll-mt-[72px]"
    >
      <div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
        className="max-w-6xl mx-auto"
      >
        <EditorialLabel>Full platform</EditorialLabel>
        <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold text-[var(--ink)] mt-4 mb-3 tracking-[0.02em]">
          Three workspaces, one career safety stack
        </h2>
        <p className="text-[var(--ink-soft)] max-w-2xl mb-10 text-lg leading-relaxed">
          Everything in the app today — resume tooling, forensic verification, and community
          intelligence — designed to work together.
        </p>

        <div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 lg:grid-cols-3"
        >
          {WORKSPACES.map((ws) => {
            const Icon = ws.icon;
            const accent = ACCENT[ws.accent] ?? ACCENT.teal;
            return (
              <motion.article
                key={ws.id}
                variants={staggerItem}
                className={`lp-module-card ${accent.wash} flex flex-col rounded-2xl border p-6 sm:p-7`}
                style={{ borderColor: accent.border }}
              >
                <div
                  className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--stone)] bg-[var(--paper)]"
                  style={{ boxShadow: `0 0 20px color-mix(in srgb, ${accent.icon} 15%, transparent)` }}
                >
                  <Icon className="h-5 w-5" style={{ color: accent.icon }} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-[var(--ink)]">{ws.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{ws.tagline}</p>
                <ul className="mt-5 flex-1 space-y-2 border-t border-[var(--stone)] pt-5">
                  {ws.features.map((f) => (
                    <li key={f.to}>
                      <Link
                        to={f.to}
                        className="group flex items-center justify-between gap-2 text-[13px] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
                      >
                        <span>{f.label}</span>
                        <ArrowRight
                          className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                          style={{ color: accent.icon }}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to={ws.link}
                  className="lp-pill lp-pill--ghost mt-6 w-full justify-center text-[11px]"
                >
                  {ws.cta}
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
