import AuthTrigger from "./AuthTrigger";
import { motion } from "framer-motion";
import GlassPanel from "./GlassPanel";
import { fadeUp, viewportOnce } from "../animations";

export default function ClosingCTA() {
  return (
    <section className="px-6 py-12 sm:px-8 sm:py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
        className="mx-auto max-w-3xl text-center"
      >
        <GlassPanel className="lp-glass--cta relative overflow-hidden rounded-2xl p-8 sm:p-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 0%, var(--glow-sun), transparent 60%)",
            }}
            aria-hidden
          />
          <div
            className="absolute left-1/2 top-0 h-px w-40 -translate-x-1/2"
            style={{ background: "var(--gradient-intro-bar)" }}
            aria-hidden
          />
          <h2 className="relative mt-6 mb-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[0.02em] text-[var(--ink)]">
            Start with a free scan or resume
          </h2>
          <p className="relative mx-auto mb-8 max-w-md leading-relaxed text-ink-soft">
            Create an account to run offer letter and recruiter checks, save evidence, follow the
            Signal feed, and use the full Resume Hub.
          </p>
          <div className="relative flex flex-col justify-center gap-4 sm:flex-row">
            <AuthTrigger
              mode="sign-up"
              className="lp-btn-primary inline-flex items-center justify-center rounded-lg px-8 py-4 text-sm font-semibold"
            >
              Create free account
            </AuthTrigger>
            <AuthTrigger
              mode="sign-in"
              className="inline-flex items-center justify-center rounded-lg border px-8 py-4 text-sm font-medium text-[var(--ink)] transition-all"
              style={{
                borderColor: "var(--border-bright)",
                background: "color-mix(in srgb, var(--paper) 40%, transparent)",
              }}
            >
              Sign in
            </AuthTrigger>
          </div>
        </GlassPanel>
      </motion.div>
    </section>
  );
}
