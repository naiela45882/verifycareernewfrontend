import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const LANDING_NAV_SECTIONS = [
  { id: "home", label: "Home", angle: -60 },
  { id: "platform", label: "Platform", angle: -30 },
  { id: "features", label: "Features", angle: 0 },
  { id: "pipeline", label: "How it works", angle: 30 },
  { id: "faq", label: "About", angle: 60 },
];

const SECTION_ANGLES = Object.fromEntries(
  LANDING_NAV_SECTIONS.map((s) => [s.id, s.angle])
);

const NeedleScrollContext = createContext(null);

export function NeedleScrollProvider({ children }) {
  const [activeSection, setActiveSection] = useState("home");
  const [hoverSection, setHoverSection] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [snapping, setSnapping] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = LANDING_NAV_SECTIONS.map((s) => s.id);
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-42% 0px -48% 0px", threshold: [0.08, 0.2, 0.45, 0.7] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const needleRotation = useMemo(() => {
    const target = hoverSection ?? activeSection;
    return SECTION_ANGLES[target] ?? 0;
  }, [hoverSection, activeSection]);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    setSnapping(true);
    setActiveSection(id);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => setSnapping(false), 700);
  }, []);

  const value = useMemo(
    () => ({
      activeSection,
      hoverSection,
      setHoverSection,
      scrolled,
      snapping,
      needleRotation,
      scrollToSection,
      sections: LANDING_NAV_SECTIONS,
    }),
    [activeSection, hoverSection, scrolled, snapping, needleRotation, scrollToSection]
  );

  return (
    <NeedleScrollContext.Provider value={value}>{children}</NeedleScrollContext.Provider>
  );
}

export function useNeedleScroll() {
  const ctx = useContext(NeedleScrollContext);
  if (!ctx) {
    throw new Error("useNeedleScroll must be used within NeedleScrollProvider");
  }
  return ctx;
}
