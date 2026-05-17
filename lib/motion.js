/** Luxury motion presets + scroll helpers */

export const EASE_LUXURY = [0.25, 0.1, 0.25, 1];

export const DURATION = {
  fast: 0.35,
  base: 0.55,
  slow: 0.75,
};

export const SPRING_GLOBE = {
  stiffness: 100,
  damping: 24,
  mass: 0.7,
};

export const SPRING_GLOBE_REDUCED = {
  stiffness: 400,
  damping: 50,
  mass: 0.7,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_LUXURY },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.base, ease: EASE_LUXURY },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_LUXURY },
  },
};

export const stepReveal = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.base, ease: EASE_LUXURY },
  },
};

export const viewportOnce = {
  once: true,
  amount: 0.18,
  margin: "-60px",
};

export const hoverLift = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.01,
    y: -2,
    transition: { duration: DURATION.fast, ease: EASE_LUXURY },
  },
};

/** Map scroll progress 0–1 to active step index 0–4 */
export function scrollProgressToStep(p) {
  if (p < 0.125) return 0;
  if (p < 0.3) return 1;
  if (p < 0.475) return 2;
  if (p < 0.65) return 3;
  return 4;
}

export const SCROLL_PIPELINE_SPAN_VH = 48;
export const GLOBE_SIZE_PX = 44;
