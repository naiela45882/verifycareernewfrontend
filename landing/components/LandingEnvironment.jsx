import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function LandingEnvironment() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const ySoft = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 24]);
  const yTeal = useTransform(scrollY, [0, 600], [0, reduced ? 0 : -16]);

  return (
    <motion.div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden
      initial={false}
    >
      <div
        className="absolute top-0 left-1/2 h-[min(52vh,520px)] w-[min(1100px,96vw)] -translate-x-1/2"
        style={{
          opacity: "var(--lp-hero-wash-opacity, 0.4)",
          background:
            "radial-gradient(ellipse 90% 80% at 50% 0%, var(--ambient-wash, var(--vc-ambient)) 0%, transparent 72%)",
        }}
      />

      <motion.div
        className="absolute bottom-[-8%] left-1/2 h-[min(42vh,420px)] w-[min(900px,88vw)] -translate-x-1/2"
        style={{
          opacity: "calc(var(--lp-hero-wash-opacity, 0.4) * 0.65)",
          background:
            "radial-gradient(ellipse 80% 70% at 50% 100%, var(--ambient-wash, var(--vc-ambient)) 0%, transparent 70%)",
        }}
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-0 bg-grid"
        style={{ opacity: "var(--lp-grid-opacity, 0.28)" }}
      />

      <motion.div
        className="absolute -top-32 right-[-5%] h-[340px] w-[340px] rounded-full blur-3xl"
        style={{
          y: ySoft,
          opacity: "var(--lp-orb-sun-opacity, 0.5)",
          background:
            "radial-gradient(circle at 30% 30%, var(--ambient-orb-sun, color-mix(in srgb, var(--sun) 35%, transparent)), transparent 70%)",
        }}
      />

      <motion.div
        className="absolute bottom-[-10%] left-[-5%] h-[380px] w-[380px] rounded-full blur-3xl"
        style={{
          y: yTeal,
          opacity: "var(--lp-orb-teal-opacity, 0.4)",
          background:
            "radial-gradient(circle at 20% 20%, var(--ambient-orb-teal, color-mix(in srgb, var(--teal) 28%, transparent)), transparent 70%)",
        }}
      />

      <motion.div
        className="absolute top-[38%] right-[8%] h-[220px] w-[220px] rounded-full blur-3xl"
        style={{
          opacity: "calc(var(--lp-orb-teal-opacity, 0.4) * 0.55)",
          background:
            "radial-gradient(circle at 50% 50%, var(--glow-coral), transparent 68%)",
        }}
        animate={reduced ? undefined : { y: [0, 12, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="absolute inset-0 bg-noise"
        style={{ opacity: "var(--lp-noise-opacity, 0.46)" }}
      />
    </motion.div>
  );
}
