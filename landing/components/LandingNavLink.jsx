import { motion } from "framer-motion";
import { useNeedleScroll } from "../context/NeedleScrollContext";

export default function LandingNavLink({ section, onNavigate }) {
  const { activeSection, setHoverSection, scrollToSection } = useNeedleScroll();
  const active = activeSection === section.id;

  const handleClick = (e) => {
    e.preventDefault();
    scrollToSection(section.id);
    onNavigate?.();
  };

  return (
    <a
      href={`#${section.id}`}
      className={`landing-nav-link ${active ? "is-active" : ""}`}
      onClick={handleClick}
      onMouseEnter={() => setHoverSection(section.id)}
      onMouseLeave={() => setHoverSection(null)}
      onFocus={() => setHoverSection(section.id)}
      onBlur={() => setHoverSection(null)}
    >
      <motion.span
        className="landing-nav-link__label"
        animate={{
          y: active ? -1 : 0,
          fontWeight: active ? 600 : 500,
        }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        {section.label}
      </motion.span>
      <motion.span
        className="landing-nav-link__underline"
        initial={false}
        animate={{ scaleX: active ? 1 : 0, opacity: active ? 1 : 0 }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      />
    </a>
  );
}
