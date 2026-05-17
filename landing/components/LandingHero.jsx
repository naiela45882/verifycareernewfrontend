import AuthTrigger from "./AuthTrigger";
import { motion } from "framer-motion";
import HeroSignalCard from "./HeroSignalCard";
import { staggerContainer, staggerItem } from "../animations";

const chips = [
  "Scam risk scoring",
  "Recruiter verification",
  "Signal feed",
  "Resume hub",
  "Publish evidence",
];

const stats = [
  { value: "4", label: "Trust tools" },
  { value: "3", label: "Community channels" },
  { value: "1", label: "Career dashboard" },
];

export default function LandingHero() {
  return (
    <section
      id="home"
      className="relative flex flex-col justify-center overflow-hidden scroll-mt-[72px] px-6 pb-12 pt-20 sm:px-8 sm:pb-14"
    >
      <motion.div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35]" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-[12%] h-[48vh] w-[70vw] -translate-x-1/2 rounded-full opacity-30 blur-[140px]"
        style={{ background: "var(--glow-coral)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-[8%] top-[28%] h-[38vh] w-[42vw] rounded-full opacity-25 blur-[120px]"
        style={{ background: "var(--glow-teal)" }}
        aria-hidden
      />

      <motion.div
        className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div>
          <motion.div variants={staggerItem} className="lp-hero-badge">
            <span className="lp-hero-badge__dot" aria-hidden />
            VerifyCareers — full platform
          </motion.div>

          <motion.h1
            variants={staggerItem}
            className="mt-5 font-sans text-[clamp(2rem,4.5vw,3.35rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-[var(--ink)]"
          >
            Verify jobs, build resumes, and{" "}
            <span className="lp-gradient-word lp-gradient-word--teal">stay ahead</span> of{" "}
            <span className="lp-gradient-word lp-gradient-word--coral">recruitment scams</span>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg"
          >
            Offer letter scans, recruiter checks, saved evidence with publish options, a live
            Signal feed, resume builder with JD tailoring, applications tracking, and skill
            journey — in one workspace.
          </motion.p>

          <motion.div variants={staggerItem} className="mt-6 flex flex-wrap gap-3">
            <AuthTrigger mode="sign-up" className="lp-pill lp-pill--primary">
              Create free account
            </AuthTrigger>
            <a href="#platform" className="lp-pill lp-pill--ghost">
              Explore platform
            </a>
          </motion.div>

          <motion.div variants={staggerItem} className="mt-5 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span key={chip} className="lp-chip">
                {chip}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-[var(--stone)] pt-6"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-xl font-semibold tabular-nums text-[var(--ink)] sm:text-2xl">
                  {s.value}
                </p>
                <p className="lp-label mt-1 !text-[9px]">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div variants={staggerItem} className="flex justify-center lg:justify-end">
          <HeroSignalCard />
        </motion.div>
      </motion.div>
    </section>
  );
}
