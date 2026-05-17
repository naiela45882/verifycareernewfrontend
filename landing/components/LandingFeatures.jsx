import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import EditorialLabel from "./EditorialLabel";
import GlassPanel from "./GlassPanel";
import { CAPABILITIES, PLATFORM_TOOLS } from "../landingContent";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "../animations";
import { ArrowRight } from "lucide-react";

function CapabilityCard({ icon: Icon, title, desc, to }) {
  return (
    <GlassPanel className="group flex h-full flex-col rounded-xl p-5 transition-shadow hover:shadow-[0_0_24px_color-mix(in_srgb,var(--teal)_14%,transparent)]">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--stone)]">
        <Icon className="h-[18px] w-[18px]" style={{ color: "var(--teal)" }} strokeWidth={1.5} />
      </div>
      <h3 className="mb-2 text-[15px] font-semibold text-[var(--ink)]">{title}</h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">{desc}</p>
      <Link
        to={to}
        className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[var(--teal)]"
      >
        Open <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
      </Link>
    </GlassPanel>
  );
}

export default function LandingFeatures() {
  return (
    <section
      id="features"
      className="scroll-mt-[72px] border-t border-[var(--stone)] px-6 py-12 sm:px-8 sm:py-16"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
        className="mx-auto max-w-6xl"
      >
        <EditorialLabel>Every capability</EditorialLabel>
        <h2 className="mt-4 mb-3 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold tracking-[0.02em] text-[var(--ink)]">
          Built for the full hiring journey
        </h2>
        <p className="mb-8 max-w-2xl text-lg text-[var(--ink-soft)]">
          From your first resume draft to your last offer letter check — the same account, the
          same design system, the same trust signals.
        </p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-10 grid gap-4 sm:grid-cols-3"
        >
          {PLATFORM_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.div key={tool.title} variants={staggerItem}>
                <Link to={tool.to} className="block h-full">
                  <GlassPanel className="h-full rounded-xl p-5 transition-colors hover:border-[color-mix(in_srgb,var(--sun)_40%,var(--stone))]">
                    <Icon className="mb-3 h-5 w-5" style={{ color: "var(--sun)" }} strokeWidth={1.5} />
                    <h3 className="text-sm font-semibold text-[var(--ink)]">{tool.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[var(--ink-soft)]">{tool.desc}</p>
                  </GlassPanel>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CAPABILITIES.map((cap) => (
            <motion.div key={cap.title} variants={staggerItem}>
              <CapabilityCard {...cap} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
