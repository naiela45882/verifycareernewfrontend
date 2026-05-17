import { motion } from "framer-motion";
import { cn } from "../../lib/cn";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const SPAN_CLASS = {
  12: "col-span-12",
  8: "col-span-12 lg:col-span-8",
  7: "col-span-12 lg:col-span-7",
  5: "col-span-12 lg:col-span-5",
  4: "col-span-12 lg:col-span-4",
};

const cellVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const reducedVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

export default function DashboardGrid({ children, className }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn("dashboard-bento grid grid-cols-12 gap-4 lg:gap-5", className)}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: reduced ? {} : { staggerChildren: 0.06 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function DashboardCell({ span = 12, className, children }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn(SPAN_CLASS[span] ?? SPAN_CLASS[12], className)}
      variants={reduced ? reducedVariants : cellVariants}
    >
      {children}
    </motion.div>
  );
}
