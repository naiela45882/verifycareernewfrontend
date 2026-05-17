import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FileText } from "lucide-react";
import {
  LOADING_PIPELINES,
  LOADING_SUBTITLES,
  LOADING_TITLES,
} from "../../lib/backendLoadingSteps";

function ScanRing() {
  return (
    <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 120 120" aria-hidden>
      <circle
        cx="60"
        cy="60"
        r="54"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-luxury-border/60"
      />
      <motion.circle
        cx="60"
        cy="60"
        r="54"
        fill="none"
        stroke="url(#loading-ring-gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="340"
        animate={{ strokeDashoffset: [340, 80, 340] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <defs>
        <linearGradient id="loading-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--vc-teal)" stopOpacity="0.35" />
          <stop offset="50%" stopColor="var(--vc-teal)" />
          <stop offset="100%" stopColor="var(--vc-sun)" stopOpacity="0.9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function AmbientOrbs() {
  return (
    <>
      <motion.div
        className="pointer-events-none absolute -left-[20%] top-[15%] h-[min(55vw,420px)] w-[min(55vw,420px)] rounded-full bg-luxury-accent/[0.12] blur-[80px]"
        animate={{ x: [0, 40, 0], y: [0, 24, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-[15%] bottom-[10%] h-[min(50vw,380px)] w-[min(50vw,380px)] rounded-full bg-luxury-sun/[0.08] blur-[90px]"
        animate={{ x: [0, -32, 0], y: [0, -20, 0], scale: [1.05, 1, 1.05] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(70vw,520px)] w-[min(70vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-luxury-accent/[0.06] blur-[100px]"
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

/**
 * Full-screen overlay for slow backend operations (import, ATS, AI analysis).
 */
export default function BackendLoadingOverlay({
  visible,
  variant = "generic",
  title,
  subtitle,
}) {
  const pipeline = LOADING_PIPELINES[variant] || LOADING_PIPELINES.generic;
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  const displayTitle = title || LOADING_TITLES[variant] || LOADING_TITLES.generic;
  const displaySubtitle =
    subtitle || LOADING_SUBTITLES[variant] || LOADING_SUBTITLES.generic;

  useEffect(() => {
    if (!visible) {
      setPhase(0);
      setProgress(0);
      return undefined;
    }

    const phaseInterval = setInterval(() => {
      setPhase((p) => Math.min(p + 1, pipeline.length - 1));
    }, 2400);

    return () => clearInterval(phaseInterval);
  }, [visible, pipeline]);

  useEffect(() => {
    if (!visible) return undefined;

    const target = pipeline[Math.min(phase, pipeline.length - 1)]?.progress ?? 90;
    const cap = 96;

    const progressInterval = setInterval(() => {
      setProgress((p) => {
        const delta = Math.max(0.35, (target - p) * 0.07);
        return Math.min(cap, p + delta);
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [visible, phase, pipeline]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-busy="true"
          aria-label={displayTitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-luxury-bg/95 backdrop-blur-xl"
        >
          <AmbientOrbs />

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: `
                linear-gradient(color-mix(in srgb, var(--vc-teal) 6%, transparent) 1px, transparent 1px),
                linear-gradient(90deg, color-mix(in srgb, var(--vc-teal) 6%, transparent) 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10 mx-4 w-full max-w-md rounded-2xl border border-luxury-border/80 bg-luxury-surface/90 p-8 shadow-bloom backdrop-blur-md sm:p-10"
          >
            <motion.div
              className="absolute -inset-px rounded-2xl opacity-60"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in srgb, var(--vc-teal) 25%, transparent), transparent 40%, color-mix(in srgb, var(--vc-sun) 15%, transparent))",
              }}
              animate={{ opacity: [0.35, 0.65, 0.35] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="absolute inset-0 overflow-hidden rounded-2xl"
              aria-hidden
            >
              <motion.div
                className="h-px w-full bg-gradient-to-r from-transparent via-luxury-accent/50 to-transparent"
                animate={{ y: [-20, 320] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            <motion.div
              className="relative mx-auto mb-8 h-[120px] w-[120px] text-luxury-accent"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <ScanRing />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  className="flex h-16 w-16 items-center justify-center rounded-xl border border-luxury-accent/25 bg-luxury-accent/10 shadow-[0_0_32px_color-mix(in_srgb,var(--vc-teal)_22%,transparent)]"
                  animate={{
                    boxShadow: [
                      "0 0 24px color-mix(in srgb, var(--vc-teal) 18%, transparent)",
                      "0 0 40px color-mix(in srgb, var(--vc-teal) 32%, transparent)",
                      "0 0 24px color-mix(in srgb, var(--vc-teal) 18%, transparent)",
                    ],
                  }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <FileText className="h-8 w-8 text-luxury-accent" strokeWidth={1.5} />
                </motion.div>
              </motion.div>
            </motion.div>

            <p className="relative text-center font-display text-2xl font-semibold tracking-tight text-luxury-ink sm:text-[1.65rem]">
              {displayTitle}
            </p>
            <p className="relative mt-2 text-center text-[13px] leading-relaxed text-luxury-body">
              {displaySubtitle}
            </p>

            <motion.p
              key={phase}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative mt-6 text-center text-[11px] font-medium uppercase tracking-[0.12em] text-luxury-accent"
            >
              {pipeline[phase]?.label}
            </motion.p>

            <motion.div
              className="relative mt-3 flex items-center justify-center gap-2"
              initial={false}
            >
              <span className="font-display text-4xl font-semibold tabular-nums tracking-tight text-luxury-ink">
                {Math.round(progress)}
              </span>
              <span className="text-lg text-luxury-caption">%</span>
            </motion.div>

            <motion.div
              className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-luxury-muted/80"
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-luxury-accent/60 via-luxury-accent to-luxury-sun/80"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </motion.div>

            <ul className="relative mt-5 space-y-2">
              {pipeline.map((step, i) => (
                <li
                  key={step.label}
                  className={
                    i <= phase
                      ? "flex items-center gap-2.5 text-[12px] text-luxury-body"
                      : "flex items-center gap-2.5 text-[12px] text-luxury-caption/50"
                  }
                >
                  <span
                    className={
                      i < phase
                        ? "h-1.5 w-1.5 shrink-0 rounded-full bg-luxury-accent shadow-[0_0_8px_color-mix(in_srgb,var(--vc-teal)_45%,transparent)]"
                        : i === phase
                          ? "h-1.5 w-1.5 shrink-0 rounded-full bg-luxury-accent animate-pulse"
                          : "h-1.5 w-1.5 shrink-0 rounded-full bg-luxury-border"
                    }
                  />
                  {step.label}
                </li>
              ))}
            </ul>

            <p className="relative mt-6 text-center text-[11px] text-luxury-caption">
              Please keep this tab open — usually 15–45 seconds
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
