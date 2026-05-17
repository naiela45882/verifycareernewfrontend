import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";
import { fadeUp, staggerContainer, staggerItem } from "../animations";

const pillars = [
  "Email domain validation",
  "Scam pattern detection",
  "Salary reality checks",
  "Red flag indicators",
];

export default function LandingAbout() {
  return (
    <SectionReveal
      id="about"
      className="max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-28"
      variants={fadeUp}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="surface-card rounded-2xl p-8 sm:p-12 lg:p-14"
      >
        <motion.p
          variants={staggerItem}
          className="text-[12px] font-medium uppercase tracking-wide text-luxury-caption mb-4"
        >
          About
        </motion.p>

        <motion.h2
          variants={staggerItem}
          className="text-3xl sm:text-4xl font-semibold tracking-luxury text-luxury-ink mb-6 max-w-xl"
        >
          About VerifyCareers
        </motion.h2>

        <motion.p
          variants={staggerItem}
          className="text-luxury-body text-lg leading-relaxed mb-6 max-w-3xl"
        >
          VerifyCareers is a career safety platform designed to help users detect
          fake job offers, improve resume quality, and protect themselves from
          recruitment scams.
        </motion.p>

        <motion.p
          variants={staggerItem}
          className="text-luxury-body text-lg leading-relaxed max-w-3xl mb-10"
        >
          The platform combines intelligent scam analysis, resume ATS checking,
          community reporting, and AI guidance to create a safer and smarter
          career journey for students and professionals.
        </motion.p>

        <motion.div
          variants={staggerItem}
          className="flex flex-wrap gap-2 pt-8 border-t border-luxury-border"
        >
          {pillars.map((tag) => (
            <span
              key={tag}
              className="px-3.5 py-1.5 rounded-md text-[12px] font-medium text-luxury-body bg-luxury-muted border border-luxury-border"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </SectionReveal>
  );
}
