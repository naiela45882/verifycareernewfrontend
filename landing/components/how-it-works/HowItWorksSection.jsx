import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import EditorialLabel from "../EditorialLabel";
import HowStepCard from "./HowStepCard";
import { HOW_IT_WORKS_STEPS } from "../../landingContent";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "../../animations";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export { HOW_IT_WORKS_STEPS };

export default function HowItWorksSection() {
  const reduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean);
    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target) {
          const idx = Number(visible[0].target.getAttribute("data-step-index"));
          if (!Number.isNaN(idx)) setActiveStep(idx);
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0.15, 0.35, 0.55] }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="pipeline"
      className="lp-how-section relative scroll-mt-[72px] px-6 py-10 sm:px-8 sm:py-14"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
        className="mx-auto w-full max-w-6xl"
      >
        <EditorialLabel>End-to-end workflow</EditorialLabel>
        <h2 className="mt-4 mb-3 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold tracking-[0.02em] text-[var(--ink)]">
          How VerifyCareers fits your search
        </h2>
        <p className="mb-8 max-w-2xl text-lg text-ink-soft">
          Verify before you share personal data, publish what you learn, and keep your resume and
          applications in sync.
        </p>

        <div className="flex gap-6 sm:gap-10">
          <div
            className="hidden shrink-0 flex-col items-center pt-6 sm:flex"
            style={{ width: 20 }}
            aria-hidden
          >
            {HOW_IT_WORKS_STEPS.map((step, i) => (
              <div key={step.tag} className="flex min-h-0 flex-1 flex-col items-center">
                <motion.div
                  className="shrink-0 rounded-full border-2"
                  style={{ width: 10, height: 10 }}
                  animate={{
                    borderColor: i <= activeStep ? "var(--teal)" : "var(--stone)",
                    backgroundColor: i === activeStep ? "var(--teal)" : "var(--paper)",
                    scale: i === activeStep && !reduced ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                />
                {i < HOW_IT_WORKS_STEPS.length - 1 && (
                  <motion.div
                    className="my-1 min-h-[2.75rem] w-px flex-1 origin-top"
                    style={{ background: "var(--stone)" }}
                    animate={{ scaleY: i < activeStep ? 1 : 0.25, opacity: i < activeStep ? 1 : 0.4 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                )}
              </div>
            ))}
          </div>

          <motion.ol
            className="m-0 flex min-w-0 flex-1 list-none flex-col gap-3 p-0 sm:gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {HOW_IT_WORKS_STEPS.map((step, i) => (
              <li
                key={step.tag}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                data-step-index={i}
              >
                <HowStepCard
                  step={step}
                  index={i}
                  label={`STEP ${i + 1} — ${step.tag}`}
                  active={i <= activeStep}
                  isCurrent={i === activeStep}
                />
              </li>
            ))}
          </motion.ol>
        </div>

        <motion.p
          className="lp-label mt-6 tabular-nums"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          Stage {activeStep + 1} of {HOW_IT_WORKS_STEPS.length}
        </motion.p>
      </motion.div>
    </section>
  );
}
