import { useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import EditorialLabel from "../EditorialLabel";
import GoldenGlobe from "../GoldenGlobe";
import PipelineStepCard from "./PipelineStepCard";
import { fadeUp, viewportOnce } from "../../animations";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export const PIPELINE_STEPS = [
  {
    tag: "INGEST",
    title: "Paste job offer",
    desc: "Email, PDF, or message — English, Hindi, Tamil, and more.",
  },
  {
    tag: "PROFILE",
    title: "AI profile",
    desc: "Entity extraction, domain mapping, recruiter behaviour signals.",
  },
  {
    tag: "ANALYZE",
    title: "Scam pattern engine",
    desc: "Cross-reference known fraud signatures and anomaly libraries.",
  },
  {
    tag: "SCORE",
    title: "Trust score generated",
    desc: "Transparent risk index with explainable factor breakdown.",
  },
  {
    tag: "DELIVER",
    title: "Actionable result",
    desc: "Clear verdict, red flags, and recommended next steps.",
  },
];

const STEP_COUNT = PIPELINE_STEPS.length;
const GLOBE_SIZE = 44;
const SCROLL_SPAN_VH = 72;

function progressToStep(p) {
  if (p < 0.125) return 0;
  if (p < 0.3) return 1;
  if (p < 0.475) return 2;
  if (p < 0.65) return 3;
  return 4;
}

export default function RopePipeline() {
  const containerRef = useRef(null);
  const reduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [justUnlocked, setJustUnlocked] = useState(-1);
  const lastStepRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const handleStepChange = useCallback((next) => {
    if (next === lastStepRef.current) return;
    lastStepRef.current = next;
    setActiveStep(next);
    setJustUnlocked(next);
    window.setTimeout(() => setJustUnlocked(-1), 900);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    handleStepChange(progressToStep(v));
  });

  const trackHeight = reduced ? 320 : 400;
  const maxTravel = trackHeight - GLOBE_SIZE;

  const globeRawPx = useTransform(
    scrollYProgress,
    reduced
      ? [0, 0.125, 0.3, 0.475, 0.65, 1]
      : [0, 1],
    reduced
      ? [0, maxTravel * 0.25, maxTravel * 0.5, maxTravel * 0.75, maxTravel, maxTravel]
      : [0, maxTravel]
  );

  const globeY = useSpring(globeRawPx, {
    stiffness: reduced ? 400 : 100,
    damping: reduced ? 50 : 24,
    mass: 0.7,
  });

  const energyHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const energized = activeStep >= STEP_COUNT - 1;

  return (
    <section
      id="pipeline"
      ref={containerRef}
      className="relative py-16 sm:py-24"
      style={{ minHeight: `calc(100svh + ${SCROLL_SPAN_VH}vh)` }}
    >
      <div className="md:sticky md:top-20 lg:top-24 md:min-h-[calc(100vh-5rem)] flex md:items-center px-6 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="max-w-6xl mx-auto w-full"
        >
          <EditorialLabel>Verification pipeline</EditorialLabel>
          <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold text-[var(--ink)] mt-4 mb-3 tracking-[0.02em]">
            How it works
          </h2>
          <p className="text-[var(--ink-soft)] max-w-2xl mb-8 text-lg">
            Scroll to advance the signal — the golden orb travels the rope and unlocks each stage.
          </p>

          <div className="flex gap-5 sm:gap-10 lg:gap-14">
            <div
              className="relative shrink-0 overflow-visible"
              style={{ width: 56, minHeight: trackHeight }}
            >
              <div
                className={`lp-rope absolute left-1/2 -translate-x-1/2 top-0 w-[12px] ${energized ? "lp-rope--energized" : ""}`}
                style={{ height: trackHeight }}
              >
                {!reduced && (
                  <motion.div
                    className="lp-rope-energy lp-rope-energy--animated top-0 left-1/2 -translate-x-1/2"
                    style={{ height: energyHeight }}
                  />
                )}
              </div>

              <motion.div
                className="absolute left-1/2 top-0 -translate-x-1/2 z-30 pointer-events-none"
                style={{ y: globeY }}
              >
                <GoldenGlobe size={GLOBE_SIZE} pulse={energized} />
              </motion.div>
            </div>

            <div className="flex-1 flex flex-col gap-2.5 sm:gap-3 min-w-0">
              {PIPELINE_STEPS.map((step, i) => (
                <PipelineStepCard
                  key={step.tag}
                  step={step}
                  index={i}
                  label={`STEP ${i + 1} — ${step.tag}`}
                  unlocked={i <= activeStep}
                  justUnlocked={i === justUnlocked}
                  compact
                />
              ))}
            </div>
          </div>

          <p className="lp-label mt-6 tabular-nums">
            Active stage · {activeStep + 1} / {STEP_COUNT}
            {energized && (
              <span className="ml-3 text-[var(--sun)]">· Pipeline energized</span>
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
