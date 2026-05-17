import { motion } from "framer-motion";
import EditorialLabel from "./EditorialLabel";
import GlassPanel from "./GlassPanel";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "../animations";

const highlights = [
  {
    title: "Transparent scam risk",
    desc: "0–100 scam risk on every scan — higher means more dangerous. Entity trust ratings and red flags explain why.",
    color: "var(--coral)",
  },
  {
    title: "Evidence you control",
    desc: "Scans stay in My Evidence. Publish with your name or anonymously to grow the community Signal feed.",
    color: "var(--teal)",
  },
  {
    title: "Resume + applications",
    desc: "Resume Hub, tailor-to-job, feedback, Applications Tracker, and Skill Journey — not just verification.",
    color: "var(--sun)",
  },
];

const languages = [
  "English",
  "Hindi",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Bengali",
  "Marathi",
];

export default function TrustSection() {
  return (
    <section
      id="faq"
      className="scroll-mt-[72px] border-t border-[var(--stone)] px-6 py-12 sm:px-8 sm:py-16"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
        className="mx-auto max-w-6xl"
      >
        <EditorialLabel>Why VerifyCareers</EditorialLabel>
        <h2 className="mt-4 mb-8 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold tracking-[0.02em] text-[var(--ink)]">
          One platform for safer career decisions
        </h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-8 grid gap-5 md:grid-cols-3"
        >
          {highlights.map((h) => (
            <motion.div key={h.title} variants={staggerItem}>
              <GlassPanel className="h-full rounded-xl p-6">
                <p className="lp-label mb-3" style={{ color: h.color }}>
                  {h.title}
                </p>
                <p className="text-sm leading-relaxed text-ink-soft">{h.desc}</p>
              </GlassPanel>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-8 lg:grid-cols-2"
        >
          <motion.div variants={staggerItem}>
            <GlassPanel className="rounded-2xl p-8">
              <p className="lp-label mb-4 text-[var(--teal)]">Multilingual parsing</p>
              <p className="mb-6 leading-relaxed text-ink-soft">
                Analyze offers and recruiter messages across major Indian languages and English —
                with consistent scam risk scoring regardless of script.
              </p>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <span
                    key={lang}
                    className="rounded-md border border-[var(--stone)] bg-[var(--surface-muted)] px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-[var(--teal)]"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </GlassPanel>
          </motion.div>

          <motion.div variants={staggerItem}>
            <GlassPanel className="rounded-2xl p-8">
              <p className="lp-label mb-4 text-[var(--coral)]">Privacy-first</p>
              <ul className="space-y-4 text-sm text-ink-soft">
                <li className="flex gap-3">
                  <span className="shrink-0 text-[var(--teal)]">—</span>
                  Encrypted in transit; scans stored for your evidence library, not sold.
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 text-[var(--sun)]">—</span>
                  Choose named or anonymous publish when contributing to the community.
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 text-[var(--coral)]">—</span>
                  Built for students, career centres, and anyone navigating online hiring risk.
                </li>
              </ul>
            </GlassPanel>
          </motion.div>
        </motion.div>

        <motion.div id="about" className="mt-8" variants={staggerItem}>
          <GlassPanel className="rounded-2xl p-8 sm:p-10">
            <h3 className="mb-4 font-display text-2xl font-semibold text-[var(--ink)]">
              About VerifyCareers
            </h3>
            <p className="mb-4 leading-relaxed text-ink-soft">
              VerifyCareers helps you detect fake job offers, verify recruiters, and build a
              stronger resume — with scam risk scores, red flags, warnings and reassurances from
              the intelligence graph, and a community Signal feed.
            </p>
            <p className="leading-relaxed text-ink-soft">
              Use Resume Hub and Applications Tracker alongside Trust Intelligence so verification
              is part of your normal job search — not a separate tool.
            </p>
          </GlassPanel>
        </motion.div>
      </motion.div>
    </section>
  );
}
