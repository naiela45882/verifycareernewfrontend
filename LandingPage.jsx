import { useState } from "react";
import "./globals.css";
import "./landing/landing.css";
import ClerkAuthModal from "./landing/components/ClerkAuthModal";
import { useAuthFromQuery } from "./landing/hooks/useAuthFromQuery";
import { useSignedInLandingRedirect } from "./landing/hooks/useSignedInLandingRedirect";
import CinematicIntro, { shouldShowIntro } from "./landing/components/CinematicIntro";
import LandingEnvironment from "./landing/components/LandingEnvironment";
import LandingNavbar from "./landing/components/LandingNavbar";
import { NeedleScrollProvider } from "./landing/context/NeedleScrollContext";
import LandingHero from "./landing/components/LandingHero";
import ProductModulesSection from "./landing/components/ProductModulesSection";
import HowItWorksSection from "./landing/components/how-it-works/HowItWorksSection";
import LiveDemoSection from "./landing/components/LiveDemoSection";
import LandingFeatures from "./landing/components/LandingFeatures";
import TrustSection from "./landing/components/TrustSection";
import ClosingCTA from "./landing/components/ClosingCTA";
import LandingFooter from "./landing/components/LandingFooter";

export default function LandingPage() {
  const [introComplete, setIntroComplete] = useState(() => !shouldShowIntro());
  useAuthFromQuery();
  useSignedInLandingRedirect();

  return (
    <div className="landing-page relative min-h-screen overflow-x-hidden bg-[var(--sand)] text-[var(--ink)] font-sans">
      {!introComplete && <CinematicIntro onComplete={() => setIntroComplete(true)} />}

      <LandingEnvironment />

      <NeedleScrollProvider>
        <div
          className={`relative z-10 transition-opacity duration-700 ${
            introComplete ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <LandingNavbar />
          <main>
            <LandingHero />
            <ProductModulesSection />
            <HowItWorksSection />
            <LiveDemoSection />
            <LandingFeatures />
            <TrustSection />
            <ClosingCTA />
          </main>
          <LandingFooter />
        </div>
      </NeedleScrollProvider>

      <ClerkAuthModal />
    </div>
  );
}
