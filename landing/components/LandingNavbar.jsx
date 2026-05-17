import { useState } from "react";
import { Link } from "react-router-dom";
import AuthTrigger from "./AuthTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import LandingNavLink from "./LandingNavLink";
import CompassNeedle from "./CompassNeedle";
import LandingThemePills from "./LandingThemePills";
import PwaInstallButton from "../../components/PwaInstallButton";
import ThemeAndPwaControls from "../../components/ThemeAndPwaControls";
import { useNeedleScroll } from "../context/NeedleScrollContext";
import "./landing-navbar.css";

const ENTRANCE = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
};

export default function LandingNavbar() {
  const { scrolled, sections } = useNeedleScroll();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      {...ENTRANCE}
      className={`landing-navbar ${scrolled ? "is-scrolled" : ""}`}
    >
      <div className="landing-navbar__shell">
        <Link to="/" className="landing-navbar__brand" aria-label="VerifyCareers home">
          <span className="landing-navbar__brand-mark" aria-hidden />
          <span className="landing-navbar__wordmark">
            Verify<span>Careers</span>
          </span>
          <CompassNeedle size={30} className="hidden sm:block" />
        </Link>

        <div className="landing-navbar__center">
          <nav className="landing-navbar__links" aria-label="Landing sections">
            {sections.map((section) => (
              <LandingNavLink
                key={section.id}
                section={section}
                onNavigate={() => setMobileOpen(false)}
              />
            ))}
          </nav>
        </div>

        <div className="landing-navbar__actions">
          <div className="hidden lg:flex items-center gap-2">
            <LandingThemePills />
            <PwaInstallButton variant="landing" />
          </div>
          <AuthTrigger mode="sign-in" className="landing-navbar__cta hidden sm:inline-flex">
            Sign in
          </AuthTrigger>
          <div className="lg:hidden">
            <ThemeAndPwaControls variant="landing" />
          </div>
          <button
            type="button"
            className="landing-navbar__menu-btn lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="landing-nav-drawer"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="landing-nav-drawer"
            className="landing-navbar__drawer lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="landing-navbar__drawer-inner">
              <div className="flex items-center gap-3 mb-2 sm:hidden">
                <CompassNeedle size={24} />
                <span className="lp-label">Section compass</span>
              </div>
              {sections.map((section) => (
                <LandingNavLink
                  key={section.id}
                  section={section}
                  onNavigate={() => setMobileOpen(false)}
                />
              ))}
              <AuthTrigger
                mode="sign-in"
                className="landing-navbar__cta mt-3 w-full sm:hidden"
                onClick={() => setMobileOpen(false)}
              >
                Sign in
              </AuthTrigger>
              <div className="landing-navbar__drawer-themes">
                <LandingThemePills className="!flex" />
                <PwaInstallButton variant="landing" className="mt-3" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
