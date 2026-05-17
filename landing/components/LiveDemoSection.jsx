import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import EditorialLabel from "./EditorialLabel";
import GlassPanel from "./GlassPanel";
import { fadeUp, viewportOnce } from "../animations";

const SAMPLE =
  "Dear Candidate,\n\nCongratulations! Remote Data Entry — ₹85,000/month.\nPay ₹2,500 registration fee to secure your slot.\nContact: hr-fasthire@outlook.com";

const phases = [
  { label: "Parsing document & fingerprint", progress: 20 },
  { label: "Scam pattern & salary check", progress: 48 },
  { label: "Recruiter domain & graph lookup", progress: 72 },
  { label: "Scam risk & red flags", progress: 100 },
];

const redFlags = [
  "Registration fee before interview",
  "Free email provider (not corporate domain)",
  "No job post URL for cross-check",
];

export default function LiveDemoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState(0);
  const [verdict, setVerdict] = useState(null);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const typeIv = setInterval(() => {
      i++;
      setTyped(SAMPLE.slice(0, i));
      if (i >= SAMPLE.length) clearInterval(typeIv);
    }, 18);
    return () => clearInterval(typeIv);
  }, [inView]);

  useEffect(() => {
    if (!inView || typed.length < SAMPLE.length) return;
    const iv = setInterval(() => {
      setPhase((p) => {
        const next = Math.min(p + 1, phases.length - 1);
        if (next === phases.length - 1) {
          setVerdict({ score: 78, tier: "Danger", label: "High scam risk — review before replying" });
        }
        return next;
      });
    }, 1300);
    return () => clearInterval(iv);
  }, [inView, typed.length]);

  return (
    <section id="demo" ref={ref} className="scroll-mt-[72px] px-6 py-12 sm:px-8 sm:py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
        className="mx-auto max-w-6xl"
      >
        <EditorialLabel>Offer letter scan</EditorialLabel>
        <h2 className="mt-4 mb-2 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold tracking-[0.02em] text-[var(--ink)]">
          See Trust Intelligence in motion
        </h2>
        <p className="mb-8 max-w-2xl text-[var(--ink-soft)]">
          Same engine as{" "}
          <strong className="font-medium text-[var(--ink)]">Offer Letter Scan</strong> in the app —
          scam risk score, red flags, saved evidence, and optional publish to Signal feed.
        </p>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <GlassPanel className="rounded-2xl p-6">
            <p className="lp-label mb-3">Input — offer text</p>
            <pre className="min-h-[200px] whitespace-pre-wrap font-sans text-sm leading-relaxed text-[var(--ink-soft)]">
              {typed}
              <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-[var(--teal)] align-middle" />
            </pre>
          </GlassPanel>

          <GlassPanel className="flex flex-col rounded-2xl p-6">
            <p className="lp-label mb-4">Output — verification result</p>

            <div className="flex-1 space-y-4">
              {phases.map((p, i) => (
                <div key={p.label} className={i > phase ? "opacity-30" : ""}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-[var(--ink-soft)]">{p.label}</span>
                    {i <= phase && (
                      <span className="tabular-nums text-[var(--teal)]">{p.progress}%</span>
                    )}
                  </div>
                  <div className="lp-progress-track rounded-full">
                    <motion.div
                      className="lp-progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: i <= phase ? `${p.progress}%` : "0%" }}
                      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {verdict && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 border-t border-[var(--stone)] pt-6"
              >
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="lp-label mb-1">Scam risk</p>
                    <p className="font-display text-5xl font-semibold tabular-nums text-[var(--coral)]">
                      {verdict.score}
                      <span className="text-2xl text-[var(--ink-soft)]">/100</span>
                    </p>
                  </div>
                  <span className="rounded-full border border-[color-mix(in_srgb,var(--coral)_40%,var(--stone))] bg-[color-mix(in_srgb,var(--coral)_10%,var(--paper))] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--coral)]">
                    {verdict.tier}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[var(--ink-soft)]">{verdict.label}</p>
                <p className="lp-label mb-2 mt-4">Red flags</p>
                <ul className="space-y-2 text-xs text-[var(--ink-soft)]">
                  {redFlags.map((flag) => (
                    <li key={flag} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--coral)]" />
                      {flag}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </GlassPanel>
        </div>
      </motion.div>
    </section>
  );
}
