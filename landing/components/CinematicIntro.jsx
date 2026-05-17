import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GoldenGlobe from "./GoldenGlobe";
import { useReducedMotion } from "../hooks/useReducedMotion";

const INTRO_KEY = "verifycareers-intro-seen";

const PATH_D =
  "M 40 120 Q 120 40 200 80 T 360 100 T 520 60 T 680 90";

export default function CinematicIntro({ onComplete }) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(reduced ? "done" : "shutter");
  const [score, setScore] = useState(0);
  const [orbProgress, setOrbProgress] = useState(0);

  useEffect(() => {
    if (reduced || sessionStorage.getItem(INTRO_KEY) === "1") {
      onComplete?.();
      return;
    }

    const timers = [
      setTimeout(() => setPhase("pathway"), 500),
      setTimeout(() => setPhase("scan"), 1200),
      setTimeout(() => setPhase("analyze"), 2000),
      setTimeout(() => setPhase("score"), 3000),
      setTimeout(() => {
        let v = 0;
        const iv = setInterval(() => {
          v += 4;
          setScore(Math.min(v, 94));
          if (v >= 94) clearInterval(iv);
        }, 40);
      }, 3200),
      setTimeout(() => setPhase("exit"), 4200),
      setTimeout(() => {
        sessionStorage.setItem(INTRO_KEY, "1");
        onComplete?.();
      }, 5000),
    ];

    const orbIv = setInterval(() => {
      setOrbProgress((p) => Math.min(p + 2, 100));
    }, 50);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(orbIv);
    };
  }, [reduced, onComplete]);

  if (reduced || phase === "done") return null;

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="intro"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--sand)] overflow-hidden"
        >
          {phase === "shutter" && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              className="absolute inset-0 bg-[var(--paper)] origin-top"
            />
          )}

          {(phase === "pathway" ||
            phase === "scan" ||
            phase === "analyze" ||
            phase === "score") && (
            <>
              <svg
                className="absolute inset-0 w-full h-full opacity-40"
                viewBox="0 0 720 200"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden
              >
                <path className="lp-wireframe-path" d={PATH_D} />
                <motion.path
                  d={PATH_D}
                  fill="none"
                  stroke="url(#introGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: orbProgress / 100 }}
                  transition={{ duration: 0.3, ease: "linear" }}
                />
                <defs>
                  <linearGradient id="introGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--teal)" />
                    <stop offset="50%" stopColor="var(--sun)" />
                    <stop offset="100%" stopColor="var(--coral)" />
                  </linearGradient>
                </defs>
              </svg>

              <motion.div
                className="absolute z-50 pointer-events-none"
                style={{
                  left: `${8 + (orbProgress / 100) * 80}%`,
                  top: "38%",
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <GoldenGlobe size={52} pulse />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative z-30 text-center px-6 mt-32 sm:mt-40"
              >
                <p className="lp-label mb-4">Forensic verification system</p>

                {phase === "pathway" && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-2xl sm:text-3xl text-[var(--ink)] tracking-wide"
                  >
                    Routing verification signal…
                  </motion.p>
                )}

                {phase === "scan" && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-2xl sm:text-3xl text-[var(--ink)] tracking-wide"
                  >
                    Scanning documents…
                  </motion.p>
                )}

                {phase === "analyze" && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-2xl sm:text-3xl text-[var(--ink)] tracking-wide"
                  >
                    Verifying job offer…
                  </motion.p>
                )}

                {phase === "score" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="font-display text-sm text-[var(--ink-soft)] mb-2 uppercase tracking-widest">
                      Scam risk
                    </p>
                    <p className="font-display text-6xl sm:text-7xl font-semibold tabular-nums text-[var(--ink)]">
                      {score}
                      <span className="text-3xl lp-gradient-text">%</span>
                    </p>
                    <p className="mt-3 text-[var(--ink-soft)] text-sm">
                      Low risk — verification complete
                    </p>
                  </motion.div>
                )}

                <motion.div
                  className="mt-10 mx-auto w-48 lp-progress-track rounded-full overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="lp-progress-fill"
                    initial={{ width: "0%" }}
                    animate={{
                      width:
                        phase === "pathway"
                          ? "20%"
                          : phase === "scan"
                            ? "45%"
                            : phase === "analyze"
                              ? "72%"
                              : "100%",
                    }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                </motion.div>
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function shouldShowIntro() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return sessionStorage.getItem(INTRO_KEY) !== "1";
}
