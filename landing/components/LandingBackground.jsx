import { motion } from "framer-motion";

export default function LandingBackground() {
  return (
    <div className="luxury-ambient fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[min(900px,90vw)] h-[400px] rounded-full opacity-[0.5]"
        style={{
          background:
            "radial-gradient(ellipse, var(--vc-ambient) 0%, transparent 70%)",
        }}
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
